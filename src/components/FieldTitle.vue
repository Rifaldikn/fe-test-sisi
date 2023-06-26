<script setup>
defineProps({
  mandatory: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div>
    <span> <slot> </slot></span>
    <span v-if="mandatory" class="text-error"> *</span>
  </div>
</template>
