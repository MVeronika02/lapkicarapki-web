<template>
  <div class="profile_content">
    <div class="profile_content_block">
      <h2>Добро пожаловать в Ваш личный кабинет!</h2>
      <router-link to="/my-info" class="profile_content_block_info"><span>Личные данные</span></router-link>
      <router-link to="/my-orders" class="profile_content_block_info"><span>Мои заказы</span></router-link>
      <router-view></router-view>
    </div>
    
  </div>
</template>

<script>
import { mapState } from "vuex";
import Axios from "axios";

export default {
  name: "profile",
  data() {
    return {
      
    };
  },
  methods: {},
};
</script>

<style>
.profile_content {
  background: rgb(230, 230, 250, 0.95);
  padding: 20px 0 50px 0;
  min-height: 500px;
  text-align: center;
}

.profile_content_block {
  width: 80%;
  margin-left: 160px;
  min-height: 100px;
}

.profile_content_block_info {
  text-decoration: none;
  color: black !important;
  width: 50px !important;
  margin: 20px;
  font-size: 18px;
}

.profile_content_block_info:hover {
  color: green !important;
}
</style>