import { io } from 'socket.io-client';
import store from "../src/store";
import {use} from "express/lib/router";

class SocketioService {
    socket;
    constructor() {}

    setupSocketConnection() {
        this.socket = io('https://sleepy-bayou-03897.herokuapp.com', { transports: ['websocket'] });
        this.socket.on('msg', (msg) => {
            store.dispatch("ADD_MSG", msg);
        });
        this.socket.on('users', (users) => {
            console.log("Users", users)
            store.dispatch("SET_USER_LIST", users);
        });
    }
    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
    sendMsg(data) {
        this.socket.emit('msg', data);
    }

    login(payload) {
        this.socket.emit('login', payload);
    }
}

// function generateRandomUserColorHex() {
//     return "#" + Math.floor(Math.random()*16777215).toString(16);
// }

export default new SocketioService();