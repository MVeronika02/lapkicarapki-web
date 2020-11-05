<template>
  <div class="footer_block">
    <div class="nav_footer">
      <p class="nav_footer_p">Каталог</p>
      <a class="nav_footer_a">Собаки</a>
      <a class="nav_footer_a">Кошки</a>
      <a class="nav_footer_a">Птицы</a>
      <a class="nav_footer_a">Рыбы</a>
      <a class="nav_footer_a">Насекомые</a>
      <a class="nav_footer_a">Грызуны</a>
    </div>

    <div class="footer_contacts">
      <p class="footer_contacts_p">Контакты</p>
      <a class="footer_contacts_a">Контакты</a>
      <a class="footer_contacts_a">Доставка и оплата</a>
      <a class="footer_contacts_a">Вопросы и ответы</a>
      <a class="footer_contacts_a">Магазины</a>
    </div>

    <div class="footer_logo">
      <div class="footer_logo_img">
        <img src="../assets/img/animalPaws.svg" height="90px"/>
      </div>
      <div class="social_network">
        <img src="../assets/img/vk.svg" class="footer_network_img" />
        <img src="../assets/img/instagram.svg" class="footer_network_img" />
        <img src="../assets/img/whatsapp.svg" class="footer_network_img" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {},
};
</script>

<style>
.footer_block {
  height: 100%;
  margin-top: -10px;
  padding-top: 20px;
  background: rgb(141, 206, 157);
  border-radius: 0px 0px 2px 2px;
  box-shadow: 0 0px, -1px 0px, 0px 1px, 1px 0px;
  display: flex;
  justify-content: space-around;
}

.nav_footer {
  width: 10%;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
}

.nav_footer_p {
  font-size: 1.05em;
  margin: 0 !important;
}

.nav_footer_a {
  color: black !important;
  font-size: 0.8em;
}

.nav_footer_a:hover {
  color: white !important;
}

.footer_contacts {
  width: 15%;
  display: flex;
  flex-direction: column;
}

.footer_contacts_p {
  font-size: 1.05em;
  margin: 0 !important;
}

.footer_contacts_a {
  color: black !important;
  font-size: 0.8em;
}

.footer_contacts_a:hover {
  color: white !important;
}

.footer_logo {
  width: 10%;
  height: 90%;
  margin: 0px 35px 0 0;
}

.footer_logo_img {
  height: 60%;
  margin: 0 0 10px 40px;
}

.social_network {
  display: flex;
  justify-content: space-between;
}

.footer_network_img {
  height: 30px;
}
</style>