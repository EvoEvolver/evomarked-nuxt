//import express from 'express'
import { handle } from './.output/server/index.mjs'
import { createServer } from 'http'
const argv = process.argv.slice(2);
if(argv[0])
    var port = Number(argv[0])
else
    var port = 3000
//const app = express()
const server = createServer(handle)
server.listen(port)
//app.use(handle)
//app.listen(port)

console.log("Server running on: http://localhost:"+port)
