<template>
  <button v-on="$listeners">
    <svg :width="width" :height="height" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.5293 4.11731L5.52234 8.12427L1.51538 4.11731" :stroke="stroke" stroke-width="1.5" stroke-linecap="round"></path>
    </svg>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class BaseOpenCloseButton extends Vue {
  @Prop({ default: 26 })
  width;

  @Prop({ default: 26 })
  height;

  @Prop({ default: "#16192C" })
  stroke;
}
</script>
