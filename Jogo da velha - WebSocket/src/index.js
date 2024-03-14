import { server } from "./http.js"
import "./webSocket.js"

server.listen(3000, () => console.log("Server is running at PORT:3000"))