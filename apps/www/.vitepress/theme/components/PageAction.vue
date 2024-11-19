<script setup lang="ts">
import { cn } from '@/lib/utils'
</script>

<template>
  <section
    :class="cn(
      'flex w-full items-center justify-start gap-2 py-2',
      $attrs.class ?? '',
    )"
  >
    <slot />
  </section>
</template>
