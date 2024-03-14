import express from "express"
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

const app = express()
const server = createServer(app)
const __dirname = dirname(fileURLToPath(import.meta.url));
const io = new Server(server);

app.use(express.static(join(__dirname, "..", "public")))


export { server, io }