<template>
  <div class="flex w-full items-center justify-center">
    <div class="mt-76 mb-166 flex max-w-[375px] items-center justify-center md:mt-177 md:mb-230">
      <div class="flex flex-col text-center">
        <h1 class="text-124">{{ error.status }}</h1>
        <h1 class="mt-24 text-48">{{ error.title }}</h1>
        <div class="mt-16 text-14">{{ error.description }}</div>
        <div class="mt-27">
          <div
            :to="{ name: 'main' }"
            class="inline-block cursor-pointer text-14 underline transition hover:no-underline"
            @click="goBack"
          >
            Вернуться назад
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
@Component
export default class BaseNotFound extends Vue {
  error = {
    status: 404,
    title: "Страница не найдена",
    description: "Запрашиваемая вами страница не найдена, либо произошла ошибка.",
  };

  layout: "error";

  goBack() {
    this.$router.back();
  }
}
</script>
