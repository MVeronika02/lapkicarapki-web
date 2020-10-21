<template>
  <div class="reviews_composition">
    <div>
      <a href="#popup-wrapper">
        <button class="btn_add_review">Оставить отзыв</button>
      </a>
    </div>
    <ul>
      <li
        v-for="allReview in $store.state.allReviews"
        :key="allReview.idReview"
        class="reviews_show"
      >
        <div class="reviews_show_header">
          <p class="reviews_show_header_p">{{ allReview.reviewer_name }}</p>

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

          <p class="reviews_show_header_date">{{ allReview.review_date }}</p>
        </div>

        <p class="reviews_composition_text">{{ allReview.text_review }}</p>
        <hr />
      </li>
    </ul>

    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              v-model="page"
              class="my-4"
              :length="$store.state.countPageReview"
              total-visible="5"
              @input="showPage(page)"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>

    <div id="popup-wrapper" class="reviews_composition_overlay">
      <div class="popup">
        <a class="close" href="#">&times;</a>
        <form
          id="ProductReview"
          class="rating"
          method="post"
          @submit.prevent="addReview"
          onsubmit="alert('Ваш отзыв отправлен!');return false"
        >
          <div class="rating-area">
            <input
              type="radio"
              id="star-5"
              name="rating"
              v-model="content.stars_product"
              value="5"
            />
            <label for="star-5" title="Оценка «5»"></label>
            <input
              type="radio"
              id="star-4"
              name="rating"
              v-model="content.stars_product"
              value="4"
            />
            <label for="star-4" title="Оценка «4»"></label>
            <input
              type="radio"
              id="star-3"
              name="rating"
              v-model="content.stars_product"
              value="3"
            />
            <label for="star-3" title="Оценка «3»"></label>
            <input
              type="radio"
              id="star-2"
              name="rating"
              v-model="content.stars_product"
              value="2"
            />
            <label for="star-2" title="Оценка «2»"></label>
            <input
              type="radio"
              id="star-1"
              name="rating"
              v-model="content.stars_product"
              value="1"
            />
            <label for="star-1" title="Оценка «1»"></label>
          </div>

          <div class="reviews_composition_overlay_field">
            <input
              type="text"
              id="fname"
              name="fname"
              class="reviews_input"
              v-model="content.name_reviewer"
              placeholder="*Имя"
              required
            />
            <input
              type="text"
              name="textReview"
              id="textReview"
              class="reviews_input"
              v-model="content.text_review"
              placeholder="*Комментарий"
              required
            />
          </div>

          <input type="submit" value="Отправить" class="btn_submit_review" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Axios from "axios";

export default {
  name: "Reviews",
  props: ["productId"],
  data() {
    return {
      page: 1,
      content: {
        product_id: this.productId,
        stars_product: "",
        name_reviewer: "",
        text_review: "",
      },
    };
  },
  created() {
    this.$store.dispatch("ReviewsOnPage", { id: this.productId, page: 1 });
  },
  methods: {
    showPage(page, productId) {
      this.$store.dispatch("ReviewsOnPage", { id: this.productId, page: page });
    },
    addReview(event) {
      console.log(this.content);
      console.log(this.productId);
      Axios.post,
        ("http://localhost:5000/reviews", this.content).then((response) => {
          console.log(response);
        }),
        (error) => {
          console.log(error);
        };
    },
  },
};
</script>

<style>
.reviews_composition {
  width: 100%;
}

.btn_add_review {
  background-color: #ff8000;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  height: 40px;
  width: 150px;
  /* float: right; */
  margin: 40px 20px;
}

.reviews_show {
  width: 85%;
  list-style: none;
  margin-bottom: 50px;
}

.reviews_show_header {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.reviews_show_header_p {
  font-size: 22px;
  font-weight: bold;
}

.reviews_show_header_date {
  font-size: 14px;
}

.reviews_composition_text {
  font-size: 14px;
}

.reviews_composition_overlay {
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
.reviews_composition_overlay:target {
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
  color: #06d85f;
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
  content: "★";
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

.reviews_composition_overlay_field {
  color: #202020;
  border-color: #a7a7a7;
  font-weight: 300;
  padding: 11px 25px;
  width: 80%;
  height: 200px;
  font-size: 16px;
  line-height: 1;
}

.reviews_composition_overlay_field #fname {
  height: 30px;
  width: 80%;
  margin-bottom: 15px;
}

.reviews_composition_overlay_field #textReview {
  height: 80px;
  width: 80%;
}

.reviews_input:invalid {
  border: 2px solid red;
}

.reviews_input:valid {
  border: 2px solid black;
}

.btn_submit_review {
  width: 100px;
  height: 50px;
  border-radius: 2px;
  font-size: 16px;
  background: rgb(1, 51, 1);
}

.btn_submit_review:hover {
  background: rgb(31, 107, 31);
}

.btn_submit_review:active {
  background: grey;
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
  content: "★";
}
.rating-mini > span.active {
  color: gold;
}

hr {
  border: none;
  background-color: grey;
  color: grey;
  height: 0.5px;
}
</style>