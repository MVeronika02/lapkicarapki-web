<template>
  <div class="profile_content">
    <h3 class="profile_data_user_name">Личные данные</h3>
    <div class="profile_content_block">
      <h2>Имя: {{ $store.state.userData.user_name }}</h2>
      <h2>Телефон: {{ $store.state.userData.user_phone }}</h2>
      <h2>E-mail: {{ $store.state.userData.user_email }}</h2>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "profile",
  data() {
    return {};
  }
};
</script>

<style>
.profile_content {
  background: rgb(230, 230, 250, 0.95);
  padding: 20px 0 50px 0;
}

.profile_content_block {
  width: 80%;
  margin-left: 160px;
  height: 700px;
}

.profile_data_user_name {
  height: 60px;
  width: 80%;
  margin: 20px 0 20px 160px;
  background: rgb(141, 206, 157);
  padding-top: 10px;
  text-align: center;
}
</style>