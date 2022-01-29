<template>
  <div class="base-accordion">
    <div class="flex cursor-pointer items-center justify-between text-18 font-semibold" @click="toogle()">
      <slot name="header"></slot>
      <span v-show="!isContentActive" class="text-34 font-normal">+</span>
      <span v-show="isContentActive" class="text-34 font-normal">-</span>
    </div>
    <div class="base-accordion__content" :class="[isContentActive ? 'active' : '']">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class BaseAccordion extends Vue {
  isContentActive = false;

  toogle() {
    this.isContentActive = !this.isContentActive;
  }
}
</script>

<style lang="scss">
.base-accordion {
  border-bottom: 1px solid #c9c9c9;
  padding: 12px 0 12px 0;
  > span {
    transition: 0.2s;
    line-height: 0px;
    outline: none;
  }
  &__content {
    transition: 0.2s;
    max-height: 0px;
    overflow-y: hidden;
    padding: 0px;
    &.active {
      max-height: 300px;
      padding-bottom: 8px;
    }
  }
}
</style>
