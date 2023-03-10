/**
 * Socket Controller
 */
import Debug from 'debug'
import { Socket } from 'socket.io'
import { ClientToServerEvents, NoticeData, ServerToClientEvents, UserJoinResult } from '../types/shared/SocketTypes'
import prisma from '../prisma'

// Create a new debug instance
const debug = Debug('chat:socket_controller')

// Handle the user connecting
export const handleConnection = (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
	debug('ππΌ A user connected', socket.id)

	// Say hello to the user
	debug('ππ» Said hello to the user')
	socket.emit('hello')

	// Listen for room list request
	socket.on('getRoomList', async (callback) => {
		// Query database for list of rooms
		const rooms = await prisma.room.findMany()

		debug('π¨ Got request for rooms, sending room list %o', rooms)

		// Send room list
		setTimeout(() => {
			callback(rooms)
		}, 1500)
	})

	// Listen for incoming chat messages
	socket.on('sendChatMessage', (message) => {
		debug('π¨ New chat message', socket.id, message)
		socket.broadcast.to(message.roomId).emit('chatMessage', message)
	})

	// Listen for a user join request 
	socket.on('userJoin', async (username, roomId, callback) => {
		debug('πΆπ½ User %s wants to join the room %s', username, roomId)

		// Get room from database
		const room = await prisma.room.findUnique({
			where: {
				id: roomId,
			}
		})

		if (!room) {
			return callback({
				success: false,
				data: null,
			})
		}

		const notice: NoticeData = {
			timestamp: Date.now(),
			username,
		}

		// Add user to room `roomId
		socket.join(roomId)

		// Let everyone know a new user has joined
		socket.broadcast.to(roomId).emit('userJoined', notice)

		// Let user know they're welcome
		callback({
			success: true,
			data: {
				id: room.id,
				name: room.name,
				users: [],
			},
		})
	})

	// Handle user disconnecting
	socket.on('disconnect', () => {
		debug('βπ» A user disconnected', socket.id)
	})
}
