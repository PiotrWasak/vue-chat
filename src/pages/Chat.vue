<template>
  <section id="chat-section" class="container">
    <h1>Vue Chat</h1>
    <small>Logged in as: <strong>{{ getActiveUser }}</strong></small>

    <div class="row">
      <div class="col-lg-10">
        <ul ref="chatList" class="list-group">
          <li v-for="msg in getMsgs" class="list-group-item"><span class="list-group-user">{{msg.user}}</span> {{msg.msg}}</li>
        </ul>
      </div>
      <div class="col-lg-2"><p class="lead">Users:</p>
        <ul class="list-group">
          <li v-for="user in getUserList" class="list-group-item"> {{user}} </li>
        </ul>
      </div>
    </div>

    <div id="inputMsg">
      <div class="row">
        <div class="col-11"><input @keydown.enter="msgSubmit" type="text" class="form-control" v-model.trim="inputMsg">
        </div>
        <div class="col-1"><button @click="msgSubmit" type="button" class="btn btn-primary">Send</button></div>
      </div>
    </div>
  </section>
</template>

<script>
import SocketioService from "/services/socketio.service.js"
import {mapGetters} from "vuex"

export default {
  name: "Chat",
  props: {
   // nickname: {type: String, required: true},
  },
  data() {
    return {
      inputMsg: null,
    }
  },
  methods: {
    msgSubmit() {
      console.log("Userschat", this.getActiveUser);
      if (this.inputMsg) {
        SocketioService.sendMsg({user: this.getActiveUser, msg: this.inputMsg});
        this.inputMsg = '';
      }
    },
    scrollToBottom() {
      const chatList = this.$refs.chatList;
      chatList.scrollTop = chatList.scrollHeight;
    }
  },
  computed: {
    ...mapGetters(["getMsgs", "getUserList", "getActiveUser"]),
  },
}
</script>

<style scoped>
ul {
  margin-top: 8rem;
  height: 25rem;
  overflow-x: hidden;
  overflow-y: auto;
}

#inputMsg {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  margin: auto;
  width: 80%;
}

#chat-section {
  border: 1px solid rgba(128, 128, 128, 0.99);
  border-radius: 10px;
  padding: 30px;
  height: 80vh;
  box-shadow: 3px 7px rgba(0, 0, 0, 0.5);
  background-color: rgba(58, 52, 52, 0.68);
  position: relative;
}

.list-group-user{
  float: left;
  color: gray;
}
</style>