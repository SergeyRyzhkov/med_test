<template>
  <main class="page-wrapper container">
    <BreadCrumbs />

    <div class="flex flex-col md:flex-row md:items-center md:justify-between">
      <h1>Программы непрерывного медицинского образования</h1>
      <base-calendar
        v-model="daysRange"
        class="mt-16 md:mt-0"
        :config="{
          isMultiple: true,
          calendarsCount: 1,
          isDateRange: true,
          isDatePicker: false,
          placeholder: 'Выберите дату',
        }"
        @clear="clearDate"
      ></base-calendar>
    </div>

    <div v-show="$fetchState.pending" class="mt-30 gap-y-30 gap-x-30 grid grid-cols-1 md:mt-40 md:grid-cols-2 lg:grid-cols-3">
      <template v-for="index in 6">
        <SkeletonTrainingItem :key="index"> </SkeletonTrainingItem>
      </template>
    </div>
    <div class="mt-30 gap-y-30 gap-x-30 grid grid-cols-1 md:mt-40 md:grid-cols-2 lg:grid-cols-3">
      <TrainingItem v-for="iter in trainingList" :key="iter.id" :item="iter"> </TrainingItem>
    </div>
    <BasePagination :pagination="pagination" class="mt-30 md:mt-60" @update:page="onUpdatePagination"></BasePagination>
  </main>
</template>

<script lang="ts">
import { Component, getModule, Vue, Watch } from "nuxt-property-decorator";
import TrainingModel from "../models/TrainingModel";
import { TrainingService } from "../TrainingService";
import { Pagination } from "@/_core/models/Pagination";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";
import AppStore from "@/modules/Root/store/AppStore";
import { DaysRangeModel } from "@/components/forms/BaseCalendar.vue";

@Component
export default class TrainingListPage extends Vue {
  trainingList: TrainingModel[] = [];
  pagination: Pagination = new Pagination();

  daysRange: DaysRangeModel = new DaysRangeModel();

  async fetch() {
    this.updateBreadCrumbs();
    this.pagination.total = 100;
    await this.updateData();
  }

  @Watch("daysRange", { deep: true })
  onDaysRangeChanged() {
    if (!!this.daysRange.dateRange.end) {
      this.updateData();
    }
  }

  async updateData() {
    const result = await this.$serviceLocator
      .getService(TrainingService)
      .getAll(this.pagination, this.daysRange.dateRange.start, this.daysRange.dateRange.end);
    this.trainingList = result.data;
    this.pagination = result.pagination;
  }

  clearDate() {
    this.daysRange = new DaysRangeModel();
    this.pagination.currentPage = 1;
    this.updateData();
  }

  updateBreadCrumbs() {
    const breadCrumbList = [{ linkName: "Главная", name: "main" }, { linkName: "Обучение" }];
    getModule(AppStore, this.$store).updateBreadCrumbList(breadCrumbList);
  }

  onUpdatePagination(pageNmb: number) {
    this.pagination.currentPage = pageNmb;
    this.updateData();
  }

  head() {
    return this.$serviceLocator.getService(SeoMetaTagsBuilder).create(undefined, this.$route.fullPath);
  }
}
</script>

<style lang="scss">
.arenda-banner {
  background: linear-gradient(268.69deg, #baccff -0.81%, #f2e1dc 60.12%), #eaeaea;
}
</style>
