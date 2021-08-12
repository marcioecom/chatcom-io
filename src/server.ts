import 'dotenv/config'
import { server } from './http'
import './websocket/socket'
const port = process.env.PORT || 3000

server.listen(port, () => console.log(`Server on localhost:${port}`))
