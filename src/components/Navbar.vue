<template>
    <header class="bg-white">
        <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div class="flex lg:flex-1">
                <a href="#" class="-m-1.5 p-1.5">
                    <span class="sr-only">Elewa</span>
                    <img class="h-8 w-auto" :src="chat" alt="" />
                </a>
            </div>
            <div class="flex lg:hidden">
                <button v-if="!userStore.isAuthenticated" type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    @click="mobileMenuOpen = true">
                    <span class="sr-only">Open main menu</span>
                    <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                </button>
            </div>
            <PopoverGroup class="hidden lg:flex lg:gap-x-12">


                <RouterLink to="/" href="#" class="text-sm font-semibold leading-6 text-gray-900">Home</RouterLink>
                <RouterLink to="/profile" href="#" class="text-sm font-semibold leading-6 text-gray-900">Profile</RouterLink>
            </PopoverGroup>
            <div class="hidden lg:flex lg:flex-1 lg:justify-end">
                <button type="submit" @click="openModal" v-if="!userStore.isAuthenticated"
                    class="rounded-md  bg-indigo-600 px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                    In</button>
                    <button type="submit" @click="logout" v-if="userStore.isAuthenticated"
                    class="rounded-md  bg-red-600 px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Sign
                    out</button>
            </div>
        </nav>
        <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
            <div class="fixed inset-0 z-10" />
            <DialogPanel
                class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div class="flex items-center justify-between">
                    <a href="#" class="-m-1.5 p-1.5">
                        <span class="sr-only">Elewa chat</span>
                        <img class="h-8 w-auto" :src="chat"
                            alt="" />
                    </a>
                    <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
                        <span class="sr-only">Close menu</span>
                        <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div class="mt-6 flow-root">
                    <div class="-my-6 divide-y divide-gray-500/10">
                        
                        <div class="py-6">
                            <a href="#" @click="openModal" v-if="!userStore.isAuthenticated"
                                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log
                                in</a>
                        </div>
                    </div>
                </div>
            </DialogPanel>
        </Dialog>
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
                                <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                                    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                                        <img class="mx-auto h-10 w-auto"
                                            :src="chat"
                                            alt="Your Company" />
                                        <h2
                                            class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                            Sign in to your account</h2>
                                            <p class="text-red" v-if="signinMessage">{{ signinMessage }}</p>
                                    </div>

                                    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                        <form class="space-y-6" @submit.prevent="handleSubmit">
                                            <div>
                                                <label for="email"
                                                    class="block text-sm font-medium leading-6 text-gray-900">Email
                                                    address</label>
                                                <div class="mt-2">
                                                    <input id="email" name="email" type="email" v-model.trim="email"
                                                        required=""
                                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                </div>
                                            </div>

                                            <div>
                                                <div class="flex items-center justify-between">
                                                    <label for="password"
                                                        class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                                    <div class="text-sm">
                                                        <a href="#"
                                                            class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot
                                                            password?</a>
                                                    </div>
                                                </div>
                                                <div class="mt-2">
                                                    <input id="password" name="password" type="password" v-model="password"
                                                        autocomplete="current-password" required=""
                                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                </div>
                                            </div>

                                            <div>
                                                <button type="submit"
                                                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                                                    in</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>
    </header>
    <RouterView />
</template>
  
<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
// import chat from '../assets/chat.png'
import chat from '../assets/speech-bubble.png'
import { useUserStore } from '../stores/UserStore';
import {
    Dialog,
    DialogPanel,
    PopoverGroup,
    TransitionRoot,
    TransitionChild,
} from '@headlessui/vue'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/vue/24/outline'

const email = ref('');
const password = ref('');

let signinMessage = ''
const userStore = useUserStore()
onMounted(() => {
    userStore.fetchUsers();
})
let users = userStore.users

const handleSubmit = () => {
    console.log(email.value)
  const user = users.find(u => u.email === email.value && u.address.zipcode === password.value);

  if (user) {
    signinMessage=''
    isOpen.value = false
    userStore.isAuthenticated = true
    userStore.user = user
    alert('Login successful!');
  } else {
    signinMessage='invalid email or password'
    alert('Invalid email or password. Please try again.');
  }
};
const mobileMenuOpen = ref(false)
const isOpen = ref(false)
function logout() {
    userStore.isAuthenticated = false
}
function closeModal() {
    isOpen.value = false
}
function openModal() {
    isOpen.value = true
}
</script>