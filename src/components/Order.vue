<template>
  <div class="order_container">
    <div class="form_order">
      <h1>ОФОРМЛЕНИЕ ЗАКАЗА</h1>

      <div class="buyer_info">
        <p class="buyer_info_title">Ваши данные</p>
        <form class="buyer_info_form">
          <input type="text" class="buyer_info_form_input" placeholder="*Имя" required />
          <input type="text" class="buyer_info_form_input" placeholder="*Фамилия" required />
          <input type="text" class="buyer_info_form_input" placeholder="*Номер телефона" required />
          <input
            type="text"
            pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
            class="buyer_info_form_input"
            placeholder="*Адрес электронной почты"
            required
          />
          <input type="text" class="buyer_info_form_input" placeholder="*Город" required />
        </form>
      </div>

      <div class="block_select_delivery">
        <v-card class="delivery_buttons">
          <!-- <v-tabs v-model="tab" background-color="green darken-3" color="teal lighten-5"> -->
            <v-tabs v-model="tab" background-color="#8dce9d" color="lighten-5">
            <!-- <v-tabs-slider color="#14a35b"></v-tabs-slider> -->
            <v-tab href="#tab-1" class="select_button">Пункт выдачи</v-tab>
            <v-tab href="#tab-2" class="select_button">Доставка курьером</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item id="tab-1">
              <v-card flat height="170px">
                <v-card-text>
                  <label for="markets" class="select_label">Выберите магазин: </label>
                  <select name="markets" id="markets" class="select_market">
                    <option value="value1" class="select_option">Магазин 1</option>
                    <option value="value2" selected>Магазин 2</option>
                    <option value="value3">Магазин 3</option>
                  </select>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item id="tab-2">
              <v-card flat>
                <v-card-text>
                  <form class="pick_up_point">
                    <input type="text" class="pick_up_point_input" placeholder="*Улица" required />
                    <input type="text" class="pick_up_point_input" placeholder="*Дом" required />
                    <input type="text" class="pick_up_point_input" placeholder="Квартира" required />
                    <input
                      type="text"
                      class="pick_up_point_input"
                      placeholder="*Дата доставки"
                      required
                    />
                  </form>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </div>

      <div class="block_pay">
        <p class="block_pay_name">Способ оплаты</p>
        <form class="form_pay">
          <p class="form_pay_input">
            <input type="radio" id="check1" name="check" />
            <label for="check1">Оплата онлайн</label>
          </p>
          <p class="form_pay_input">
            <input type="radio" id="check2" name="check" />
            <label for="check2">Наличными курьеру</label>
          </p>
        </form>
      </div>

      <button class="btn_next_step">Оформить заказ</button>
    </div>

    <div class="check_basket">
      <p class="check_basket_name">Состав заказа</p>
      <div
        v-for="allProduct in $store.state.basketContent"
        :key="allProduct.idProduct"
        class="check_products"
      >
        <p class="check_products_name">{{ allProduct.nameProduct }}</p>
        <span class="check_products_counter">{{ allProduct.quantity }} шт.</span>
        <p class="check_products_price">{{ allProduct.totalPrice }} тг</p>
      </div>
      <hr />
      <p class="check_products_totalprice">К оплате: <span class="check_products_totalprice_sum">{{ totalPrice }}</span> тг</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
var count = 0;

export default {
  name: "Order",
  data() {
    return {
      tab: null,
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
  },
};
</script>

<style>
.order_container {
  background: rgb(230, 230, 250, 0.95);
  display: flex;
}

.form_order {
  margin: 20px 0 50px 150px;
  width: 50%;
}

.buyer_info {
  width: 95%;
}

.buyer_info_title {
  border-radius: 2px;
  background: rgb(141, 206, 157);
  font-size: 22px;
  padding: 12px;
  margin-top: 10px;
}

.buyer_info_form {
  width: 80%;
}

.buyer_info_form_input {
  width: 500px;
  height: 50px;
  margin: 10px 0px 20px 20px;
  border: 1px solid grey;
  border-radius: 4px;
}

.buyer_info_form_input:hover {
  box-shadow: 0 3px rgb(20, 163, 91);
}

.block_select_delivery {
  width: 95%;
  height: 250px;
  margin: 20px 0 20px 0;
}

.v-tab {
  max-width: 435px !important;
}

.select_button {
  background: rgb(141, 206, 157);
  width: 435px !important;
  height: 50px;
}

.select_button:active {
  background: #14a35b;
}

.select_label {
  font-size: 22px;
}

.select_market {
  width: 150px;
  height: 30px;
  border: 1px solid grey;
  padding: 2px;
  font-size: 16px;
}

.pick_up_point_input {
  width: 300px;
  height: 50px;
  margin: 10px;
  border: 1px solid grey;
  border-radius: 4px;
}

.pick_up_point_input:hover {
  box-shadow: 0 3px rgb(20, 163, 91);
}

.block_pay {
  margin: 0px 0 50px 0;
}

.block_pay_name {
  background: rgb(141, 206, 157);
  width: 95%;
  font-size: 22px;
  height: 50px;
  padding: 5px;
  border-radius: 2px;
}

.form_pay {
  display: flex;
}

.form_pay_input {
  margin-left: 20px;
  width: 30%;
  height: 50px;
  border: 1px solid green;
}

.btn_next_step {
  border-radius: 4px;
  background-color: rgb(141, 206, 157);
  box-shadow: 0 -3px rgb(20, 163, 91) inset;
  transition: 0.2s;
  width: 220px;
  height: 50px;
  margin-right: 50px;
  float: right;
}

.btn_next_step:hover {
  background: rgb(20, 163, 91);
}

.check_basket {
  width: 500px;
  height: 700px;
  margin-top: 75px;
  border: 1px solid rgb(20, 163, 91);
  box-shadow: 0 0 3px rgb(20, 163, 91);
  padding: 15px;
}

.check_basket_name {
  font-size: 22px;
}

.check_products {
  display: flex;
}

.check_products_name {
  width: 300px;
  font-size: 18px;
}

.check_products_counter {
  width: 50px;
  font-size: 18px;
}

.check_products_price {
  width: 100px;
  font-size: 18px;
}

.check_products_totalprice {
  font-size: 18px;
  margin-top: 10px;
}

.check_products_totalprice_sum {
  margin-left: 220px;
  font-size: 24px;
  font-weight: 600;
}
</style>