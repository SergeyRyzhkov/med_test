<template>
  <div v-if="!!model" class="flex flex-col">
    <div class="flex flex-row align-baseline">
      <img v-lazysrc="imageSrc" class="h-80 w-80 rounded-full object-cover object-center" width="80" height="80" />
      <div class="ml-18">
        <div class="text-18 font-semibold">Илларионов Вячеслав Олегович</div>
        <div class="text-14 text-gray mt-10">Доктор медицинских наук</div>
      </div>
    </div>
    <div class="mt-18 text-14">Пластический хирург, Клиника лазерных технологий "Эл.Эн." (Москва)</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import TrainingModel from "../models/TrainingModel";

@Component
export default class SpikerTraining extends Vue {
  @Prop()
  model: TrainingModel;

  get imageSrc() {
    return `https://picsum.photos/seed/${Math.random()}/200`;
  }
}
</script>

<style lang="scss"></style>
