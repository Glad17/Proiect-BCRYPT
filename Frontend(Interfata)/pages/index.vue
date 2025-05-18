<template>
  <ClientOnly>
  <div class="text-xl text-blue-900">
    Salut {{me?.User.name}} 
  </div>
</ClientOnly>
</template>

<script setup lang="ts">
import type { userType } from '~/types/user.types';

  const me = useState<userType|null>('me');
</script>