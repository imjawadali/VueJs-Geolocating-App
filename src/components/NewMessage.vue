<template>
  <div class="newMessage">
    <form @submit.prevent="addMessage">
      <label for="newMessage">New Message (enter to add):</label>
      <input type="text" name="newMessage" v-model="newMessage" />
      <p class="red-text" v-if="feedback">{{ feedback }}</p>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import db from "@/firebase/config";

export default {
  name: "NewMessage",
  props: {
    name: String
  },
  data() {
    return {
      newMessage: null,
      feedback: null
    };
  },
  methods: {
    addMessage() {
      if (!this.newMessage)
        return (this.feedback = "You must enter a message to send.");
      this.feedback = null;
      db.collection("messages")
        .add({
          name: this.name,
          message: this.newMessage,
          timeStamp: Date.now()
        })
        .catch(err => console.log(err));
        this.newMessage = null;
    }
  }
};
</script>

<style scoped>
</style>
