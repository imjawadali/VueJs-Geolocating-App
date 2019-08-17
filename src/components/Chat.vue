<template>
  <div class="chat container">
    <h2 class="center teal-text">Ninja Chat</h2>
    <div class="card">
      <div class="card-content">
        <ul class="messages" v-chat-scroll>
          <li v-for="message in messages" :key="message.id">
            <span class="teal-text">{{ message.name }}:</span>
            <span class="grey-text text-darken-3 message">{{ message.message }}</span>
            <span class="grey-text time">{{ message.time }}</span>
          </li>
        </ul>
      </div>
      <div class="card-action">
        <NewMessage :name="name" />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import db from "@/firebase/config";
import moment from "moment";

import NewMessage from "./NewMessage";

export default {
  name: "Chat",
  props: {
    name: String
  },
  components: {
    NewMessage
  },
  data() {
    return {
      messages: []
    };
  },
  created() {
    const ref = db.collection("messages").orderBy("timeStamp");
    ref.onSnapshot(snapshot =>
      snapshot.docChanges().forEach(change => {
        if (change.type == "added") {
          const doc = change.doc;
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            message: doc.data().message,
            time: moment(doc.data().timeStamp).format("lll")
          });
        }
      })
    );
  }
};
</script>

<style scoped>
.chat h2 {
  font-size: 2.6em;
  margin-bottom: 40px;
}
.chat li {
  margin-top: 10px;
}
.chat span {
  font-size: 1.4em;
}
.chat .message {
  margin-left: 5px;
}
.chat .time {
  display: block;
  font-size: 0.8em;
}
.messages {
  max-height: 300px;
  overflow: auto;
}
.messages::-webkit-scrollbar {
  width: 3px;
}
.messages::-webkit-scrollbar-track {
  background: #ddd;
}
.messages::-webkit-scrollbar-thumb {
  background: #aaa;
}
</style>
