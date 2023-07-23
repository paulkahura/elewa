<template>
    <div>
        <h3 class="text-sm font-medium leading-5 text-center">
            Friends: {{ userStore.following.length }}
        </h3>
        <div v-for="user in userStore.users" :key="user.id"
            class="relative rounded-md p-3 hover:bg-gray-100 flex justify-between">
            <div class="flex mb-2">
                <img :src="profileImage" alt="profile Image" width="30" class="h-10 w-8">

                <div class="flex flex-col ml-2">
                    <h3 class="text-sm font-medium leading-5">
                        {{ user.name }}
                    </h3>
                    <p class=" space-x-1 text-xs font-normal leading-4 text-gray-500">{{
                        user.email }}</p>
                    <ul class="mt-2 flex space-x-1 text-xs font-normal leading-4 text-gray-500 mb-3">
                        <li v-if="isFollowing(user.id)">Following</li>
                        <li v-if="!isFollowing(user.id)">Not Following</li>
                        <li>&middot;</li>
                    </ul>
                </div>
            </div>
            <button @click="followUser(user.id)" v-if="!isFollowing(user.id)"
                class="text-white bg-blue-500 p-2 rounded-lg text-sm h-10">Follow</button>
            <button @click="unfollowUser(user.id)" v-else
                class="text-white bg-red-500 p-2 rounded-lg text-sm h-10">Unfollow</button>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '../stores/UserStore';
import profileImage from '@/assets/avatar.png';
const userStore = useUserStore()
const isFollowing = (userId) => {
    return userStore.following.includes(userId);
};

const followUser = (userId) => {
    if (!isFollowing(userId)) {
        userStore.following.push(userId);
    }
};

const unfollowUser = (userId) => {
    const index = userStore.following.indexOf(userId);
    if (index !== -1) {
        userStore.following.splice(index, 1);
    }
};
</script>

<style lang="scss" scoped></style>