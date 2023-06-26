<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

import AdminLayout from "./layouts/admin/AdminLayout";
import DefaultLayout from "./layouts/default/Default";

const route = useRoute();

const component = computed(() => {
  return route?.meta?.needAuth ? AdminLayout : DefaultLayout;
});
</script>

<template>
  <component :is="component">
    <router-view />
  </component>
</template>
