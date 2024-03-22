// const soap = require('soap');

// function calculateMDC(width, height) {
//   while (height != 0) {
//     let temp = width % height;
//     width = height
//     height = temp
//   }
//   return width
// }

const soap = require('soap');

// Define the service implementation
const service = {
  WeatherService: {
    WeatherPort: {
      GetWeather: function(args, callback) {
        // Perform the logic to get the weather based on the location
        const location = args.location;
        const temperature = '25°C';
        const description = 'Sunny';

        // Return the response
        const result = {
          temperature: temperature,
          description: description
        };
        callback(null, result);
      }
    }
  }
};

// Create the SOAP server
const xml = require('fs').readFileSync('aspectRatio.wsdl', 'utf8');
const server = soap.listen({ path: '/weather', xml: xml }, function() {
  console.log('SOAP server running at http://localhost:8000/weather?wsdl');
});

// Attach the service implementation to the SOAP server
server.addService(xml, service, { suppressStack: true });