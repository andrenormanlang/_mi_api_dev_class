/**
 * Socket Controller
 */
import Debug from 'debug'
import { Socket } from 'socket.io'
import { ClientToServerEvents, NoticeData, ServerToClientEvents  } from '../types/shared/SocketTypes'

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

	// Listen for a user join request
	socket.on('userJoin', (username, callback) => {
		debug('👶User %s to join the chat', username)

		const notice: NoticeData = {
			timestamp: Date.now(),
			username
		}

		// Let everyone knwo that a user has joined the chat
		socket.broadcast.emit('userJoined', notice)
		// Let user know they are welcome
		callback(true)
		//callback(false) in case a problem with validation of the user occurs

	})

	// Handle user disconnecting
	socket.on('disconnect', () => {
		debug('✌🏻 A user disconnected', socket.id)
	})
}
