<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <router-link class="brand-logo left" :to="{ name: 'Home' }">GeoNinjas</router-link>
        <ul class="right">
          <li>
            <router-link :to="{ name: 'Signup' }">Signup</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Login' }">Login</router-link>
          </li>
          <li>
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
    return {};
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => this.$router.push({ name: "Login" }))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
</style>
