<template>
  <div class="profile_content">
    <div class="profile_content_block">
      <button class="profile_info_name" @click="openInfo()">
        Личные данные
      </button>
      <button class="profile_info_name" @click="openOrders()">
        Мои заказы
      </button>
      <div class="profile_info" id="info">
        <h3 width="80px">Имя: {{ $store.state.userData.user_name }}</h3>
        <h3>E-mail: {{ $store.state.userData.user_email }}</h3>
      </div>
      <div class="profile_orders" id="info_orders">
        <ul
          v-for="order in infoOrders"
          :key="order.id_order"
          class="ul_order_block"
        >
          <li>
            <p style="font-weight: bold" class="order_block_p">
              Заказ № {{ order.id_order }}
            </p>
            <p class="order_block_p">
              <strong>Количество товаров в заказе:</strong>
              {{ order.count_product }}
            </p>
            <p class="order_block_p">
              <strong>Общая цена:</strong> {{ order.total_price_products }}
            </p>
            <p class="order_block_p">
              <strong>Способ оплаты:</strong> {{ order.name_payment_method }}
            </p>
            <p class="order_block_p">
              <strong>Доставка:</strong> {{ order.name_delivery_type }}
            </p>
            <p class="order_block_p">
              <strong>Город доставки:</strong> {{ order.user_city }}
            </p>
            <p class="order_block_p">
              <strong>Магазин:</strong> "{{ order.name_shop }}"
            </p>
            <p class="order_block_p">
              <strong>Адрес:</strong> {{ order.address_shop }}
            </p>
            <p class="order_block_p">
              <strong>Часы работы:</strong> {{ order.working_hours }}
            </p>
            <ul v-for="product in order.product" :key="product.id_order">
              <li>
                <p>{{ product.name_product }}</p>
              </li>
            </ul>
            <!-- <p>{{ order.product.name_product }}</p> -->
          </li>
          <!-- <li>
            <ul v-for="order in infoOrders" :key="order.id_order">
              <li><p>{{ order.product.name_product }}</p></li>
            </ul>
          </li> -->
        </ul>
      </div>
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
      infoOrders: {},
    };
  },
  methods: {
    openInfo: function () {
      document.getElementById("info").style.display = "block";
      document.getElementById("info_orders").style.display = "none";
    },
    openOrders: function () {
      document.getElementById("info").style.display = "none";
      document.getElementById("info_orders").style.display = "block";
      Axios.get(
        "http://localhost:5000/myorders?id=" + this.$store.state.userData.id
      ).then((response) => {
        this.infoOrders = response.data.result;
        console.log(this.infoOrders);
      });
    },
  },
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
}

.profile_info_name {
  background: rgb(141, 206, 157);
  height: 50px;
  margin-right: 60px;
  font-size: 1.5em;
  width: 200px;
}

.profile_info {
  margin-top: 50px;
}

.profile_orders {
  margin-top: 50px;
  display: flex;
}

.ul_order_block {
  width: 80%;
  height: 300px;
  margin: 0 40px 30px 0;
  display: inline-block;
  background: rgb(141, 206, 157);
  padding-top: 10px;
}

.ul_order_block > li {
  width: 400px;
  list-style: none;
}

.order_block_p {
  margin: 5px !important;
}
</style>