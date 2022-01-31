<template>
  <transition-group name="skeleton" mode="out-in">
    <div :key="1" class="skeleton skeleton--wave h-223" />
    <div :key="2" class="mt-16 flex items-center justify-between">
      <div class="skeleton skeleton--wave w-220 h-14"></div>
      <div class="skeleton skeleton--wave h-16 w-80"></div>
    </div>
    <div :key="3" class="skeleton skeleton--wave h-22 mt-12"></div>
    <div :key="4" class="skeleton skeleton--wave w-100 mt-12 h-14"></div>
  </transition-group>
</template>
