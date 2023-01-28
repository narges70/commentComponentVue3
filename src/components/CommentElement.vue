<script setup>
import Avatar from "@/components/Avatar.vue";
import TimeUtils from "@/utils/TimeUtils";
defineProps({
  item: {
    type: Object,
    required: true
  },
  showReplyBtn: {
    type: Boolean,
    default: true,
    required: false
  },
})
defineEmits(['incrementLikes','showReply']);
</script>

<template>
  <div class="row">
    <div class="col-lg-1 col-md-2"
         :class="item.replies && item.replies.length > 0 ? 'outer-list':''">
      <slot name="avatar">
        <Avatar :src="item.user.avatar" :alt="item.user.name"></Avatar>
      </slot>
    </div>
    <div class="col-lg-11 col-md-10">
      <div>
        <slot name="userInfo">
          <div class="d-flex w-100">
            <h5 class="mb-1" v-if="item.user">{{item.user.name}}</h5>
            <small class="mx-2 text-grey">{{TimeUtils.timeSince(item.date) + ' ago' }}</small>
          </div>
        </slot>
          <slot name="text">
            <p class="mb-1">{{item.text}}</p>
          </slot>
        <slot name="actions">
          <div class="d-flex">
            <button type="button" class="btn btn-light rounded-pill" @click="$emit('incrementLikes', item)">
              <div class="d-flex">
                <span class="material-symbols-outlined" :style="item.iLikedIt ? {color: 'lightgrey'} : {color: 'blue'}">thumb_up</span>
                <b class="mx-1">{{item.likes}}</b>
              </div>
            </button>
            <b class="text-primary my-auto mx-2 reply" v-if="showReplyBtn" @click="$emit('showReply')">Reply</b>
          </div>
        </slot>
      </div>

      <!--replies-->
      <slot name="replies"></slot>
      <!--end of replies-->
      </div>
    </div>
</template>
<style>
.material-symbols-outlined {
  font-variation-settings:
      'FILL' 1,
      'wght' 400,
      'GRAD' 0,
      'opsz' 48
}
.text-grey {
  color: grey;
}
.outer-list:before {
  bottom: 0;
  content: "";
  height: 90%;
  position: absolute;
  top: 12%;
  width: 1px;
  background: rgba(0,0,0,.12);
  right: auto;
  left: 53%;
}
.reply {
  cursor: pointer;
}
</style>