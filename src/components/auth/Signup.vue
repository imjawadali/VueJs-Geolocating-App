<template>
  <div class="signup container">
    <form @submit.prevent="signup" class="card-panel">
      <h2 class="center deep-purple-text">Signup</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password" />
      </div>
      <div class="field">
        <label for="alias">Alais:</label>
        <input type="text" name="alias" v-model="alias" />
      </div>
      <div class="field center">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn button deep-purple">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import db from "@/firebase/config";
import firebase from "firebase/app";
import auth from "firebase/auth";
import slugify from "slugify";

export default {
  name: "Signup",
  data() {
    return {
      email: null,
      password: null,
      alias: null,
      feedback: null,
      slug: null
    };
  },
  methods: {
    signup() {
      if (!this.email || !this.password || !this.alias)
        return (this.feedback = "You must fill all fields.");
      this.feedback = null;
      this.slug = slugify(this.alias, {
        replacement: "-",
        remove: /[&*_+~.()'"!\-:@]/g,
        lower: true
      });
      const ref = db.collection("users").doc(this.slug);
      ref
        .get()
        .then(doc => {
          if (doc.exists) return (this.feedback = "This alias already exists.");
          firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then(cred => {
              ref.set({
                alias: this.alias,
                geolocation: null,
                user_id: cred.user.uid
              });
            })
            .then(() => this.$router.push({ name: "Home" }))
            .catch(err => (this.feedback = err.message));
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
.signup {
  max-width: 400px;
  margin-top: 60px;
}
.signup h2 {
  font-size: 2.4em;
}
.signup .field {
  margin-bottom: 16px;
}
.signup .button {
  margin-top: 16px;
}
</style>
