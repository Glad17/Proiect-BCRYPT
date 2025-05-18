
<template>
  <div class="flex items-center space-x-2">
    <CheckIcon v-if="satisfied" class="h-4 w-4 text-green-500" />
    <XIcon v-else class="h-4 w-4 text-red-500"/>

    <span :class="['text-sm', satisfied ? 'text-green-500' : 'text-red-500']">
      {{ text }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  satisfied: boolean
  text: string
}>()
</script>