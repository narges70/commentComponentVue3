<script setup>
import Avatar from "@/components/Avatar.vue";
</script>

<template>
  <div class="row">
    <div class="col-lg-1 col-md-2">
      <slot name="avatar">
        <Avatar src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"/>
      </slot>
    </div>
    <div class="col-lg-11 col-md-10">
      <slot name="input"></slot>
    </div>
  </div>
</template>
<style>
</style>