<template>
  <BaseModalFullScreen :back-enabled="false" :is-pinned-header="true" @close="$emit('close')">
    <template #header-center>
      <div class="mb-20 flex w-full items-center">
        <h2>Корзина</h2>
        <span class="text-gray text-14 ml-40 cursor-pointer" @click="clearCart()">Очистить</span>
      </div>
    </template>
    <template #right-side>
      <div class="h-[90%] overflow-y-auto">
        <div v-for="iter in trainingList" :key="iter.id" class="border-gray overflow-y-auto border-t py-20">
          <nuxt-link
            :to="{ name: 'training-card', params: { slug: `${iter.name}-${iter.id}` } }"
            class="flex cursor-pointer flex-col"
          >
            <div class="flex items-center justify-between">
              <div class="text-14">{{ getDateTypeAddress(iter) }}</div>
              <div class="ml-auto flex-shrink-0 font-semibold">{{ getPriceFormatted(iter) }}</div>
              <span
                class="text-28 text-gray ml-20 cursor-pointer font-normal after:content-['\00d7']"
                @click.prevent="deleteFromCart(iter)"
              ></span>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <div>
                <div class="text-18">{{ iter.name }}</div>
                <div class="text-14 text-gray mt-8">Илларионов Вячеслав Олегович, д.м.н.</div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>

      <div class="mt-20 flex flex-col md:items-center lg:flex-row lg:justify-between">
        <span class="text-24 mb-20 flex-shrink-0 font-semibold lg:mb-0">{{ allSum }}</span>
        <base-button>Перейти к оформлению</base-button>
      </div>
    </template>
  </BaseModalFullScreen>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import dayjs from "dayjs";
import { UserCartService } from "../UserCartService";
import TrainingModel from "@/modules/Training/models/TrainingModel";

@Component
export default class UserCartModal extends Vue {
  trainingList: TrainingModel[] = [];

  fetch() {
    this.updateTrainingList();
  }

  async updateTrainingList() {
    this.trainingList = await this.$serviceLocator.getService(UserCartService).getTrainingList();
  }

  get allSum() {
    return `Итого:   ${this.trainingList.reduce((sum, iter) => sum + +iter.price, 0)?.toLocaleString("ru-RU")} ₽`;
  }

  getPriceFormatted(model: TrainingModel) {
    return !!model.price ? model.price.toLocaleString("ru-RU") + " ₽" : "Бесплатно";
  }

  getDateTypeAddress(model: TrainingModel) {
    return `${dayjs(model.date?.split("T")[0]).format("DD MMMM YYYY")} | ${model.is_online ? "онлайн" : "оффлайн"} | ${
      model.location || "Россия"
    }`;
  }

  clearCart() {
    this.$serviceLocator.getService(UserCartService).clearCart();
    this.updateTrainingList();
  }

  deleteFromCart(model: TrainingModel) {
    this.$serviceLocator.getService(UserCartService).deleteFromCart(model);
    this.updateTrainingList();
  }
}
</script>
