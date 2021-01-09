<template>
  <div class="info_content">
    <div class="profile_orders" id="info_orders">
      <ul
        v-for="order in $store.state.allOrders"
        :key="order.id_order"
        class="ul_order_block"
      >
        <li class="ul_order_block_li">
          <div class="ul_order_block_info">
            <p style="font-weight: bold" class="order_block_name">
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
          </div>
          <div class="order_block_products">
            <ul v-for="product in order.product" :key="product.id_order">
              <li class="order_block_products_li">
                <img
                  :src="imageProduct(product.url_image_product)"
                  width="50px;"
                  height="50px;"
                />
                <p>{{ product.name_product }}</p>
                <p>{{ product.price_product }} тг.</p>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
            <v-container class="max-width">
              <v-pagination
                v-model="page"
                class="pt-4 pb-2"
                :length="$store.state.countPageOrders"
                total-visible="5"
                @input="showPage(page)"
              ></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Axios from "axios";
export default {
  name: "MyOrders",
  data() {
    return {
      page: 1,
      idUser: this.$store.state.userData.id,
      infoOrders: {},
    };
  },
  created() {
    this.$store.dispatch("getUserOrders", { id: this.idUser, page: 1 });
  },
  methods: {
    imageProduct(imagePath) {
      return require(`../static/${imagePath}`);
    },
    showPage(page) {
      this.$store.dispatch("getUserOrders", { id: this.idUser, page: page });
    },
  },
};
</script>

<style> 
.profile_orders {
  margin: 50px 0 0 160px;
}

.ul_order_block_info {
  width: 400px;
  margin-right: 50px;
  text-align: left;
}

.ul_order_block {
  width: 90%;
  margin: 0 40px 30px 0;
  display: inline-block;
  background: rgb(141, 206, 157);
  padding-top: 10px;
  padding-bottom: 20px;
}

.ul_order_block_li {
  list-style: none;
  display: flex;
}

.order_block_name {
  font-size: 18px;
}

.order_block_p {
  margin: 5px !important;
}

.order_block_products {
  width: 600px;
  margin-top: 40px;
}

.order_block_products_li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
</style>