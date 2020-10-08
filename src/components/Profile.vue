<template>
  <div class="profile_content">
    <div class="profile_data_user">
      <h2>Личные данные:</h2>
      <h4>Имя: {{ $store.state.userData.user_name }}</h4>
      <h4>Телефон: {{ $store.state.userData.user_phone }}</h4>
      <h4>E-mail: {{ $store.state.userData.user_email }}</h4>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Profile",
  data() {
    return {};
  },
  //   mounted() {
  //     this.$store.commit("SETUser");
  //   },
};
</script>

<style>
.profile_content {
  padding-top: 20px;
  height: 300px;
  background: burlywood;
}

.profile_data_user {
  margin: 0px 0 0 70px;
  padding: 5px 0 0 15px;
  background: cornsilk;
  opacity: 0.8;
  width: 20%;
  height: 80%;
  border-style: groove;
}
</style>