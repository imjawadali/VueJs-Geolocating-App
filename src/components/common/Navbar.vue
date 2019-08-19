<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <router-link class="brand-logo left" :to="{ name: 'Home' }">GeoNinjas</router-link>
        <ul class="right">
          <li v-if="!user">
            <router-link :to="{ name: 'Signup' }">Signup</router-link>
          </li>
          <li v-if="!user">
            <router-link :to="{ name: 'Login' }">Login</router-link>
          </li>
          <li v-if="user"><a>{{ user.email }}</a></li>
          <li v-if="user">
            <a @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
/* eslint-disable */
import firebase from "firebase/app";
import auth from "firebase/auth";

export default {
  name: "Navbar",
  data() {
    return {
      user: null
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => this.$router.push({ name: "Login" }))
        .catch(err => console.log(err));
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => this.user = user);
  }
};
</script>

<style scoped>
</style>
