const express = require("express")
const sqlite3 = require("sqlite3").verbose()
const bodyParser = require('body-parser')

const app = express()

function createDBConnection(tenantId) {
    return new sqlite3.Database(`./db/${tenantId}.sqlite`)
}

app.use(express.static("public"))
app.use(bodyParser.json())

const middleware = ((req, res, next) => {
    const tenantId = req.headers["tenant-id"]
    if (!tenantId) {
        return res.status(400).send("Tenant ID is required")
    }
    req.db = createDBConnection(tenantId)
    req.tenantId = tenantId
    next()
})

app.post("/items",middleware, (req, res) => {
    const { name, price } = req.body

    req.db.run(
        'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, name TEXT, price TEXT)',
        [],
        (err) => {
          if (err) {
            return res.status(500).json({ error: 'Failed to create table' });
          }
    
          req.db.run(
            'INSERT INTO items (name, price) VALUES (?, ?)',
            [name, price],
            function (err) {
              if (err) {
                return res.status(500).json({ error: 'Failed to create item' });
              }
              res.status(201).json({ id: this.lastID, name, price, tenantId: req.tenantId });
            }
          );
        }
      );
})

app.get('/items',middleware, (req, res) => {
    req.db.all(
      'SELECT * FROM items',
      [],
      (err, rows) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to fetch items' });
        }
        res.json(rows);
      }
    );
});
  

app.listen(3000, () => {
    console.log("Server running on port 3000")
})