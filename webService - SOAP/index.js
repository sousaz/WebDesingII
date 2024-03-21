const soap = require("soap")

const url = "http://www.dneonline.com/calculator.asmx?WSDL"
soap.createClient(url, function(err, client) {
    if(err){
        console.log("Errro...", err)
        return
    }

    const args = { intA: 3, intB: 2 }
    client.Add(args, function(err, result){
        if(err){
            console.log("Erro...", err)
            return
        }
        console.log("Resultado", result.AddResult)
    })

})