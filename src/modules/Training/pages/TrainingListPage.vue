<template>
  <main class="page-wrapper container mb-40">
    <BreadCrumbs />

    <div class="mt-20 flex flex-col items-start lg:flex-row">
      <h1 class="w-full lg:w-1/3">Программы непрерывного медицинского образования</h1>
      <div class="ml-auto mt-16 flex w-full flex-col items-center lg:mt-0 lg:w-2/3 lg:flex-row">
        <div class="lg:w-1\2 mt-16 w-full lg:mt-0">
          <base-input v-model="searchPattern" type="search" placeholder="Найти ..." @input="onSearch"></base-input>
        </div>

        <BaseMultiSelect
          v-model="selectedCategory"
          placeholder="Категория"
          :options="TrainingCategory"
          class="mt-18 lg:w-1\2 mb-16 w-full lg:ml-32 lg:mt-0 lg:mb-0"
          @input="onCategoryChanged"
        >
        </BaseMultiSelect>
      </div>
      <!-- <base-calendar
        v-model="daysRange"
        class="mt-16 ml-0 lg:ml-40 lg:mt-0"
        :config="{
          isMultiple: true,
          calendarsCount: 1,
          isDateRange: true,
          isDatePicker: false,
          placeholder: 'Выберите дату',
        }"
        @clear="clearDate"
      ></base-calendar> -->
    </div>

    <div v-show="$fetchState.pending" class="mt-30 gap-y-30 gap-x-30 grid grid-cols-1 md:grid-cols-2 lg:mt-40 lg:grid-cols-3">
      <template v-for="index in 6">
        <SkeletonTrainingItem :key="index"> </SkeletonTrainingItem>
      </template>
    </div>
    <div class="gap-y-30 gap-x-30 mt-40 grid grid-cols-1 md:grid-cols-2 lg:mt-60 lg:grid-cols-3">
      <TrainingItem v-for="iter in trainingList" :key="iter.id" :item="iter"> </TrainingItem>
    </div>
    <BasePagination :pagination="pagination" class="mt-30 lg:mt-60" @update:page="onUpdatePagination"></BasePagination>
  </main>
</template>

<script lang="ts">
import { Component, getModule, Vue, Watch } from "nuxt-property-decorator";
import TrainingModel, { TrainingCategory } from "../models/TrainingModel";
import { TrainingService } from "../TrainingService";
import { Pagination } from "@/_core/models/Pagination";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";
import AppStore from "@/modules/Root/store/AppStore";
import { DaysRangeModel } from "@/components/forms/BaseCalendar.vue";

@Component
export default class TrainingListPage extends Vue {
  searchPattern: string = "";
  selectedCategory: { id: number; name: string } | null = null;
  trainingList: TrainingModel[] = [];
  pagination: Pagination = new Pagination();
  daysRange: DaysRangeModel = new DaysRangeModel();

  TrainingCategory = TrainingCategory;

  async fetch() {
    this.updateBreadCrumbs();
    this.pagination.total = 100;
    await this.updateData();
  }

  @Watch("daysRange", { deep: true })
  onDaysRangeChanged() {
    if (!!this.daysRange.dateRange.end) {
      this.$modalManager.showNotify("По данному заданию - не реализвано !!!");
      // this.updateData();
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

  async onSearch(searchPattern: string) {
    this.$fetchState.pending = true;
    this.trainingList = await this.$serviceLocator.getService(TrainingService).findByNamOrDescription(searchPattern);
    this.afterFilter();
  }

  async onCategoryChanged(category: { id: number; name: string }) {
    this.$fetchState.pending = true;
    this.trainingList = await this.$serviceLocator.getService(TrainingService).filterByCategory(category);
    this.afterFilter();
  }

  updateBreadCrumbs() {
    const breadCrumbList = [{ linkName: "Главная", name: "main" }, { linkName: "Программы обучения" }];
    getModule(AppStore, this.$store).updateBreadCrumbList(breadCrumbList);
  }

  onUpdatePagination(pageNmb: number) {
    this.pagination.currentPage = pageNmb;
    this.updateData();
  }

  head() {
    return this.$serviceLocator.getService(SeoMetaTagsBuilder).create(undefined, this.$route.fullPath);
  }

  private afterFilter() {
    this.pagination.perPage = 9;
    this.pagination.currentPage = 1;
    this.pagination.total = this.trainingList.length;
    this.$fetchState.pending = false;
  }
}
</script>

<style lang="scss">
.arenda-banner {
  background: linear-gradient(268.69deg, #baccff -0.81%, #f2e1dc 60.12%), #eaeaea;
}
</style>
