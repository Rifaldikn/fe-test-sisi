<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

defineProps({
  title: {
    default: "",
  },
});
</script>

<template>
  <slot>
    <div class="text-h5 font-weight-bold">
      {{ title || route.meta.title }}
    </div>
  </slot>
</template>
