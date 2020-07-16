<template>
  <div class="basketStyle">
    <div class="basketHead">
        <h3>Ваша корзина ({{ $store.state.cartCount }})</h3>
    </div>

    <div class="infoTable">
      <div v-if="$store.state.basketContent.length > 0" class="navbar-dropdown is-boxed is-right">
        <a class="navbar-link" href="">
        </a>
        <table cellpadding='0' cellspacing='0' style='border-collapse:collapse'>
        <tr class="row-1"><th style="text-align:left">Наименование</th><th>Количество</th><th>Цена 1 шт.</th><th>Общая сумма</th></tr>
        <div class="basketContent" v-for="allProduct in $store.state.basketContent" :key="allProduct.idProduct">
        <tr class="row-2">
            <td width="25%"><div class="payProduct">
                    <p>{{ allProduct.nameProduct }}</p>
                    <!-- * {{ allProduct.quantity }} - {{ allProduct.priceProduct }} -->
                    <img :src="imageProduct(allProduct.urlImageProduct)" width="40%" height="20%">
                </div></td>
            
            <td width="25%"><div id="counter">
                <button type="button" class="button_plus" @click="addToBasket(allProduct)">+</button>
                <div id="buttonCountNumber"><span id="displayCount">{{ allProduct.quantity }}</span></div>
                <button type="button" class="button_minus" @click="removeProduct(allProduct)">-</button>
            </div></td>
            <td class="row-2-cell-3"><p>{{ allProduct.priceProduct }} тг</p></td>
            <td class="row-2-cell-4"><p>{{ allProduct.totalPrice }} тг</p></td>
        </tr>
        </div>
        </table>
        <hr>
        <div class="totalSum">
          <div class="btn-order">
            <v-btn>Оформить заказ</v-btn>
          </div>
          <p>Итого: {{ totalPrice }} тг</p>
        </div>
      </div>

      <div v-else class="navbar-dropdown is-boxed is-right">
            <a class="navbar-item" href="">
                Корзина пуста
            </a>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
var count = 0
export default {
  name: 'allBasket',
  data () {
    return {
        prodId:this.$route.params.Pid,
    }
  },
  mounted () {},
  computed: mapState([
    'allProducts'
  ]),
  computed: {
    totalPrice() {
      let total = 0
      for (let allProduct of this.$store.state.basketContent) {
        total += allProduct.totalPrice
      }
      return total.toFixed(2)
    }
  },
  created () {
    this.$store.dispatch('SETContent')
  },
  methods: {
    imageProduct (imagePath) {
      return require(`../static/${imagePath}`)
    },
    addToBasket (allProduct) {
      this.$store.commit('SETProductToBasket', allProduct)
      console.log('added')
    },
    removeProduct(allProduct) {
      this.$store.commit('removeProductFromBasket', allProduct)
      console.log('popopopopo')
        // var count 
        // count += value
    //    var oneProductPrice
    //    oneProductPrice += value
    //    return oneProductPrice
        // displayCount.innerHTML = count
        // console.log(oneProductPrice)
    }
  }
}
</script>

<style>
.basketStyle {
    width: 100%;
    /* height: 1000px; */
}
.basketHead {
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
	justify-content: space-between;
}

h3 {
    width: 400px;
    font-size: 44px;
    color:darkslateblue;
}
.btn-order {
    width: 600px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
	justify-content: space-between;
    align-items: center;
}

.basketContent {
    margin-top: 50px;
    margin-bottom: 80px;
    width: 100%;
    /* height: 500px; */
}

table {
    width: 100%;
}
.row-1 {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
	justify-content: flex-start;
    align-items: flex-start;
}

.row-2 {
    /* width: 100%; */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
	justify-content: space-between;
    align-items: flex-start;
}

.row-3 {
    width: 100%;
    margin-top: 50px;
}
/* границы ячеек первого ряда таблицы */
th {
    width: 25%;
    font-size: 30px;
}
/* границы ячеек тела таблицы */
.row-2-cell-3 {
    width: 25%;
    height: 100px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
	justify-content: center;
    align-items: center;
    font-size: 26px;
}

.row-2-cell-4 {
    width: 25%;
    height: 100px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
	justify-content: center;
    align-items: center;
    font-size: 26px;
}

.row-3-cell-1 {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
	justify-content: flex-end;
    align-items: center;
}

#counter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100px;
  padding: 20px;
}

/* #counter button {
    height: 17px;
    width: 17px;
} */

.button_plus {
    border: 1px solid #d5d5d5;
    border-radius: 30%;
    height: 50px;
    width: 50px;
    margin-left: 100px;
    margin-right: 20px;
    font-size: 26px;
}

.button_plus:active, 
    .button_plus:focus {
        outline: none;
}

.button_minus {
    border: 1px solid #d5d5d5;
    border-radius: 30%;
    height: 50px;
    width: 50px;
    margin-left: 20px;
    margin-right: 100px;
    font-size: 26px;
}

.button_minus:active,
    .button_minus:focus {
        outline: none;
    }

#displayCount {
    font-size: 22px;
    text-align: center;
}

.payProduct {
    width: 100%;
}

.payProduct p {
    width: 100%;
    font-size: 26px;
}

hr {
    border: none; /* Убираем границу */
    background-color: grey; /* Цвет линии */
    height: 2px; /* Толщина линии */
}

.totalSum {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
}

.btn-order {
    text-align: left;
}

.totalSum p {
    width: 18%;
    text-align: left;
    font-size: 22px;
}

</style>
