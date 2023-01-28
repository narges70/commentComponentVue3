<script setup lang="ts">
import CommentInput from "@/components/CommentInput.vue";
import CommentElement from "@/components/CommentElement.vue";
import CommentElementInput from "@/components/CommentElementInput.vue";
import {ref} from "vue";
import type {IDiscussion, IProps} from "@/utils/Model";
import {textType} from "@/utils/Model";
defineProps({
  discussions: {
    type: Array<IDiscussion>,
    required: true
  }
})
const replyText = ref<string>('');
const commentText = ref<string>('');

function incrementLikes(item:IDiscussion):void {
  item.likes ++;
}
function addComment(text: string, type: textType, discussion: IDiscussion|undefined, discussions:IDiscussion[]) {
  if (type === textType.COMMENT) {
    discussions.push({
        id: Math.floor((Math.random() * 100) + 1),
      date: new Date().getTime(),
      user: {
        name: "New"
      },
      text: text,
      likes: 0,
      iLikedIt: false,
      replies: [],
      showReplySection: false
    })
    commentText.value = ''
  }
  else {
    discussion.replies.push({
        id: Math.floor((Math.random() * 100) + 1),
      date: new Date().getTime(),
      user: {
        name: "New"
      },
      text: text,
      likes: 0,
      iLikedIt: false,
      showReplySection: false
    })
    discussion.showReplySection = false
    replyText.value = ''
  }
}
const discussionSelected = ref<IDiscussion>()
function showReply(discussion:IDiscussion):void {
  discussionSelected.value = discussion
  discussion.showReplySection = true
}
</script>
<template>
  <div class="discussion">
    <div class="list-group">

      <!--send comment section-->
      <a class="list-group-item list-group-item-action">
        <CommentElementInput>
          <template #input>
            <CommentInput :modelValue="commentText"
                          class="mt-2"
                          placeholder="Start a discussion"
                          @addComment="addComment($event, textType.COMMENT,discussionSelected, discussions)"
                          @update:modelValue="newValue => commentText = newValue"/>
          </template>
        </CommentElementInput>
      </a>


      <!--end of send comment section-->
      <a class="list-group-item list-group-item-action" v-for="(discussion,index) in discussions" :key="index">

        <CommentElement :item="discussion" @incrementLikes="incrementLikes($event)" @showReply="showReply(discussion)">
          <template #replies>
            <a class="list-group-item inner-list-item list-group-item-action" v-for="(reply,index2) in discussion.replies" :key="index">
              <CommentElement :showReplyBtn="false" :item="reply" @incrementLikes="incrementLikes($event)"></CommentElement>
            </a>
          </template>
        </CommentElement>

        <!--start add reply-->
        <a class="list-group-item inner-list-item list-group-item-action" v-if="discussion.showReplySection">
          <CommentElementInput>
            <template #input>
              <CommentInput :modelValue="replyText"
                            class="mt-2"
                            placeholder="Reply"
                            @addComment="addComment($event, textType.REPLY, discussionSelected, discussions)"
                            @update:modelValue="newValue => replyText = newValue"/>
            </template>
          </CommentElementInput>
        </a>
        <!--end add reply-->

      </a>
    </div>
  </div>
</template>

<style scoped type="text/css">
.discussion {
  height: 100vh;
  width: 800px;
}

.inner-list-item {
  border: none;
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
.list-group-item {
  padding: 18px;
  cursor: default;
}
</style>