<script setup>
import StringUtils from "@/utils/StringUtils";
defineProps({
  src: {
    type: String,
    default: '',
    required: false
  },
  alt: {
    type: String,
    default: 'avatar',
    required: false
  }
})

</script>

<template>
  <div class="text-center">
    <img v-if="src" height="50" width="50" :src="src" class="rounded-circle" :alt="alt">
    <div v-else class="avatar-default rounded-circle">
      <b class="avatar-text">{{ StringUtils.avatarText(alt) }}</b>
    </div>
  </div>
</template>
<style>
.avatar-default {
  height: 50px;
  width: 50px;
  background-color: lightblue;
  color: blue;
}
.avatar-text {
  top: 20%;
}
</style>