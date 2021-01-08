<template>
  <div class="info_content">
    <!-- <div class="info_content_block"> -->
      <h2>Количество товаров в заказе: {{ $store.state.orderData.count_products }}</h2>
      <h2>Общая цена: {{ $store.state.orderData.total_price }}</h2>
    </div>
  <!-- </div> -->
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
     width: 500px;
     height: 500px;
  background: rgb(230, 230, 250, 0.95);
  padding: 20px 0 50px 0;
}
/*
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
} */
</style>