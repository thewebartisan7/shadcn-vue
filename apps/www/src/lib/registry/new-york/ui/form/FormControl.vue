<script lang="ts" setup>
import { Slot } from 'radix-vue';
import { useFormField } from './useFormField';

const props = defineProps<{
  label?: string;
  description?: string;
}>();

const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
</script>

<template>
  <FormLabel v-if="props.label">{{ props.label }}</FormLabel>

  <Slot
    :id="formItemId"
    :aria-describedby="
      !error
        ? `${formDescriptionId}`
        : props.description
        ? `${formMessageId}`
        : `${formDescriptionId} ${formMessageId}`
    "
    :aria-invalid="!!error"
  >
    <slot />
  </Slot>

  <FormDescription v-if="props.description && !error">
    {{ props.description }}
  </FormDescription>

  <FormMessage v-if="props.description" />
</template>
