const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const votes = {"11": 0, "15": 0, "16": 0}
const clients = []

app.use(bodyParser.json())
app.use(express.static('public'))


app.get('/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  clients.push(res);

  req.on('close', () => {
    clients.splice(clients.indexOf(res), 1);
  });
})


app.post("/vote", (req, res) => {
  const { vote } = req.body
  if(votes[vote] === undefined){
    return res.json({ success: false })
  }
  votes[vote]++
  broadcastAttendance()
  res.json({ success: true })
})

app.get("/votes", (req, res) => {
  res.json({ votes })
})

function broadcastAttendance() {
  clients.forEach(client => {
    client.write(`data: ${JSON.stringify({ votes })}\n\n`);
  });
}

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})