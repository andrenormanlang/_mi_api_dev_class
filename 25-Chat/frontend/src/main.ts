import './assets/scss/style.scss'
import { io, Socket } from 'socket.io-client'
import {
	ChatMessageData,
	ClientToServerEvents,
	ServerToClientEvents }
from '@backend/types/shared/SocketTypes'

const SOCKET_HOST = import.meta.env.VITE_APP_SOCKET_HOST

const messageEl = document.querySelector('#message') as HTMLInputElement
const messageFormEl = document.querySelector('#message-form') as HTMLFormElement
const messagesEl = document.querySelector('#messages') as HTMLUListElement //unordered list element

// Connect to Socket.IO server
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_HOST)

// Add a message to the chat
const addMessageToChat = (message: ChatMessageData, ownMessage = false) =>{
	// Create a new LI element
	const messageEl = document.createElement('li')

	// Set class of LI to message
	messageEl.classList.add('message')

	// if the message is from the user, add the class 'own-message'
	if(ownMessage){
		messageEl.classList.add('own-message')
	}
	// Set the text of the LI element element to the message
	messageEl.textContent = message.content

	// Append the LI element to the messages element
	messagesEl.appendChild(messageEl)

	// Scroll to the bottom of the messages list
	messagesEl.scrollIntoView({behavior: 'smooth'})
}

	//Create a function that takes the message as a parameter
	// and creates a new LI-element, sets the content + styling
	// and appends it to 'messagesEl'
	/* function addMessageToChat(message: ChatMessageData, isOwnMessage = false) {
		const messageLi = document.createElement('li');
		messageLi.textContent = message.content.toString();
		if (isOwnMessage) {
			messageLi.classList.add('own-message');
		}
		messagesEl.appendChild(messageLi);
	} */

// Listen for when connection is established
socket.on('connect', () => {
	console.log('💥 Connected to the server', socket.id)
})

// Listen for when the server got tired of us
socket.on('disconnect', () => {
	console.log('💀 Disconnected from the server')
})

// Listen for when the server says hello
socket.on('hello', () => {
	console.log('👋🏻 The nice server said Hello')
})



// Listen for new chat messages
socket.on('chatMessage', (message)=>{
	console.log('Yay someone wrote something!', message)
	//Create a function called `addMessageToChat`that takes the
	// message as a parameter and creates a new LI-element, sets
	// the content + styling  and appends it to 'messagesEl'
	addMessageToChat(message)
})

// Send a message to the server when the form is submitted
messageFormEl.addEventListener('submit', e => {
	e.preventDefault();
	if(!messageEl.value.trim()){
		return
	} //not to read blank spaces on the message field

	// Construct the message payload
	const message: ChatMessageData ={
		content: messageEl.value//.trim(),
	}

	// Send (emit) the message to the server
	socket.emit('sendChatMessage', message)

	// Add the message to the chat without the `own-message` class


	//Extend the addMessageToChat to know if the
	// message was sent by us and then `.own message` class
	// to the LI element before it to `messagesEl`
	// addMessageToChat(message,true)
	addMessageToChat(message, true)

	console.log('Emmited "sendChatMessage" message to server', message);
	// Clear the input field and focus
	messageEl.value = ''
	messageEl.focus()
})
