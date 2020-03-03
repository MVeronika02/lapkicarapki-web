import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allCategoryAnimal: [],
    allProducts: [],
    filtredArray: []
  },
  // getters: {
  //   getCategory: (state) => {
  //     return state.allCategoryAnimal.find(allCategoryAnimal => allCategoryAnimal.idanimal === 1)
  //   }
  // },

  mutations: {
    SET_Category: (state) => {
      Axios.get('http://localhost:4747/categoryanimals')
        .then(allCategoryAnimal => {
          state.allCategoryAnimal = allCategoryAnimal.data
          console.log(state.allCategoryAnimal)
        })
    },
    filterCategory: (state, idanimal) => {
      console.log(idanimal)
      state.filtredArray = state.allCategoryAnimal.filter(object => object.idanimal === idanimal)
      console.log(state.filtredArray)
    },
    GetProducts: (state) => {
      Axios.get('http://localhost:4747/products')
        .then(allProducts => {
          state.allProducts = allProducts.data
          console.log(state.allProducts)
        })
    }
  },
  actions: {
    //   async actionA ({ commit }) {
    //     commit('setCategory', await SET_Category())
    //   }
    // loadCategory ({ commit }) {
    //   Axios.get('http://localhost:4747/categoryanimals')
    //     .then(r => r.data)
    //     .then(allCategoryAnimal => {
    //       commit('SET_Category', allCategoryAnimal)
    //     })
  }
})
