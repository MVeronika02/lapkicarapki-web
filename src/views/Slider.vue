<template>
  <div class="slider_block">
    <div class="slider_block_carousel">
      <VueSlickCarousel v-bind="settingsMainSlider" ref="c1" :asNavFor="$refs.c2">
        <!-- <div class="ttt">
          <img src="../static/birdsShamp1.jpg" width="485px" height="320px" />
        </div>
        <div>
          <img src="../static/toyCats1.jpg" width="485px" height="320px" />
        </div>
        <div>
          <img src="../static/rioBird.jpeg" width="485px" height="320px" />
        </div>
        <div>
          <img src="../static/rodentCage1.jpg" width="485px" height="320px" />
        </div> -->
      </VueSlickCarousel>
    </div>
    <div class="sub_slider">
      <VueSlickCarousel v-bind="settingsSubSlider" ref="c2" :asNavFor="$refs.c1">
        <div>
          <!-- <img src="../static/birdsShamp1.jpg" width="50px" height="50px" />
        </div>
        <div>
          <img src="../static/toyCats1.jpg" width="50px" height="50px" />
        </div>
        <div>
          <img src="../static/rioBird.jpeg" width="50px" height="50px" />
        </div>
        <div>
          <img src="../static/rodentCage1.jpg" width="50px" height="50px" />
        </div>
        <div>
          <img src="../static/rodentCage1.jpg" width="50px" height="50px" />
        </div>
        <div>
          <img src="../static/rodentCage1.jpg" width="50px" height="50px" />
        </div>
        <div>
          <img src="../static/rodentCage1.jpg" width="50px" height="50px" />
        </div>

        <div>
          <img src="../static/rodentCage1.jpg" width="50px" height="50px" /> -->
        </div>
      </VueSlickCarousel>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  name: "Slider",
  components: {
    VueSlickCarousel,
  },
  data() {
    return {
      settingsMainSlider: {
        arrows: false,
        edgeFriction: 0.35,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
      settingsSubSlider: {
        centerMode: true,
        centerPadding: "10px",
        slidesToShow: 6,
        focusOnSelect: true,
      },
    };
  },
};
</script>

<style>
.slider_block {
  height: 500px;
  padding-top: 50px;
  background: rgb(47, 149, 180);
}

.sub_slider {
  margin-top: 5px;
  width: 450px;
  margin-left: 100px;
  background: rgb(180, 138, 47);
}

.slider_block_carousel {
  width: 30%;
  height: 320px;
  margin-left: 100px;
  background: rgb(180, 138, 47);
}
.ttt {
  height: 350px;
}
.zzz {
  height: 120px;
}
</style>
        // ref="c2"
        // :asNavFor="$refs.c1"
        // :focusOnSelect="true"
        // slidesToShow: 2,
        // slidesToScroll: 1,
        // centerPadding='10px'
        // variableWidth:true,
        // dots: true,
        // autoplay: false,
        // centerMode: true
        // infinite: false