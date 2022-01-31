<template>
  <nuxt-link
    v-if="!!item"
    :to="{ name: 'training-card', params: { slug: `${item.name}-${item.id}` } }"
    class="flex cursor-pointer flex-col"
  >
    <div class="relative">
      <img
        v-lazysrc="imageSrc"
        width="420"
        height="223"
        class="h-223 w-full object-cover transition-all hover:scale-105"
        alt=" "
      />
      <div class="bg-secondary text-14 absolute top-16 left-16 rounded-full px-16 py-8 text-white">{{ statusName }}</div>
    </div>
    <div class="mt-18 flex justify-between">
      <div class="text-14">{{ dateTypeAddress }}</div>
      <div class="flex-shrink-0 font-semibold">{{ priceFormatted }}</div>
    </div>
    <div class="mt-4 flex items-center justify-between">
      <div>
        <div class="text-18">{{ item.name }}</div>
        <div class="text-14 text-gray mt-8">Илларионов Вячеслав Олегович, д.м.н.</div>
      </div>
      <img
        v-if="!existsInCart"
        src="/images/header_shop.svg"
        width="26"
        height="26"
        class="cursor-pointer"
        alt=" "
        @click.prevent="addToCart()"
      />
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import dayjs from "dayjs";
import TrainingModel from "../models/TrainingModel";
import { UserCartService } from "@/modules/Profile/UserCartService";

@Component
export default class TrainingItem extends Vue {
  @Prop()
  item: TrainingModel;

  get imageSrc() {
    return `https://picsum.photos/seed/${Math.random()}/440/220`;
  }

  get priceFormatted() {
    return !!this.item.price ? this.item.price.toLocaleString("ru-RU") + " ₽" : "Бесплатно";
  }

  get statusName() {
    return this.item.status === "completed" ? "Завершено" : "Планируется";
  }

  get dateTypeAddress() {
    return `${dayjs(this.item.date?.split("T")[0]).format("DD MMMM YYYY")} | ${this.item.is_online ? "онлайн" : "оффлайн"} | ${
      this.item.location || "Россия"
    }`;
  }

  addToCart() {
    this.$serviceLocator.getService(UserCartService).addToCart(this.item);
  }

  get existsInCart() {
    return this.$serviceLocator.getService(UserCartService).exists(this.item);
  }
}
</script>
