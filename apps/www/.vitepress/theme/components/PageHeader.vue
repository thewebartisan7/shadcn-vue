<script setup lang="ts">
import { cn } from '@/lib/utils'

// import WrapBalancer from 'vue-wrap-balancer'
</script>

<template>
  <section
    :class="cn(
      'flex flex-col items-start gap-2 border-b border-border/40 py-8 dark:border-border md:py-10 lg:py-12',
      $attrs.class ?? '',
    )"
  >
    <div class="container">
      <slot />
    </div>
  </section>
</template>
