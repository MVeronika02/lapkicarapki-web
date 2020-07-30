<template>
  <div class="basket_details">
    <h3 class="basket_name">Ваша корзина ({{ $store.state.cartCount }})</h3>
    <div class="basket_details_info">
      <table v-if="$store.state.basketContent.length > 0" class="basket_details_table">
        <tr class="basket_table_row_1">
          <th class="row_1_th_name">Товары</th>
          <th class="row_1_th_count_product">Количество</th>
          <th class="row_1_th_price">Цена</th>
          <th class="row_1_th_totalsum">Сумма</th>
        </tr>

        <tr
          v-for="allProduct in $store.state.basketContent"
          :key="allProduct.idProduct"
          class="basket_table_row_2"
        >
          
          <td class="basket_table_img">
            <img :src="imageProduct(allProduct.urlImageProduct)" width="80%" height="90%" />
          </td>
          <td class="basket_table_name_product">
            <p>{{ allProduct.nameProduct }}</p>
          </td>

          <td class="basket_table_counter">
            <button type="button" class="button_plus" @click="addToBasket(allProduct)">+</button>
            <span class="counter_number">{{ allProduct.quantity }}</span>
            <button type="button" class="button_minus" @click="minusProduct(allProduct)">-</button>
            <button type="button" class="button_delete" @click="removeProducts(allProduct)">
              <i class="far fa-trash-alt"></i>
            </button>
          </td>
          <td class="basket_table_price_product">
            <p>{{ allProduct.priceProduct }} тг</p>
          </td>
          <td class="basket_table_totalprice">
            <p>{{ allProduct.totalPrice }} тг</p>
          </td>
        </tr>
      </table>
      <div v-else class="navbar-dropdown is-boxed is-right">
        <a class="navbar-item">Kорзина пуста</a>
      </div>

      <div class="ordering">
        <h1>Итого</h1>
        <p>Товара на: {{ totalPrice }} тг</p>
        <hr/>
        <p>К оплате: {{ totalPrice }} тг</p>
        <v-btn @click="goToOrdering()">Оформить заказ</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
var count = 0;
export default {
  name: "Basket",
  data() {
    return {
      prodId: this.$route.params.Pid,
    };
  },
  mounted() {
    this.$store.commit("saveBasket");
  },
  computed: mapState(["allProducts"]),
  computed: {
    totalPrice() {
      let total = 0;
      for (let allProduct of this.$store.state.basketContent) {
        total += allProduct.totalPrice;
      }
      return total.toFixed(2);
    },
  },
  methods: {
    imageProduct(imagePath) {
      return require(`../static/${imagePath}`);
    },
    addToBasket(allProduct) {
      this.$store.commit("SETProductToBasket", allProduct);
      console.log("added");
    },
    minusProduct(allProduct) {
      this.$store.commit("removeProductFromBasket", allProduct);
    },
    removeProducts(allProduct) {
      this.$store.commit("removeAllProduct", allProduct);
    },
    goToOrdering(allProduct) {
      this.$router.push({ name: "Order" });
    }
  },
};
</script>

<style>
.basket_details {
  background: rgb(230, 230, 250, 0.95);
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.basket_name {
  width: 400px;
  font-size: 44px;
  color: darkslateblue;
  height: 100px;
}

.basket_details_info {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.basket_details_table {
  width: 50%;
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
  /* text-align: left; */
  
}

.row_1_th_name {
  width: 500px;
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
  border: none; /* Убираем границу */
  background-color: grey; /* Цвет линии */
  height: 2px; /* Толщина линии */
}

.ordering {
  margin-top: 45px;
  margin-left: 40px;
  width: 35%;
  box-shadow: 0 0 5px;
  background: darkseagreen;
  padding: 15px;
}

.ordering p {
  width: 500px;
  font-size: 22px;
  margin: 40px 0;
}
</style>
