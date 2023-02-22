/**
 * Socket Controller
 */
import Debug from 'debug'
import { Socket } from 'socket.io'
import { ClientToServerEvents, ServerToClientEvents } from '../types/shared/SocketTypes'

// Create a new debug instance
const debug = Debug('chat:socket_controller')

// Handle the user connecting
export const handleConnection = (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
	debug('🙋🏼 A user connected', socket.id)
	// Say hello to the user
	// setTimeout(()=>{
		debug('👋🏻 Said hello to the user')
		socket.emit('hello')
	// }, 9000)

	// Listen for incoming chat messages
	socket.on('sendChatMessage',(message)=>{
		debug('📨New chat message', socket.id, message)
		socket.broadcast.emit('chatMessage', message) //Broadcast the message to all clients
	})

	// Handle user disconnecting
	socket.on('disconnect', () => {
		debug('✌🏻 A user disconnected', socket.id)
	})
}
