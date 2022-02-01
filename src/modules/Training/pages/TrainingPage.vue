<template>
  <main class="page-wrapper">
    <div v-show="$fetchState.pending" class="container">
      <SkeletonTrainingPage></SkeletonTrainingPage>
    </div>

    <div class="container">
      <BreadCrumbs />
    </div>
    <section class="container-fluid relative min-h-[max-content] overflow-hidden">
      <img
        v-show="!!bannerSrc"
        :src="bannerSrc"
        class="absolute top-0 left-0 h-full w-full object-cover"
        height="600"
        width="1440"
      />
      <div class="relative w-full">
        <div class="container z-50 mb-20 flex flex-col lg:mb-40">
          <div class="border-secondary text-14 text-secondary w-max rounded-full border bg-white px-16 py-8">
            {{ statusName }}
          </div>
          <div class="mb:mt-40 mt-20 font-normal">{{ dateType }}</div>
          <h1 class="font-compact text-62 mt-24 uppercase lg:mt-32">{{ model.name }}</h1>
          <div class="text-14 text-gray mt-4">{{ categoryName }}</div>
          <div class="flex flex-col lg:flex-row">
            <base-button class="mt-18 bg-white lg:mt-40" @click="onSubscribeClicked">Записаться на курс</base-button>
            <base-button v-if="!existsInCart" class="mt-18 bg-white lg:ml-16 lg:mt-40" @click="addToCart()"
              >В корзину</base-button
            >
          </div>
        </div>
      </div>
    </section>

    <section class="container-fluid bg-section-gray">
      <div class="training-section-wrapper">
        <h2 class="training-section__caption">ПРОГРАММА</h2>
        <div class="training-section__content"><ProgramaTraining :model="model"></ProgramaTraining></div>
      </div>
    </section>
    <section class="container-fluid">
      <div class="training-section-wrapper">
        <h2 class="training-section__caption container-fluid">ПРЕПОДАВАТЕЛЬ</h2>
        <div class="training-section__content"><SpikerTraining :model="model"></SpikerTraining></div>
      </div>
    </section>
    <section class="container-fluid bg-nude">
      <div class="training-section-wrapper">
        <h2 class="training-section__caption">СТОИМОСТЬ КУРСА</h2>
        <div class="training-section__content text-48 font-semibold">
          <div>{{ priceFormatted }}</div>
          <div class="text-14 mt-16 font-semibold">{{ model.price_description }}</div>
        </div>
      </div>
    </section>
    <section class="container-fluid">
      <div class="training-section-wrapper">
        <h2 class="training-section__caption"></h2>
        <div id="enroll_training" ref="enroll_training" class="training-section__content">
          <div class="text-24 font-semibold">
            Записаться на курс или <br />
            получить бесплатную консультацию
          </div>
          <FeedbackForm class="mt-40 lg:mt-60"></FeedbackForm>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { Component, getModule, Prop, Vue } from "nuxt-property-decorator";
import dayjs from "dayjs";
import TrainingModel, { TrainingCategory } from "../models/TrainingModel";
import { TrainingService } from "../TrainingService";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";
import AppStore from "@/modules/Root/store/AppStore";
import Cacheable from "@/_core/MethodCacheDecorator";
import { UserCartService } from "@/modules/Profile/UserCartService";

@Component
export default class TrainingPage extends Vue {
  @Prop()
  slug: string;

  model: TrainingModel = new TrainingModel();

  async fetch() {
    this.model = await this.getModelById(this.slug);
    this.updateBreadCrumbs();
  }

  @Cacheable(0)
  async getModelById(slug: string) {
    return await this.$serviceLocator.getService(TrainingService).getBySlug(slug);
  }

  get bannerSrc() {
    return undefined;
  }

  get priceFormatted() {
    return !!this.model.price ? this.model.price.toLocaleString("ru-RU") + " ₽" : "Бесплатно";
  }

  get dateType() {
    return `${dayjs(this.model.date?.split("T")[0]).format("DD MMMM YYYY")} | ${this.model.is_online ? "онлайн" : "оффлайн"}`;
  }

  get statusName() {
    return this.model.status === "completed" ? "Завершено" : "Планируется";
  }

  get categoryName() {
    return TrainingCategory[this.model.category_id]?.name || "Общее";
  }

  addToCart() {
    this.$serviceLocator.getService(UserCartService).addToCart(this.model);
  }

  get existsInCart() {
    return this.$serviceLocator.getService(UserCartService).exists(this.model);
  }

  head() {
    if (!!this.model.meta_slug) {
      this.model.meta_image = undefined;
      return this.$serviceLocator.getService(SeoMetaTagsBuilder).create(this.model, this.$route.fullPath);
    }
  }

  updateBreadCrumbs() {
    const breadCrumbList = [
      { linkName: "Главная", name: "main" },
      { linkName: "Программы обучения", name: "training" },
      { linkName: this.model?.name?.substring(0, 120) + "..." },
    ];
    getModule(AppStore, this.$store).updateBreadCrumbList(breadCrumbList);
  }

  onSubscribeClicked() {
    (this.$refs.enroll_training as any).scrollIntoView({ behavior: "smooth" });
  }
}
</script>

<style lang="scss">
.training-section-wrapper {
  @apply container flex flex-col pt-20 pb-40 lg:flex-row lg:pb-60 lg:pt-40;

  .training-section__caption {
    @apply w-full font-semibold lg:w-3/12;
  }

  .training-section__content {
    @apply ml-0 mt-20 w-full lg:ml-20 lg:mt-0 lg:w-6/12;
  }
}
</style>
