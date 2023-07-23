<template>
    <div class="mx-auto flex justify-center flex-col max-w-6xl  rounded-xl mt-4 bg-white shadow-lg ring-1 ring-gray-900/5 pt-8">
        <div class="mx-auto max-w-2xl sm:text-center">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Welcome to elewa chat</h2>
            <p class="mt-6 text-lg leading-8 text-gray-600">Create posts and interact with your friends.</p>
        </div>
        <!-- <div v-for="post in postStore.posts.splice(0, 10)" :key="post.id" class="">
            <FeedOption :post="post" />
        </div> -->
        <FeedTabs />
    </div>
</template>
  
<script setup>

import FeedOption from './FeedOption.vue'
import FeedTabs from './FeedTabs.vue'

</script>