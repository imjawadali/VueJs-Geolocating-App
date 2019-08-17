<template>
  <nav class="mainNav">
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/about/">About</router-link>
      </li>
      <li>
        <router-link to="/blogs">Blogs</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {}
  }
};
</script>

<style scoped>
nav {
  text-align: center;
}
nav ul {
  padding: 0;
}
nav li {
  display: inline-block;
  list-style-type: none;
  margin: 10px 20px;
}
nav a {
  color: #42b983;
  text-decoration: none;
}
a.router-link-exact-active {
  color: black;
}
</style>
