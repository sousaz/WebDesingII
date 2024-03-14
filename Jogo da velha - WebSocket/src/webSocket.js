import { io } from "./http.js"
const MAX_PLAYERS_PER_ROOM = 2

const roomPlayers = {}
let currentPlayer = "O"

io.on("connection", (socket) => {
    socket.on("select_room", (data) => {
        if(data.room){
            if(!roomPlayers[data.room] || roomPlayers[data.room] < MAX_PLAYERS_PER_ROOM){
                socket.join(data.room)
                socket.emit("roomJoined", data.room)
                roomPlayers[data.room] = roomPlayers[data.room] ? roomPlayers[data.room] + 1 : 1
                console.log(`Player joined room ${data.room}`)
                io.to(data.room).emit("updateRoomPlayers", roomPlayers[data.room])
            } else {
                return socket.emit("roomFull", data.room)
            }
        }
    })

    socket.on("on_game", (data) => {
        if(data.room){
            socket.join(data.room)
            io.to(data.room).emit("updateRoomPlayers", roomPlayers[data.room])
        }
    })

    socket.on('leaveRoom', (data) => {
        socket.leave(data.room)
        console.log(`Player leaved room ${data.room}`)
        roomPlayers[data.room] = roomPlayers[data.room] - 1
        io.to(data.room).emit("updateRoomPlayers", roomPlayers[data.room])
    });

    socket.on("move", ({ room, index }) => {
        io.to(room).emit("move", { index, currentPlayer })
        currentPlayer = currentPlayer === "O" ? "X" : "O"
    })
})