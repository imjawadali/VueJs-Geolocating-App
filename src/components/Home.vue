<template>
  <div class="home container">
    <div class="card">
      <div class="card-content center-align">
        <h2 class="teal-text">Welcome</h2>
        <form @submit.prevent="enterChat">
          <label for="name">Enter your name:</label>
          <input type="text" name="name" v-model="name" />
          <p class="red-text" v-if="feedback">{{ feedback }}</p>
          <button class="btn teal">Enter Chat</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      name: null,
      feedback: null
    };
  },
  methods: {
    enterChat() {
      if (!this.name) return this.feedback = 'You must enter a name to join';
      this.feedback = null;
      this.$router.push({ name: 'Chat', params: { name: this.name } });
    }
  }
};
</script>

<style scoped>
.home{
  max-width: 400px;
  margin-top: 100px;
}
.home h2{
  font-size: 3em;
}
.home button{
  margin: 30px auto;
}
</style>
