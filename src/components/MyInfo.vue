<template>
  <div class="info_content">
    <div class="info_content_name"><h3>Данные</h3></div>
    <div class="info_content_block">
      <h3 width="80px">Имя: {{ $store.state.userInfo.user_name }}</h3>
      <h3>E-mail: {{ $store.state.userInfo.user_email }}</h3>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MyInfo",
  data() {
    return {};
  },
};
</script>

<style>
.info_content_name {
  width: 80%;
  height: 60px;
  margin: 50px 0 20px 160px;
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