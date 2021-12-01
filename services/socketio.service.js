import { io } from 'socket.io-client';
import store from "../src/store";
import {use} from "express/lib/router";

class SocketioService {
    socket;
    constructor() {}

    setupSocketConnection() {
        this.socket = io('http://localhost:3000', { transports: ['websocket'] });
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

    login(nickname) {
        this.socket.emit('login', nickname);
    }
}

export default new SocketioService();