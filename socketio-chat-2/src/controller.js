let socket = io();
let containerDiv = document.getElementById('container');
let usernameBtn = document.getElementById('usernameBtn');
let usernameInput = document.getElementById('username');
let messageInput = document.getElementById('message');
let messageBtn = document.getElementById('sendMessageBtn');
let collection = document.getElementById('message-list');
let id;
class Chat {
    constructor() {
        this.currentID = socket.id;
        this.checkForMessages();
        this.checkForUsers();
    }
    sendMessage(message) {
        if(message) {
            socket.emit('chat message', message);
            this.createNewMessage({id, message});
        }
    }
    checkForMessages() {
        socket.on('chat message', (msg) => {
            this.createNewMessage(msg);
        });
    }
    createNewMessage(msg) {
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
        socket.on('user joined', (username) => {
            this.createNewMessage({id: username, message: `just joined`});
        })
    }
}
socket.on('connect', () => {
    socket.on('username set', (myId) => {
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

