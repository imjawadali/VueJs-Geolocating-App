<template>
  <div class="view-profile container">
    <div v-if="profile" class="card">
      <h2 class="deep-purple-text center">{{ profile.alias }}'s Wall</h2>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import db from "@/firebase/config";

export default {
  name: "ViewProfile",
  data() {
    return {
      profile: null
    };
  },
  created() {
    db.collection("users")
      .doc(this.$route.params.id)
      .get()
      .then(user => (this.profile = user.data()))
      .catch(err => console.log(err));
  }
};
</script>

<style scoped>
</style>