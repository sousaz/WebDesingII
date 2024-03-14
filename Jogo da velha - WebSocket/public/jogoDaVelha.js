const socket = io("http://localhost:3000");
const cells = document.querySelectorAll(".cell")
const endgame = document.querySelector("#endgame")
const quit = document.querySelector("#quit")
const players = document.querySelector("#players")
const room = { "room": localStorage.getItem("room") }
const title = document.querySelector("#title")

document.addEventListener("DOMContentLoaded", function(event) {
    title.innerHTML = `Jogo da Velha - Você esta na sala ${room.room}`
    socket.emit("on_game", room)
});

quit.addEventListener("click", () => {
    socket.emit("leaveRoom", room)
    window.location.href = "index.html"
})

socket.on("updateRoomPlayers", (data) => {
    players.innerHTML = `${data}/2 Players`
})

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.dataset.index
        if(cells[index].innerHTML === ""){
            socket.emit("move", { room: room.room, index })
        }
    })
})

socket.on("move", ({ index, currentPlayer }) => {
    cells[index].innerHTML = currentPlayer
    if(checkIfWin()){
        alert(checkIfWin())
    }
})

function checkIfWin() {
    console.log("gvdaudy")
    for (let i = 0; i < 3; i++) {
        if (cells[i * 3].innerHTML !== "" &&
            cells[i * 3].innerHTML === cells[i * 3 + 1].innerHTML &&
            cells[i * 3].innerHTML === cells[i * 3 + 2].innerHTML) {
            return `${cells[i * 3].innerHTML} venceu`
        }
    }

    for (let i = 0; i < 3; i++) {
        if (cells[i].innerHTML !== "" &&
            cells[i].innerHTML === cells[i + 3].innerHTML &&
            cells[i].innerHTML === cells[i + 6].innerHTML) {
            return `${cells[i].innerHTML} venceu`
        }
    }

    if (cells[0].innerHTML !== "" &&
        cells[0].innerHTML === cells[4].innerHTML &&
        cells[0].innerHTML === cells[8].innerHTML) {
        return `${cells[0].innerHTML} venceu`
    }
    if (cells[2].innerHTML !== "" &&
        cells[2].innerHTML === cells[4].innerHTML &&
        cells[2].innerHTML === cells[6].innerHTML) {
        return `${cells[2].innerHTML} venceu`
    }
    let filledCells = 0
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].innerHTML !== "") {
            filledCells++;
        }
    }

    if (filledCells === cells.length) {
        return "Empate";
    }
    return null;
}


