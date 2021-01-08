<template>
  <div class="info_content">
      <div class="info_content_name"><h3>Данные</h3></div>
    <div class="info_content_block">
      <h2>Имя: {{ $store.state.userData.user_name }}</h2>
      <h2>Телефон: {{ $store.state.userData.user_phone }}</h2>
      <h2>E-mail: {{ $store.state.userData.user_email }}</h2>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MyInfo",
  data() {
    return {};
  }
};
</script>

<style>
.info_content {
  background: rgb(230, 230, 250, 0.95);
  padding: 20px 0 50px 0;
}

.info_content_name {
  width: 80%;
  height: 60px;
  margin: 20px 0 20px 160px;
  background: rgb(141, 206, 157);
  padding-top: 20px;
  text-align: center;
}

.info_content_block {
  width: 80%;
  margin-left: 160px;
  height: 700px;
}

</style>