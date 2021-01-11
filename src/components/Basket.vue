<template>
  <div class="basket_details">
    <div class="basket_details_block">
    <h3 class="basket_name">Ваша корзина ({{ $store.state.cartCount }})</h3>
    <div class="basket_details_info">
      <table
        v-if="$store.state.basketContent.length > 0"
        class="basket_details_table"
      >
        <tr class="basket_table_row_1">
          <th class="row_1_th_name">Товары</th>
          <th class="row_1_th_count_product">Количество</th>
          <th class="row_1_th_price">Цена</th>
          <th class="row_1_th_totalsum">Сумма</th>
        </tr>

        <tr
          v-for="allProduct in $store.state.basketContent"
          :key="allProduct.id_product"
          class="basket_table_row_2"
        >
          <td class="basket_table_img">
            <img
              :src="imageProduct(allProduct.url_image_product)"
              width="80%"
              height="90%"
            />
          </td>
          <td class="basket_table_name_product">
            <p>{{ allProduct.name_product }}</p>
          </td>

          <td class="basket_table_counter">
            <button
              type="button"
              class="button_plus"
              @click="addToBasket(allProduct)"
            >
              +
            </button>
            <span class="counter_number">{{ allProduct.quantity }}</span>
            <button
              type="button"
              class="button_minus"
              @click="minusProduct(allProduct)"
            >
              -
            </button>
            <button
              type="button"
              class="button_delete"
              @click="removeProducts(allProduct)"
            >
              <i class="far fa-trash-alt"></i>
            </button>
          </td>
          <td class="basket_table_price_product">
            <p>{{ allProduct.price_product }} тг</p>
          </td>
          <td class="basket_table_totalprice">
            <p>{{ allProduct.totalPrice }} тг</p>
          </td>
        </tr>
      </table>
      <div v-else class="navbar-dropdown is-boxed is-right">
        <p style="margin-left: 20px">Корзина ждет, что ее наполнят. Желаем приятных покупок!</p>
      </div>
      <div :class="totalCheck ? 'ordering' : 'ordering_closed'">
        <h1>Итого</h1>
        <p>Товара на: {{ totalPrice }} тг</p>
        <hr />
        <p>К оплате: {{ totalPrice }} тг</p>
        <button class="ordering_btn" @click="goToOrdering()">Оформить заказ</button>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from "vuex";
var count = 0;
export default {
  name: "Basket",
  data() {
    return {
      prodId: this.$route.params.Pid,
      totalCheck: true
    };
  },
  created() {
    if (this.$store.state.basketContent.length == 0) {
      this.totalCheck = false
    }
  },
  mounted() {
    this.$store.commit("saveBasket");
  },
  computed: {
    totalPrice() {
      let total = 0;
      for (let allProduct of this.$store.state.basketContent) {
        total += allProduct.totalPrice;
      }
      if (total == 0) {
        this.totalCheck = false
      }
      return total.toFixed(2);
      
    },
  },
  methods: {
    imageProduct(imagePath) {
      return require(`../static/${imagePath}`);    },
    addToBasket(product) {
      this.$store.commit("productsToBasket", product);
    },
    minusProduct(product) {
      this.$store.commit("removeProductFromBasket", product);
    },
    removeProducts(product) {
      this.$store.commit("removeProduct", product);
    },
    goToOrdering(allProduct) {
      this.$router.push({ name: "Order" });
    },
  },
};
</script>

<style>
.basket_details {
  background: rgb(230, 230, 250, 0.95);
}

.basket_details_block {
  width: 85%;
  min-height: 500px;
  margin-left: 100px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
}

.basket_name {
  width: 400px;
  font-size: 44px;
  color: darkslateblue;
  height: 70px;
  margin: 20px 0 20px 20px;
}

.basket_details_info {
  display: flex;
}

.basket_details_table {
  width: 60%;
  display: block;
  padding-right: 10px;
  margin: 0 0 100px 20px; 
}

.basket_table_row_1 {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

/* границы ячеек первого ряда таблицы */
th {
  font-size: 22px;
}

.row_1_th_name {
  width: 460px;
  text-align: left;
}

.row_1_th_count_product {
  width: 200px;
  text-align: left;
}

.row_1_th_price {
  width: 150px;
  text-align: center;
}

.row_1_th_totalsum {
  width: 100px;
  text-align: left;
}

.basket_table_row_2 {
  width: 100%;
  margin-top: 15px;
  padding: 5px;
  height: 150px;
  display: flex;
  flex-direction: row;
  background: darkseagreen;
  box-shadow: 0 0 5px;
}

.basket_table_img {
  width: 160px;
  padding-top: 10px;
  padding-left: 5px;
}

.basket_table_name_product {
  width: 340px;
  margin-top: 50px;
  font-size: 18px;
}

.basket_table_counter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  height: 100px;
}

.button_plus {
  border: 1px solid #d5d5d5;
  border-radius: 2px;
  height: 30px;
  width: 45px;
  margin: 30px 20px 0 0;
  font-size: 20px;
  text-align: center;
}

.button_plus:active,
.button_plus:focus {
  outline: none;
}

.counter_number {
  font-size: 22px;
  text-align: center;
  margin-top: 30px;
}

.button_minus {
  border: 1px solid #d5d5d5;
  border-radius: 2px;
  height: 30px;
  width: 45px;
  margin: 30px 20px 0 20px;
  font-size: 20px;
}

.button_minus:active,
.button_minus:focus {
  outline: none;
}

.button_delete {
  margin-top: 30px;
  height: 30px;
  width: 45px;
  font-size: 18px;
}

.basket_table_price_product {
  width: 150px;
  height: 100px;
  font-size: 20px;
  margin-top: 50px;
  padding-left: 45px;
}

.basket_table_totalprice {
  width: 100px;
  height: 100px;
  font-size: 20px;
  margin-top: 50px;
}

hr {
  border: none;
  background-color: grey;
  height: 2px;
}

.ordering {
  margin: 20px 0 0 80px;
  width: 350px;
  height: 400px;
  box-shadow: 0 0 5px;
  background: darkseagreen;
  padding: 20px;
}

.ordering p {
  width: 300px;
  font-size: 22px;
  margin: 40px 0;
}

.ordering_btn {
  height: 40px;
  width: 180px;
  border-radius: 2px;
  font-size: 14px;
  background-color: rgb(141, 206, 157);
  box-shadow: 0 -3px rgb(20, 163, 91) inset;
  transition: 0.2s;
  color: black;
}

.ordering_btn:hover {
  background: rgb(53, 167, 110);
}

.ordering_btn:active {
  background: rgb(33, 147, 90);
  box-shadow: 0 3px rgb(33, 147, 90) inset;
}

.ordering_closed {
  display: none;
}
</style>
