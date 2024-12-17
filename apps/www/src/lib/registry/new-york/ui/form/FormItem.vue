<script lang="ts" setup>
import { cn } from "@/lib/utils";
import { useId } from "radix-vue";
import { type HTMLAttributes, provide } from "vue";
import { FORM_ITEM_INJECTION_KEY } from "./injectionKeys";
import { useFormField } from "./useFormField";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  label?: string;
  description?: string;
}>();

const { error } = useFormField();

const id = useId();
provide(FORM_ITEM_INJECTION_KEY, id);
</script>

<template>
  <div :class="cn('space-y-2', props.class)">
    <FormLabel v-if="props.label">{{ props.label }}</FormLabel>

    <slot />

    <FormDescription v-if="props.description && !error">
      {{ props.description }}
    </FormDescription>

    <FormMessage v-if="props.description" />
  </div>
</template>
