<script setup lang="ts">
import { Toggle } from '@/registry/new-york/ui/toggle'

import { UnderlineIcon } from '@radix-icons/vue'
</script>

<template>
  <Toggle aria-label="Toggle italic" disabled>
    <UnderlineIcon class="w-4 h-4" />
  </Toggle>
</template>
