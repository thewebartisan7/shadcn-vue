<script setup lang="ts">
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/registry/new-york/ui/button'
import GitHubIcon from '~icons/radix-icons/github-logo'
import { Index } from '../../../__registry__'
import Announcement from '../components/Announcement.vue'
import PageAction from '../components/PageAction.vue'

import PageHeader from '../components/PageHeader.vue'
import PageHeaderDescription from '../components/PageHeaderDescription.vue'

import PageHeaderHeading from '../components/PageHeaderHeading.vue'
import BlockContainer from './BlockContainer.vue'

// const blocks = ['Sidebar01', 'Sidebar02', 'Sidebar03', 'Sidebar04', 'Sidebar05', 'Sidebar06', 'Sidebar07', 'Sidebar08', 'Sidebar09', 'Sidebar10', 'Sidebar11', 'Sidebar12', 'Sidebar13', 'Sidebar14', 'Sidebar15', 'Login01']
const blocks = Object.values(Index['new-york']).filter((i: any) => i.type === 'registry:block').map((i: any) => i.name)
</script>

<template>
  <PageHeader class="page-header pb-8">
    <Announcement />
    <PageHeaderHeading>Building Blocks for the Web</PageHeaderHeading>
    <PageHeaderDescription>
      Beautifully designed. Copy and paste into your apps. Open Source.
    </PageHeaderDescription>

    <PageAction>
      <a
        href="/blocks.html#blocks"
        :class="cn(buttonVariants(), 'rounded-[6px]')"
      >
        Browse
      </a>
      <a
        href="https://github.com/unovue/shadcn-vue"
        target="_blank"
        :class="cn(
          buttonVariants({ variant: 'outline' }),
          'rounded-[6px]',
        )"
      >
        <GitHubIcon class="mr-2 h-4 w-4" />
        GitHub
      </a>
    </PageAction>
  </PageHeader>

  <section id="blocks" class="grid scroll-mt-24 gap-24 lg:gap-48 container py-6">
    <BlockContainer v-for="block in blocks" :key="block" :name="block" />
  </section>
</template>
