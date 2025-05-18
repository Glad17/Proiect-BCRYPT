<template>
  <button :class="['bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' + (props.isLoading ? ' opacity-50 cursor-not-allowed' : '')]" :disabled="props.isLoading" @click="props.function">
    <p v-if="props.isLoading">Loading...</p>
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
  const props = defineProps<{ 
    isLoading: boolean,
    function: () => Promise<void>
    }>();

</script>