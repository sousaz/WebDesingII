const display = document.querySelector("#display")
const votes = document.querySelectorAll(".votes")
const eventSource = new EventSource("/sse")

eventSource.onmessage = function(event){
    const data = JSON.parse(event.data)
    updateVotes(data.votes)
}

function insertValue(value){
    display.innerHTML += value
}

function clearDisplay(){
    display.innerHTML = ""
}

function confirmVote(){
    const vote = display.innerHTML
    fetch("/vote", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({vote})
    })
    .then(res => res.json())
    .then(data => {
        if(data.success){
            clearDisplay()
            alert("Voto registrado")
        }else{
            clearDisplay()
            alert("Voto não registrado")
        }
    })
}

function updateVotes(data){
    votes[0].innerHTML = data["11"] + " <strong>Votos</strong>";  
    votes[1].innerHTML = data["15"] + " <strong>Votos</strong>"
    votes[2].innerHTML = data["16"] + " <strong>Votos</strong>"
}

fetch("/votes")
    .then(response => response.json())
    .then(data => updateVotes(data.votes))

