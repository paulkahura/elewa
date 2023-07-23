<template>
    <div class="  px-2 py-16 sm:px-0 ">
        <TabGroup>
            <TabList class=" lg:w-1/2 flex space-x-1 rounded-xl bg-blue-900/20 p-1 m-auto">
                <Tab v-for="category in categories" as="template" :key="category" v-slot="{ selected }">
                    <button :class="[
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                        selected
                            ? 'bg-white shadow'
                            : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                    ]">
                        {{ category }}
                    </button>
                </Tab>
            </TabList>

            <TabPanels class="mt-2">
                <TabPanel :class="[
                    'rounded-xl bg-white p-3',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                ]">
                    <feedItem />
                </TabPanel>
                <TabPanel :class="[
                    'rounded-xl bg-white p-3',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                ]">
                        <followingTabFeed v-if="userStore.isAuthenticated"/>
                        <div class="text-red text-center" v-if="!userStore.isAuthenticated">Login to view this page</div>
                </TabPanel>
                <TabPanel :class="[
                    'rounded-xl bg-white p-3',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                ]">
                    <userList v-if="userStore.isAuthenticated"/>
                    <div class="text-red text-center" v-if="!userStore.isAuthenticated">Login to view this page</div>

                </TabPanel>
            </TabPanels>
        </TabGroup>
    </div>
</template>
  
<script setup>
import { ref, computed } from 'vue'
import { TabGroup, TabList, Tab, TabPanels, TabPanel, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { onMounted } from 'vue';
import { usePostStore } from '../stores/PostStore';
import { useCommentStore } from '../stores/CommentStore';
import userList from './UserList.vue';
import followingTabFeed from './FollowingTabFeed.vue';
import feedItem from './FeedItem.vue';
import { useUserStore } from '../stores/UserStore';

const postStore = usePostStore()
const commentStore = useCommentStore()
const userStore = useUserStore()
// const comments = ref([]);
onMounted(() => {
    postStore.fetchPosts();
    commentStore.fetchComments();
    userStore.fetchUsers();
})
console.log(postStore.posts)
const hasFollowers = () => {
    return userStore.following.length > 1;
}
const categories = ref([
    'Feed',
    'Following',
    'Friends'
])

</script>
  