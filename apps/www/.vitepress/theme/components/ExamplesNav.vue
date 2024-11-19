<script setup lang="ts">
import { ScrollArea, ScrollBar } from '@/lib/registry/default/ui/scroll-area'
import { cn } from '@/lib/utils'
import { useRoute } from 'vitepress'
import { computed, toRefs } from 'vue'

const { path } = toRefs(useRoute())

const examples = [
  {
    name: 'Mail',
    href: '/examples/mail',
    code: 'https://github.com/unovue/shadcn-vue/tree/dev/apps/www/src/examples/mail',
  },
  {
    name: 'Dashboard',
    href: '/examples/dashboard',
    code: 'https://github.com/unovue/shadcn-vue/tree/dev/apps/www/src/examples/dashboard',
  },
  {
    name: 'Cards',
    href: '/examples/cards',
    code: 'https://github.com/unovue/shadcn-vue/tree/dev/apps/www/src/examples/cards',
  },
  {
    name: 'Tasks',
    href: '/examples/tasks',
    code: 'https://github.com/unovue/shadcn-vue/tree/dev/apps/www/src/examples/tasks',
  },
  {
    name: 'Playground',
    href: '/examples/playground',
    code: 'https://github.com/unovue/shadcn-vue/tree/dev/apps/www/src/examples/playground',
  },
  {
    name: 'Forms',
    href: '/examples/forms',
    code: 'https://github.com/unovue/shadcn-vue/tree/dev/apps/www/src/examples/forms',
  },
  {
    name: 'Music',
    href: '/examples/music',
    code: 'https://github.com/unovue/shadcn-vue/tree/dev/apps/www/src/examples/music',
  },
  {
    name: 'Authentication',
    href: '/examples/authentication',
    code: 'https://github.com/unovue/shadcn-vue/tree/dev/apps/www/src/examples/authentication',
  },
]

const currentExample = computed(() => examples.find(ex => path.value.startsWith(ex.href)) ?? examples[0])
</script>

<template>
  <div class="relative">
    <ScrollArea class="max-w-[600px] lg:max-w-none">
      <div :class="cn('mb-4 flex items-center', $attrs.class ?? '')">
        <a
          v-for="example in examples"
          :key="example.href"
          :href="example.href"
          :class="cn(
            'flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary',
            path?.startsWith(example.href)
              ? 'bg-muted font-medium text-primary'
              : 'text-muted-foreground',
          )"
        >
          {{ example.name }}
        </a>
      </div>
      <ScrollBar orientation="horizontal" class="invisible" />
    </ScrollArea>
  </div>
</template>
