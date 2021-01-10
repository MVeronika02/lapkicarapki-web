import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)
let basketContent = window.localStorage.getItem('basketContent')
let cartCount = window.localStorage.getItem('cartCount')
let backendServerUrl = "http://localhost:5000"


export default new Vuex.Store({
  state: {
    categoriesProducts: [],
    allProducts: {
      countPage: 0,
      data: [] 
    },
    filtredCategory: [],
    filterCategoryOneAnimal: [],
    productsOneCategory: {
      countPage: 0,
      data: []
    },
    allProductReviews: {
      countPage: 0,
      data: []
    },
    allUserOrders: {
      countPage: 0,
      data: []
    },
    basketContent: basketContent ? JSON.parse(basketContent) : [],
    cartCount: cartCount ? parseInt(cartCount) : 0,
    filtredProducts: [],
    valueMin: 0,
    valueMax: 0,
    userInfo: {},
  },

  getters: {
    auth(state) {
      console.log(state.user, 'getter')
      return state.user
    }
  },

  //Мутации
  mutations: {
    //Запись всех категории товаров для животных в переменную state.categoriesProducts
    allCategories (state, categoryFromDB) {
      state.categoriesProducts = categoryFromDB
    },
    //Фильтрация категорий товаров для конкретного вида животных по id животного и запись отфильтрованных категорий в переменную state.filtredCategory
    filterCategoriesForDropdownList: (state, idAnimal) => {
      state.filtredCategory = state.categoriesProducts.filter(object => object.id_animal === idAnimal)
    },
    filterCategoryOneAnimal: (state, idAnimal) => {
      state.filterCategoryOneAnimal = state.categoriesProducts.filter(object => object.id_animal === idAnimal)
    },
    //Товары, отфильтрованные по цене
    filterProductsByPrice: (state, products) => {
      state.filtredProducts = products
    },
    //Показ товаров на каждой странице (пагинация)
    showProductsOnPage: (state, selectedPage) => {
      state.allProducts.data = selectedPage.result.product
      state.allProducts.countPage = selectedPage.result.count_page 
    },
    //Фильтр товаров для каждой категории, их запись в переменную state.productsOneCategory
    filterProductsForOneCategory: (state, products) => {
      state.productsOneCategory.data = products.result.product
      state.productsOneCategory.countPage = products.result.count_page
    },
    // max, min значения для бегунка диапазона цены товара в Sidebar
    valueMinMaxSidebar: (state, value) => {
      state.valueMin = value[0]
      state.valueMax = value[1]
    },
    // Данные о пользователя из БД при входе на сайт, запись данных в переменную state.userInfo
    userInfo: (state, userData) => {
      state.userInfo = userData
    },
    // Все отзывы о товаре, их записаь в переменную state.allProductReviews, пагинация
    reviewsToPage: (state, selectedReviews) => {
      state.allProductReviews.data = selectedReviews.result
      state.allProductReviews.countPage = selectedReviews.count_page
      
    },
    // Все заказы данного пользователя, их записаь в переменную state.userOrders, пгинация
    userOrders: (state, infoOrders) => {
      state.allUserOrders.data = infoOrders.result
      state.allUserOrders.countPage = infoOrders.count_page
    },
    
    //КОРЗИНА
    // Сохранение данных о товарах и общем количетсве в localStorage
    saveBasket: (state) => {
      window.localStorage.setItem('basketContent', JSON.stringify(state.basketContent))
      window.localStorage.setItem('cartCount', state.cartCount)
    },
    // Добавление товара в корзину, общее количество и цену
    productsToBasket: (state, allDetailProduct) => {
      let newItem = state.basketContent.find(object => object.id_product === allDetailProduct.id_product)
      if (newItem) {
        newItem.quantity++
        newItem.totalPrice = newItem.quantity * newItem.price_product
      } else {
        Vue.set(allDetailProduct, 'quantity', 1)
        Vue.set(allDetailProduct, 'totalPrice', allDetailProduct.price_product)
        state.basketContent.push(allDetailProduct)
      }
      state.cartCount++
    },
    //Удаление товара из корзины поштучно
    removeProductFromBasket: (state, allDetailProduct) => {
      let newItemRemove = state.basketContent.find(object => object.id_product === allDetailProduct.id_product)
      
      if (newItemRemove.quantity > 0) {
        if (newItemRemove) {
          newItemRemove.quantity--
          newItemRemove.totalPrice = newItemRemove.quantity * newItemRemove.price_product
        }
      }
      if (state.cartCount > 0) {
        state.cartCount--
      }

    },
    // Удаление товара из корзины полностью
    removeAllProduct: (state, allDetailProduct) => {
      let index = state.basketContent.indexOf(allDetailProduct)
      if (index > -1) {
        let product = state.basketContent[index]
        state.cartCount -= product.quantity
        state.basketContent.splice(index, 1)
      }
      if (state.basketContent == 0) {
        localStorage.clear()
      }
    }
  },

  // Действия
  actions: {
    //Все категории продуктов для животных
    getCategories: async (context) => {
      await Axios.get(backendServerUrl + '/categories')
        .then(categoryFromDB => {
          context.commit('allCategories', categoryFromDB.data.result)
        })
    },
    //Товары на страницах(пагинация контента)
    getProductsOnPage: async (context, page) => {
      await Axios.get(backendServerUrl + '/paginationcontent?limit=12&numberpage=' + page)
        .then(resultBackend => {
          context.commit('showProductsOnPage', resultBackend.data)
        })
    },
    //Товары для 1 категории на страницах(пагинация)
    getProductsForOneCategoryOnPage: async (context, payload) => {
      await Axios.get(backendServerUrl + '/paginationproductsonecategory?limit=12&numberpage=' + payload.page + '&animal=' + payload.idAnimal + '&category=' + payload.idCategory)
        .then(resultBackend => {
          context.commit('filterProductsForOneCategory', resultBackend.data)
        })
    },
    //Товары, отфильтрованные по цене
    getFilterProductsByPrice: async (context, payload) => {
      await Axios.get(backendServerUrl + '/products?valueMin=' + payload.min + '&valueMax=' + payload.max + '&limit=5&numberpage=' + payload.page)
        .then(products => {
          context.commit('filterProductsByPrice', products.data.result)
        })

    },
    //Отзывы о товаре
    getProductReviewsOnPage: async (context, payload) => {
      console.log(payload)
      await Axios.get(
        backendServerUrl + '/inforeviews?productid=' + payload.id + '&offset=' + payload.page + '&limit=3'
      ).then((reviewsProduct) => {
        context.commit('reviewsToPage', reviewsProduct.data)
      });
    },
    //Все заказы пользователя
    getUserOrders: async (context, payload) => {
      await Axios.get(backendServerUrl + '/myorders?offset=' + payload.page + '&limit=6'
      ).then((response) => {
        context.commit('userOrders', response.data)
      });
    }
  }
})

