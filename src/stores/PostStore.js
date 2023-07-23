import { defineStore } from "pinia";

export const usePostStore = defineStore('postStore', {
    state: () => ({
        posts: [],
    }),
    getters: {},
    actions: {
        async fetchPosts() {
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/posts')
                .then((response) => response.json())
                .then((json) => this.posts = json);
                console.log(this.posts);
              
            }
            catch(error){
                console.log(error)
            }
        }
    }
});