<template>
  <div class="order_container">
    <div class="form_order">
      <h1>ОФОРМЛЕНИЕ ЗАКАЗА</h1>

      <div class="buyer_info">
        <p>Ваши данные</p>
        <form class="buyer_name">
          <input type="text" class="buyer_name_input" placeholder="*Имя" required />
          <input type="text" class="buyer_name_input" placeholder="*Фамилия" required />
          <input type="text" class="buyer_name_input" placeholder="*Номер телефона" required />
          <input
            type="text"
            pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
            class="buyer_name_input"
            placeholder="*Адрес электронной почты"
            required
          />
          <input type="text" class="buyer_name_input" placeholder="*Город" required />
        </form>
      </div>

      <div class="block_select_delivery">
        <v-card class="delivery_buttons">
          <v-tabs v-model="tab" background-color="green darken-3" color="teal lighten-5">
            <v-tabs-slider color="teal lighten-3"></v-tabs-slider>
            <v-tab href="#tab-1" class="select_button">Пункт выдачи</v-tab>
            <v-tab href="#tab-2" class="select_button">Доставка курьером</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item id="tab-1">
              <v-card flat>
                <v-card-text>
                  <label for="markets" class="select_label">Выберите магазин:</label>
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
        <p class="block_pay_p">Способ оплаты</p>
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
      <p>Состав заказа</p>
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
      <p class="check_products_totalprice">К оплате: {{ totalPrice }} тг</p>
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
    console.log(this.$store.state.basketContent);
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
  background: rgb(230, 230, 250, 1);
  display: flex;
  padding: 12px;
}

.form_order {
  width: 60%;
}

.buyer_info {
  width: 95%;
  /* margin-bottom: 20px; */
}

.buyer_info > p {
  background: darkgreen;
  font-size: 22px;
  padding: 12px;
  margin-top: 10px;
}

.buyer_name {
  width: 80%;
}

.buyer_name_input {
  width: 300px;
  height: 50px;
  margin: 10px 0px 20px 50px;
  border: 1px solid grey;
  border-radius: 4px;
}

.block_select_delivery {
  margin-bottom: 40px;
}

.delivery_buttons {
  background: darkgreen;
  width: 900px;
}

.select_button {
  width: 450px;
  height: 50px;
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

.block_pay_p {
  background: darkgreen;
  width: 95%;
  font-size: 22px;
  height: 50px;
  padding: 5px;
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
  border: 1px solid green;
  border-radius: 5px;
  background: darkgreen;
  width: 150px;
  height: 50px;
  margin-right: 40px;
  float: right;
}

.btn_next_step:hover {
  background: orange;
}

.check_basket {
  width: 35%;
  margin-top: 60px;
}

.check_products {
  display: flex;
}

.check_products_name {
  width: 300px;
}

.check_products_counter {
  width: 50px;
}

.check_products_price {
  width: 100px;
}
</style>