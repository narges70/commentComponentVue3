<script setup>
import { computed } from 'vue'
defineProps({
  modelValue: {
    type: String,
    default: '',
    required: true
  },
  placeholder: {
    type: String,
    default: '',
    required: true
  }
})
defineEmits(['update:modelValue', 'addComment']);
const styleList = computed(() => {
  return {
    width: '100%',
    padding: '10px',
    border: '1px solid #d7d7d7',
    borderRadius: '2px'
  }
})
</script>

<template>
  <input
      :value="modelValue"
      :placeholder="placeholder"
      :style="styleList"
      @keyup.enter="$emit('addComment', modelValue)"
      @input="$emit('update:modelValue', $event.target.value)"
  />
</template>