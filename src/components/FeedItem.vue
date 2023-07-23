<template>
    <div>
        <div>
            <div>
                <div class="relative mb-2 rounded-md shadow-sm">

                    <input type="text" name="price" id="price" v-model="searchQuery"
                        class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="enter text to search" />
                    <div class="absolute inset-y-0 right-0 flex items-center">
                        <MagnifyingGlassCircleIcon class="h-10 w-8 flex-none mr-2" aria-hidden="true" />
                    </div>
                </div>
            </div>
            <div v-for="post in filteredPosts" :key="post.id" class="relative rounded-md p-3 hover:bg-gray-100">
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
        <div class="flex justify-center bg-red">

            <button @click="openModal" class="rounded-full mt-4 bg-blue-500 text-xs p-4 text-white ">Load More</button>
        </div>
        <TransitionRoot appear :show="isOpen" as="template">
            <Dialog as="div" @close="closeModal" class="relative z-10">
                <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                    leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-black bg-opacity-25" />
                </TransitionChild>

                <div class="fixed inset-0 overflow-y-auto">
                    <div class="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                            leave-to="opacity-0 scale-95">
                            <DialogPanel
                                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                                    Payment Required
                                </DialogTitle>
                                <div class="mt-2">
                                    <p class="text-sm text-gray-500">
                                        You need to confirm a one time payment of kes50 before you proceed
                                        Enter your phonenumber for Mpesa STK Push
                                    </p>

                                </div>
                                <form @submit.prevent="processPayment()">
                                    <div>
                                        <label for="price"
                                            class="block text-sm font-medium leading-6 text-gray-900">Price</label>
                                        <div class="relative mt-2 rounded-md shadow-sm">

                                            <input type="text" v-model="phonenumber"
                                                class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="+254..." />

                                        </div>
                                    </div>

                                    <div class="mt-4">
                                        <button type="submit"
                                            class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                                            Process Payment!
                                        </button>
                                    </div>
                                </form>

                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>

    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { usePostStore } from '../stores/PostStore';
import { useUserStore } from '../stores/UserStore';
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

const commentStore = useCommentStore()
const postStore = usePostStore()
const userStore = useUserStore()
const phonenumber = ref('')
let count = 20
const searchQuery = ref('');
onMounted(() => {
    postStore.fetchPosts();
})

const processPayment = () => {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer 32dbz2Kec3MMsa2sQAkKr494oBF7");
    fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            "BusinessShortCode": 174379,
            "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjMwNzI0MDEwMjI1",
            "Timestamp": "20230724010225",
            "TransactionType": "CustomerPayBillOnline",
            "Amount": 1,
            "PartyA": phonenumber,
            "PartyB": 174379,
            "PhoneNumber": 254708374149,
            "CallBackURL": "https://mydomain.com/path",
            "AccountReference": "CompanyXLTD",
            "TransactionDesc": "Payment of X"
        })
    })
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log(error));
    isOpen.value = false
    count = 100
};

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

const filteredPosts = computed(() => {
    if (!searchQuery.value) {
        return postStore.posts.slice(0, count);
    }

    const normalizedSearchQuery = searchQuery.value.toLowerCase().trim();
    return postStore.posts.filter(post => post.title.toLowerCase().includes(normalizedSearchQuery)).slice(0, count);
});
const isOpen = ref(false)

function closeModal() {
    isOpen.value = false
}
function openModal() {
    isOpen.value = true
}
</script>

<style lang="scss" scoped></style>