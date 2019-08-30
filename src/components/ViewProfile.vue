<template>
  <div class="comp">
    <div class="view-profile container">
      <div v-if="profile" class="card">
        <i class="small material-icons cancel" @click="$router.push('/')">cancel</i>
        <div class="card-content">
          <h2 class="deep-purple-text center">{{ profile.alias }}'s Wall</h2>
          <form @submit.prevent="addComment">
            <div class="field">
              <label for="comment">Add a comment:</label>
              <input type="text" name="comment" v-model="newComment" />
              <p v-if="feedback" class="red-text">{{ feedback }}</p>
            </div>
          </form>
          <ul class="comments collection">
            <li v-for="(comment, index) in comments" :key="index">
              <span class="deep-purple-text">{{ comment.from }}:</span>
              <span class="grey-text text-darken-3 message">{{ comment.comment }}</span>
              <span class="grey-text time">{{ comment.time }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import db from "@/firebase/config";
import firebase from "firebase/app";
import auth from "firebase/auth";
import moment from "moment";

export default {
  name: "ViewProfile",
  data() {
    return {
      profile: null,
      comments: [],
      currentUser: null,
      newComment: null,
      feedback: null
    };
  },
  methods: {
    addComment() {
      if (!this.newComment)
        return (this.feedback = "You must enter a comment to add.");
      this.feedback = null;
      db.collection("comments")
        .add({
          to: this.$route.params.id,
          from: this.currentUser,
          comment: this.newComment,
          timeStamp: Date.now()
        })
        .then(() => (this.newComment = null))
        .catch(err => console.log(err));
    }
  },
  created() {
    const ref = db.collection("users");
    // get wall (profile) user
    ref
      .doc(this.$route.params.id)
      .get()
      .then(user => (this.profile = user.data()))
      .catch(err => console.log(err));
    // fetch comments real time
    db.collection("comments")
      .where("to", "==", this.$route.params.id)
      .orderBy("timeStamp", "asc")
      .onSnapshot(snapshot =>
        snapshot.docChanges().forEach(change => {
          if (change.type == "added")
            this.comments.unshift({
              from: change.doc.data().from,
              comment: change.doc.data().comment,
              time: moment(change.doc.data().timeStamp).format("lll")
            });
        })
      );
    // get current user
    ref
      .where("user_id", "==", firebase.auth().currentUser.uid)
      .get()
      .then(snapshot =>
        snapshot.forEach(doc => (this.currentUser = doc.data().alias))
      )
      .catch(err => console.log(err));
  }
};
</script>

<style scoped>
.comp {
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 100vw;
  position: absolute;
  margin-top: 0;
}
.view-profile h2 {
  font-size: 2.6em;
  margin-bottom: 40px;
}
.view-profile li {
  margin-top: 10px;
}
.view-profile span {
  font-size: 1.4em;
}
.view-profile .message {
  display: block;
  font-size: 1.2em;
}
.view-profile .time {
  display: block;
  font-size: 0.8em;
}
.view-profile .cancel {
  display: inline;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}
.comments {
  max-height: 300px;
  padding: 10px;
  overflow: auto;
}
.comments::-webkit-scrollbar {
  width: 3px;
}
.comments::-webkit-scrollbar-track {
  background: #ddd;
}
.comments::-webkit-scrollbar-thumb {
  background: #aaa;
}
</style>