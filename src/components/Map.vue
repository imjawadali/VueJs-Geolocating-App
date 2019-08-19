<template>
  <div class="map">
    <div class="google-map" id="map"></div>
  </div>
</template>

<script>
/* eslint-disable */
import db from "@/firebase/config";
import firebase from "firebase/app";
import auth from "firebase/auth";

export default {
  name: "Map",
  data() {
    return {
      lat: 53,
      lng: -2
    };
  },
  methods: {
    renderMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: this.lat, lng: this.lng },
        zoom: 6,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false
      });

      db.collection("users")
        .get()
        .then(users => users.docs.forEach(doc => {
          let data = doc.data()
          if (!data.geolocation) return null;
          let marker = new google.maps.Marker({
            position: {
              lat: data.geolocation.lat,
              lng: data.geolocation.lng
            },
            map
          });
          marker.addListener('click', () => {});
        }))
        .catch(err => console.log(err));
    }
  },
  mounted() {
    const user = firebase.auth().currentUser;
    if (!navigator.geolocation) return this.renderMap();
    navigator.geolocation.getCurrentPosition(
      loc => {
        this.lat = loc.coords.latitude;
        this.lng = loc.coords.longitude;
        if (!user) return this.renderMap();
        db.collection("users")
          .where("user_id", "==", user.uid)
          .get()
          .then(snapshot =>
            snapshot.forEach(doc =>
              db
                .collection("users")
                .doc(doc.id)
                .update({
                  geolocation: {
                    lat: loc.coords.latitude,
                    lng: loc.coords.longitude
                  }
                })
            )
          )
          .catch(err => console.log(err));
        this.renderMap();
      },
      err => this.renderMap(),
      { maximumAge: 60000, timeout: 3000 }
    );
  }
};
</script>

<style scoped>
.google-map {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>