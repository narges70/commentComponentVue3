<script setup lang="ts">
import CommentInput from "@/components/CommentInput.vue";
import CommentElement from "@/components/CommentElement.vue";
import CommentElementInput from "@/components/CommentElementInput.vue";
import {ref} from "vue";

interface IUser {
  name: string;
  avatar?: string;
}
interface IComment {
  id: number;
  date: number; // unix timestamp in milliseconds.
  user: IUser;
  text: string;
  likes: number;
  iLikedIt: boolean;
}
interface IDiscussion extends IComment {
  replies: IComment[];
}

defineProps({
  discussions: {
    type: Array,
    required: true
  }
})
const replyText:string = ref('');
const commentText:string = ref('');

function incrementLikes(item:object):viod {
  item.likes ++;
}
function addComment(text: string, type: 'comment'|'reply', discussion: object, discussions:Array) {
  if (type === 'comment') {
    discussions.push({
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
const discussionSelected:IDiscussion = ref({})
function showReply(discussion:object):void {
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
                          @addComment="addComment($event, 'comment',{}, discussions)"
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
                            @addComment="addComment($event, 'reply', discussionSelected)"
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