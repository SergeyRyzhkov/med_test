<template>
  <div>
    <div class="text-14">{{ model.description }}</div>
    <div class="mb:mt-60 mt-40">
      <BaseAccordion v-for="(iter, idx) in model.days" :key="idx" :is-arrow="true">
        <template #header>
          <span>{{ idx + 1 + " день. " + iter.name }}</span>
        </template>
        <template #content><div class="text-14 pt-10" v-html="iter.content"></div></template>
      </BaseAccordion>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import TrainingModel from "../models/TrainingModel";

@Component
export default class ProgramaTraining extends Vue {
  @Prop()
  model: TrainingModel;
}
</script>
