import * as io from 'socket.io-client';
import 'materialize-css/dist/css/materialize.css';

let socket = io();
const containerDiv = document.getElementById('container');
const usernameBtn = document.getElementById('usernameBtn');
const usernameInput: HTMLInputElement = <HTMLInputElement> document.getElementById('username');
const messageInput: HTMLInputElement = <HTMLInputElement> document.getElementById('message');
const messageBtn = document.getElementById('sendMessageBtn');
const collection = document.getElementById('message-list');
let id: string ;

interface Msg {
    id: string;
    message: string;
}

class Chat {
    currentID : string;

    constructor() {
        this.currentID = socket.id;
        this.checkForMessages();
        this.checkForUsers();
    }
    sendMessage(message : string) {
        if(message) {
            socket.emit('chat message', message);
            this.createNewMessage({id, message});
        }
    }
    checkForMessages() {
        socket.on('chat message', (msg : Msg) => {
            this.createNewMessage(msg);
        });
    }
    createNewMessage(msg : Msg) {
        let div = document.createElement('div');
        div.classList.add('card');
        div.classList.add('hoverable');
        let div2 = document.createElement('div');
        div2.classList.add('card-content');
        let spanTitle = document.createElement('span');
        spanTitle.classList.add('card-title');
        spanTitle.innerHTML = `${msg.id} - ${msg.message}`;
        if (id && msg.id === id) {
            div.classList.add('blue-grey');
            div.classList.add('darken-1');
            div2.classList.add('white-text');
        }
        div2.appendChild(spanTitle);
        div.appendChild(div2);
        collection.appendChild(div);
    }
    checkForUsers() {
        socket.on('user joined', (username : string) => {
            this.createNewMessage({id: username, message: `just joined`});
        })
    }
}
socket.on('connect', () => {
    socket.on('username set', (myId : string) => {
        id = myId;
        containerDiv.style.visibility = 'visible';
    });
    let chat = new Chat();
    usernameBtn.onclick = () => {
        let username = usernameInput.value;
        if(username) {
            socket.emit('set username', username);
        }
    }
    messageBtn.onclick = () => {
        if(id) {
            let message = messageInput.value;
            chat.sendMessage(message);
        }
        
    }
})

