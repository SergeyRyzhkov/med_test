<template>
  <button
    class="base-button"
    :class="[classes, paddingEmpty ? 'base-button__empty-padding' : '']"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
@Component
export default class BaseButton extends Vue {
  @Prop()
  classes;

  @Prop({ default: false })
  paddingEmpty;
}
</script>

<style lang="scss" scoped>
.base-button {
  @apply py-14 px-40 md:px-68;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  border: 1px solid $primary;
  border-radius: 9999px;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: $secondary;
    border-color: $secondary;
    color: white;
  }
  &__empty-padding {
    padding: 0px;
  }
}
</style>
