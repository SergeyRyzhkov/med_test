<template>
  <section>
    <header class="relative z-50">
      <div class="container-fluid bg-primary relative">
        <nav class="flex flex-col">
          <ul class="header-menu-list text-14 font-semibold text-white">
            <li><nuxt-link :to="{ name: 'training' }">Обучение парикмахеров</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'cooperation' }">Сотрудничество</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'news' }">Новости</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'contacts' }">Контакты</nuxt-link></li>
          </ul>
        </nav>
      </div>
    </header>
  </section>
</template>

<style lang="scss">
.header-menu-list {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  line-height: 17px;
  text-transform: uppercase;
  margin: auto;
  > li {
    > a {
      padding: 16px;
    }

    display: inline-block;
    white-space: nowrap;
    cursor: pointer;
  }
  > li + li {
    margin-left: 42px;
  }
}
</style>
