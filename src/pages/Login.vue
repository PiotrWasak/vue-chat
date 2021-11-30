<template>

  <div class="container login-container">
    <form @submit.prevent="nicknameSubmit">
    <input v-model.trim="inputNickname" type="text" id="nickname" class="form-control" placeholder="Nickname">
    <button type="submit" class="btn btn-primary">Chat now!</button>
    </form>
  </div>

</template>

<script>
import socketioService from "../../services/socketio.service.js"

export default {
  name: "Login",
  data() {
    return{
      inputNickname: null,
    }
  },
  methods: {
    nicknameSubmit() {
      if(this.inputNickname) {
        socketioService.login(this.inputNickname);
        this.$store.dispatch("SET_ACTIVE_USER", this.inputNickname);
        //this.$router.push("/chat/" + this.inputNickname);
        this.$router.push("/chat");
      }
    }
  }
}
</script>

<style scoped>
.login-container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
</style>