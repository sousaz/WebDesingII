function calculateMDC(width, height) {
  while (height != 0) {
    let temp = width % height;
    width = height
    height = temp
  }
  return width
}

const soap = require('soap');
const express = require("express")
const app = express()

const service = {
    MDCService: {
        MDCPort: {
        CalculateMDC: function(args, callback) {
            const mdc = calculateMDC(args.x, args.y)
        callback(null, `${args.x / mdc}:${args.y / mdc}`);
      }
    }
  }
};

const xml = require('fs').readFileSync('aspectRatio.wsdl', 'utf8');
app.get("/mdc?wsdl", (req, res) => {
    res.setHeader("Content-Type", "text/xml")
    res.status(200).send(xml)
})

const server = app.listen(3000, () => {
    console.log("running...")
})

soap.listen(server, "/mdc", service, xml)