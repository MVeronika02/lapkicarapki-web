<template>
  <div class="basket_details">
    <h3 class="basket_name">Ваша корзина ({{ $store.state.cartCount }})</h3>
    <div v-if="$store.state.basketContent.length > 0">
      <table>
        <tr class="basket_table_row_1">
          <th style="text-align:left">Наименование</th>
          <th>Количество</th>
          <th>Цена 1 шт.</th>
          <th>Общая сумма</th>
        </tr>
        <div v-for="allProduct in $store.state.basketContent" :key="allProduct.idProduct">
          <tr class="basket_table_row_2">
            <td class="basket_table_name_product">
              <p>{{ allProduct.nameProduct }}</p>
              <img :src="imageProduct(allProduct.urlImageProduct)" width="30%" height="50%" />
            </td>

            <td class="basket_table_counter">
              <button type="button" class="button_plus" @click="addToBasket(allProduct)">+</button>
              <span class="counter_number">{{ allProduct.quantity }}</span>
              <button type="button" class="button_minus" @click="minusProduct(allProduct)">-</button>
              <button type="button" class="button_delete" @click="removeProducts(allProduct)">
                <i class="fa fa-times" aria-hidden="true"></i>
                Удалить
              </button>
            </td>
            <td class="basket_table_price_product">
              <p>{{ allProduct.priceProduct }} тг</p>
            </td>
            <td class="basket_table_totalprice">
              <p>{{ allProduct.totalPrice }} тг</p>
            </td>
          </tr>
        </div>
      </table>
      <hr />
      <div class="sum_price">
        <v-btn>Оформить заказ</v-btn>
        <p>Итого: {{ totalPrice }} тг</p>
      </div>
    </div>

    <div v-else class="navbar-dropdown is-boxed is-right">
      <a class="navbar-item">Kорзина пуста</a>
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
  },
};
</script>

<style>
.basket_details {
  width: 100%;
  background: rgb(230, 230, 250, 1);
  padding: 20px;
}

.basket_name {
  width: 400px;
  font-size: 44px;
  color: darkslateblue;
  height: 100px;
}

.basket_table_row_1 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

/* границы ячеек первого ряда таблицы */
th {
  width: 25%;
  font-size: 30px;
}

.basket_table_row_2 {
  margin-top: 30px;
  height: 250px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  /* box-shadow: 0 0 2px; */
  background: cornsilk;
}

.basket_table_name_product {
  width: 25%;
}

.basket_table_name_product p {
  width: 100%;
  font-size: 26px;
}

.basket_table_counter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 25%;
  height: 100px;
  padding: 20px;
}

.button_plus {
  border: 1px solid #d5d5d5;
  border-radius: 2px;
  height: 35px;
  width: 50px;
  margin-left: 75px;
  margin-right: 20px;
  font-size: 26px;
  text-align: center;
}

.button_plus:active,
.button_plus:focus {
  outline: none;
}

.counter_number {
  font-size: 22px;
  text-align: center;
}

.button_minus {
  border: 1px solid #d5d5d5;
  border-radius: 2px;
  height: 35px;
  width: 50px;
  margin-left: 20px;
  margin-right: 70px;
  font-size: 26px;
}

.button_minus:active,
.button_minus:focus {
  outline: none;
}

.button_delete {
  width: 150px;
}

/* границы ячеек тела таблицы */
.basket_table_price_product {
  width: 25%;
  height: 100px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  font-size: 26px;
}

.basket_table_totalprice {
  width: 25%;
  height: 100px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  font-size: 26px;
}

hr {
  border: none; /* Убираем границу */
  background-color: grey; /* Цвет линии */
  height: 2px; /* Толщина линии */
}

.sum_price {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}

.sum_price p {
  width: 18%;
  font-size: 22px;
}
</style>
