<script setup lang="ts">
import { Button } from '@/registry/new-york/ui/button'
import Announcement from '../components/Announcement.vue'
import PageAction from '../components/PageAction.vue'

import PageHeader from '../components/PageHeader.vue'
import PageHeaderDescription from '../components/PageHeaderDescription.vue'

import PageHeaderHeading from '../components/PageHeaderHeading.vue'
import BlockContainer from './BlockContainer.vue'

const blocks = ['Sidebar01', 'Sidebar02', 'Sidebar03', 'Sidebar04', 'Sidebar05', 'Sidebar06', 'Sidebar07', 'Sidebar08', 'Sidebar09', 'Sidebar10', 'Sidebar11', 'Sidebar12', 'Sidebar13', 'Sidebar14', 'Sidebar15', 'Login01']
</script>

<template>
  <PageHeader class="page-header pb-8">
    <Announcement />
    <PageHeaderHeading>Building Blocks for the Web</PageHeaderHeading>
    <PageHeaderDescription>
      Beautifully designed. Copy and paste into your apps. Open Source.
    </PageHeaderDescription>

    <PageAction>
      <Button as-child size="sm">
        <a href="#blocks">Browse Blocks</a>
      </Button>
      <Button as-child variant="ghost" size="sm">
        <a
          href="https://github.com/shadcn-ui/ui/discussions/new?category=blocks-request"
          target="_blank"
        >
          Request a block
        </a>
      </Button>
    </PageAction>
  </PageHeader>

  <section id="blocks" class="grid scroll-mt-24 gap-24 lg:gap-48 container py-6">
    <BlockContainer v-for="block in blocks" :key="block" :name="block" />
  </section>
</template>
