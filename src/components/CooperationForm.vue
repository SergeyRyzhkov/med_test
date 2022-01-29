<template>
  <base-modal :back-enabled="false" class="flex flex-col p-20 pb-10 md:p-40 md:pb-20" @close="$emit('close')">
    <h1 class="font-compact">Заполните форму для сотрудничества <br />с KAYPRO и мы с Вами свяжемся!</h1>
    <p class="mt-16 text-14">
      Компания Аккорд - эксклюзивный представитель итальянской <br />
      профессиональной косметики для волос KAYPRO на территории РФ. <br />Для каждого из Вас у нас есть особые условия
      сотрудничества!
    </p>
    <FeedbackForm class="mt-20 md:mt-40" @close="$emit('close')"></FeedbackForm>
  </base-modal>
</template>
