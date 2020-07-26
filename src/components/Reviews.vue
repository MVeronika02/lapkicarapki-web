<template>
<div class="reviews-content">
  <div width="50%">
    <ul>
      <li v-for="allReview in allReviews" :key="allReview.idReview" class="show-review">
        <div class="review-header">
          <p class="review-header-p">{{ allReview.reviewer_name }}</p>
          
          <div v-if="allReview.numbers_of_stars == 5">
          <div class="rating-mini">
	          <span class="active"></span>	
	          <span class="active"></span>    
	          <span class="active"></span>
            <span class="active"></span> 
            <span class="active"></span> 
          </div>
          </div>

          <div v-else-if="allReview.numbers_of_stars == 4">
            <div class="rating-mini">
	            <span class="active"></span>	
	            <span class="active"></span>    
	            <span class="active"></span>
              <span class="active"></span> 
            </div>
          </div>

          <div v-else-if="allReview.numbers_of_stars == 3">
            <div class="rating-mini">
	            <span class="active"></span>	
	            <span class="active"></span>    
	            <span class="active"></span>
            </div>
          </div>

          <div v-else-if="allReview.numbers_of_stars == 2">
            <div class="rating-mini">
	            <span class="active"></span>	
	            <span class="active"></span>    
            </div>
          </div>

          <div v-else-if="allReview.numbers_of_stars == 1">
            <div class="rating-mini">
	            <span class="active"></span>	
            </div>
          </div>

          <div>
            <p class="review-content-date">{{ allReview.review_date }}</p>
          </div>
        </div>

        <div>
          <p class="review-content-text">{{ allReview.text_review }}</p>
        </div>
        <hr>
      </li>
    </ul>

    <div>
      <a href="#popup-wrapper"><button class="btn-review">Оставить отзыв</button></a>
    </div>

    <v-container>
        <v-row justify="center">
          <v-col cols="8">
            <v-container class="max-width">
              
              <v-pagination
                v-model="page"
                class="my-4"
                :length="length"
                total-visible="5"
                @input="showPage(page)"                
              ></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
  </div>

  <div id="popup-wrapper" class="overlay">
	  <div class="popup">
		  <a class="close" href="#">&times;</a>
		  <div class="content">
        <form id="ProductReview" class="rating" method="post" @submit.prevent="addReview">
          <div class="rating-area">
	          <input type="radio" id="star-5" name="rating" v-model="content.stars_product" value="5">
	          <label for="star-5" title="Оценка «5»"></label>	
	          <input type="radio" id="star-4" name="rating" v-model="content.stars_product" value="4">
	          <label for="star-4" title="Оценка «4»"></label>    
	          <input type="radio" id="star-3" name="rating" v-model="content.stars_product" value="3">
	          <label for="star-3" title="Оценка «3»"></label>  
	          <input type="radio" id="star-2" name="rating" v-model="content.stars_product" value="2">
	          <label for="star-2" title="Оценка «2»"></label>    
	          <input type="radio" id="star-1" name="rating" v-model="content.stars_product" value="1">
	          <label for="star-1" title="Оценка «1»"></label>
          </div>

          <div class="raitingContent">
            <div class="styleFname">
              <input type="text" id="fname" name="fname" v-model="content.name_reviewer" placeholder="*Имя">
            </div>
            <div class="styleReview">
              <input type="text" name="textReview" id="textReview" v-model="content.text_review" placeholder="*Комментарий"> 
            </div>
          </div>

          <p width="30%">
            <input type="submit" value="Отправить" class="btn-submit">  
          </p>
        </form>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import { mapState } from 'vuex'
import Axios from 'axios'

export default {
    name: 'Reviews',
    props: ['productId'],
    data () {
      return {
        page: 1,
        length: 4,
        allReviews: [],
        content: {
          product_id: this.productId,
          stars_product: '',
          name_reviewer: '',
          text_review: ''
        }
      }
    },
    created () {
        Axios.get('http://localhost:5000/inforeviews?productid=' + this.productId + '&offset=1&limit=3')
          .then(reviewsProduct => {
            this.allReviews = reviewsProduct.data.result
            console.log(this.allReviews, 'reviews')
            console.log(this.productId)
          })
    },
    methods: {
      showPage (page) {
        Axios.get('http://localhost:5000/inforeviews?productid=' + this.productId + '&offset=' + this.page + '&limit=3')
          .then(reviewsProduct => {
            this.allReviews = reviewsProduct.data.result
            console.log(this.allReviews, 'reviews')
            console.log(this.productId)
          })
      },
      addReview (event) {
        console.log(this.content)
        console.log(this.productId)
        Axios.post('http://localhost:5000/reviews', this.content)
          .then((response) => {
            console.log(response)
          }), (error) => {
            console.log(error)
          }
      }
    }
}
</script>

<style>

.reviews-content {
  width: 100%;
}

.btn-review {
  background-color: black;
  color: white;
  border-radius: 10%;
  font-size: 16px;
}

.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
  visibility: hidden;
  opacity: 0;
}
.overlay:target {
  visibility: visible;
  opacity: 1;
}

.popup {
  margin: 70px auto;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  width: 30%;
  position: relative;
  transition: all 5s ease-in-out;
}

.popup h2 {
  margin-top: 0;
  color: #333;
  font-family: Tahoma, Arial, sans-serif;
}
.popup .close {
  position: absolute;
  top: 20px;
  right: 30px;
  transition: all 200ms;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
}
.popup .close:hover {
  color: #06D85F;
}
.popup .content {
  max-height: 50%;
  overflow: auto;
}

.styleStars {
  margin-bottom: 20px;
}

.rating-area {
	overflow: hidden;
	width: 265px;
	margin: 0 auto;
}
.rating-area:not(:checked) > input {
	display: none;
}
.rating-area:not(:checked) > label {
	float: right;
	width: 42px;
	padding: 0;
	cursor: pointer;
	font-size: 50px;
	line-height: 50px;
	color: lightgrey;
	text-shadow: 1px 1px #bbb;
}
.rating-area:not(:checked) > label:before {
	content: '★';
}
.rating-area > input:checked ~ label {
	color: gold;
	text-shadow: 1px 1px #c60;
}
.rating-area:not(:checked) > label:hover,
.rating-area:not(:checked) > label:hover ~ label {
	color: gold;
}
.rating-area > input:checked + label:hover,
.rating-area > input:checked + label:hover ~ label,
.rating-area > input:checked ~ label:hover,
.rating-area > input:checked ~ label:hover ~ label,
.rating-area > label:hover ~ input:checked ~ label {
	color: gold;
	text-shadow: 1px 1px goldenrod;
}
.rate-area > label:active {
	position: relative;
}

.styleFname {
  color: #202020;
  border-color: #a7a7a7;
  border: 1px solid var(--input-border-color);
  border-radius: var(--input-border-radius);
  background-color: var(--color-footer-light);
  font-weight: 300;
  padding: 11px 25px;
  width: 30%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    font-size: 16px;
    line-height: 1;
}

.styleReview {
  color: #202020;
  border-color: #a7a7a7;
  border: 1px solid var(--input-border-color);
  border-radius: var(--input-border-radius);
  background-color: var(--color-footer-light);
  font-weight: 300;
  /* width: 0%; */
  height: 100px;
  padding: 11px 25px;
  appearance: none;
    font-size: 16px;
    line-height: 1;
}

#textReview {
  width: 100%;
  height: 80px;
}

.btn-submit {
  border-radius: 10%;
  font-size: 16px;
}

.rating-mini {
	display: inline-block;
	font-size: 0;
}
.rating-mini span {
	padding: 0;
	font-size: 20px;
	line-height: 1;
	color: lightgrey;
}
.rating-mini > span:before {
	content: '★';
}
.rating-mini > span.active {
	color: gold;
}

.pName {
  width: 40%;
  margin-right: 0;
}

.show-review {
  width: 90%;
  list-style: none;
  margin-bottom: 50px;
}

.review-header {
  margin-top: 20px;
  display:flex;
  flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: flex-start;
	align-content: stretch;
}

.review-header-p {
  font-size: 22px;
  font-weight: bold;
}

.review-content-date {
  font-size: 14px;
}

.review-content-text {
  font-size: 14px;
}

hr {
  border: none; /* Убираем границу */
  background-color: grey; /* Цвет линии */
  color: grey; /* Цвет линии для IE6-7 */
  height: 0.5px; /* Толщина линии */
}

</style>
