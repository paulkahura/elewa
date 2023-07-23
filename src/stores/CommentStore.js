import { defineStore } from "pinia";

export const useCommentStore = defineStore('commentStore', {
    state: () => ({
        comments: [],
    }),
    getters: {},
    actions: {
        async fetchComments() {
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/comments')
                .then((response) => response.json())
                .then((json) => this.comments = json);
                console.log(this.comments);
              
            }
            catch(error){
                console.log(error)
            }
        }
    }
});