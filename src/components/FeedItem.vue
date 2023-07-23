<template>
    <div>
        <div>
                        <div v-for="post in postStore.posts.slice(0, 20)" :key="post.id"
                            class="relative rounded-md p-3 hover:bg-gray-100">
                            <div class="flex mb-2">
                                <img :src="profileImage" alt="profile Image" width="30">

                                <div class="flex flex-col ml-2">
                                    <h3 class="text-sm font-medium leading-5">
                                        {{ getUserName(post.userId) }}
                                    </h3>
                                    <p class=" space-x-1 text-xs font-normal leading-4 text-gray-500">{{
                                        getUserEmail(post.userId) }}</p>
                                </div>
                            </div>
                            <h3 class="text-sm font-medium leading-5">
                                {{ post.title }}
                            </h3>
                            <p class="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">{{ post.body }}</p>

                            <ul class="mt-2 flex space-x-1 text-xs font-normal leading-4 text-gray-500 mb-3">
                                <li>{{ getNumberOfComments(post.id) }} comments</li>
                                <li>&middot;</li>
                                <li>2 likes</li>
                                <li>&middot;</li>

                            </ul>

                            <Disclosure v-slot="{ open }">
                                <DisclosureButton
                                    class="flex rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-lighter  hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>Load Comments</span>
                                    <ChevronUpIcon :class="!open ? 'rotate-180 transform' : ''" class="h-5 w-5  ml-4" />
                                </DisclosureButton>
                                <DisclosurePanel class=" px-4 pt-4 pb-2 text-sm text-gray-500">
                                    <ul>
                                        <li v-for="comment in getPostComments(post.id)" :key="comment.id" class="mb-4">
                                            <div class="flex mb-1 ">
                                                <div class="flex align-text-bottom">
                                                    <img :src="profileUser" alt="profile Image" width="20" height="20"
                                                        class="w-8 h-8">

                                                    <div class="flex flex-col ml-2">
                                                        <h3 class="text-sm font-medium leading-5 text-black">
                                                            {{ comment.email }}
                                                        </h3>
                                                        <div class="flex flex-col mt-1">
                                                            <h4 class="text-sm font-medium leading-5">
                                                                {{ comment.name }}
                                                            </h4>
                                                            <p
                                                                class=" space-x-1 text-xs font-normal leading-4 text-gray-500">
                                                                {{
                                                                    comment.body }}</p>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>

                                        </li>
                                    </ul>
                                </DisclosurePanel>
                            </Disclosure>


                        </div>
                    </div>
                    <div class="flex justify-center bg-red">

                        <button class="rounded-full mt-4 bg-blue-500 text-xs p-4 text-white ">Load More</button>
                    </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { usePostStore } from '../stores/PostStore';
import { useUserStore } from '../stores/UserStore';
import { useCommentStore } from '../stores/CommentStore';
import profileImage from '@/assets/avatar.png';
import profileUser from '@/assets/profile-user.png';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronUpIcon } from '@heroicons/vue/20/solid'

const commentStore = useCommentStore()
const postStore = usePostStore()
const userStore = useUserStore()
const getUserName = (userId) => {
    const user = userStore.users.find((user) => user.id === userId);
    return user ? user.name : 'Unknown';
};
const getUserEmail = (userId) => {
    const user = userStore.users.find((user) => user.id === userId);
    return user ? user.email : 'Unknown';
};
const getNumberOfComments = (postId) => {
    return computed(() => {
        return commentStore.comments.filter((comment) => comment.postId === postId).length;
    });
};
const getPostComments = (postId) => {
    console.log('hello')
    let comments = commentStore.comments.filter((comment) => comment.postId === postId)
    return comments;
};
const followedPosts = computed(() => {
  const followedUserIds = userStore.following;
  console.log(postStore.posts)
  return postStore.posts.filter(post => followedUserIds.includes(post.userId));
});
</script>

<style lang="scss" scoped>

</style>