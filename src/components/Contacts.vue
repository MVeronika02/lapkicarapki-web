<template>
<div class="contacts_content">
  <div class="contacts_content_name"><h3>Наши контакты</h3></div>
  <div class="contacts_block">
    <p>Спасибо, что вы с нами! Мы делаем все, чтобы вы оценили наш уровень сервиса и получали удовольствие от покупок. Мы развиваем сервисы и работаем с вашими пожеланиями, помогая найти то, что нужно именно вам.</p>
    <p>Есть вопросы? Предложения по нашей работе?</p>
    <p>Пишите нам на lapkicarapki.kz </p>
    <h3>Справочная служба</h3>
    <p>+7 (705) 525 61 98</p>
  </div>
</div>
</template>

<script>
export default {
  name: 'contacts',
  data() {
    return {}
  }
}
</script>

<style>
.contacts_content {
  background: rgb(230, 230, 250, 0.95);
  padding: 20px 0 50px 0;
}

.contacts_content_name {
  width: 80%;
  height: 60px;
  margin: 20px 0 20px 160px;
  background: rgb(141, 206, 157);
  padding-top: 20px;
  text-align: center;
}

.contacts_block {
  width: 80%;
  margin-left: 170px;
}
</style>
