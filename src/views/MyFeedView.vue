<template>
    <div class="bg-white py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-2xl sm:text-center">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">My Posts</h2>
                <p class="mt-6 text-lg leading-8 text-gray-600">View your own posts here.</p>
            </div>
            <div class="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                <div class="p-8 sm:p-10 lg:flex-auto">
                    <div v-for="post in filteredPosts" :key="post.id"
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
                                        <img :src="profileUser" alt="profile Image" width="20" height="20" class="w-8 h-8">

                                        <div class="flex flex-col ml-2">
                                            <h3 class="text-sm font-medium leading-5 text-black">
                                                {{ comment.email }}
                                            </h3>
                                            <div class="flex flex-col mt-1">
                                                <h4 class="text-sm font-medium leading-5">
                                                    {{ comment.name }}
                                                </h4>
                                                <p class=" space-x-1 text-xs font-normal leading-4 text-gray-500">
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

            </div>
        </div>
    </div>
</template>
  
<script setup>
import { CheckIcon, DevicePhoneMobileIcon, EnvelopeIcon, BuildingOffice2Icon, MapPinIcon, WifiIcon } from '@heroicons/vue/20/solid'
import { useUserStore } from '../stores/UserStore';
import { computed, onMounted } from 'vue';
import { usePostStore } from '../stores/PostStore';
import { useCommentStore } from '../stores/CommentStore';
import profileImage from '@/assets/avatar.png';
import profileUser from '@/assets/profile-user.png';
import { MagnifyingGlassCircleIcon } from '@heroicons/vue/20/solid'

import {
    Disclosure, DisclosureButton,
    DisclosurePanel,
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'
import { ChevronUpIcon } from '@heroicons/vue/20/solid'

onMounted(() => {
    postStore.fetchPosts();
})

const postStore = usePostStore()
const store = useUserStore()
const commentStore = useCommentStore()

console.log(store.user)
const filteredPosts = computed(() => {
    return postStore.posts.filter(post => post.userId === store.user.id);
});
const getUserName = (userId) => {
    const user = store.users.find((user) => user.id === userId);
    return user ? user.name : 'Unknown';
};
const getUserEmail = (userId) => {
    const user = store.users.find((user) => user.id === userId);
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
</script>