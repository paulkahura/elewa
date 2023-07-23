import { defineStore } from "pinia";

export const useUserStore = defineStore('userStore', {
    state: () => ({
        users: [],
        following: [],
        isAuthenticated: false,
        user:{}
    }),
    getters: {},
    actions: {
        async fetchUsers() {
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/users')
                .then((response) => response.json())
                .then((json) => this.users = json);
                console.log(this.users);
              
            }
            catch(error){
                console.log(error)
            }
        },
        async followUser(userId) {
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/users')
                .then((response) => response.json())
                .then((json) => this.users = json);
                console.log(this.users);
              
            }
            catch(error){
                console.log(error)
            }
        },
          logout() {
            this.isAuthenticated = false;
          },

    }
});