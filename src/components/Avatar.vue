<script setup>
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
function avatarText(name) {
  let text = '';
  let textArray = name.split(' ');
  textArray.forEach(value => {
    text += value.charAt(0);
  })
  return text;
}
</script>

<template>
  <div class="text-center">
    <img v-if="src" height="50" width="50" :src="src" class="rounded-circle" :alt="alt">
    <div v-else class="avatar-default rounded-circle">
      <b class="avatar-text">{{avatarText(alt)}}</b>
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