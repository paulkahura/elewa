<template>
    <div class="bg-white py-4 sm:py-4">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      
      <div class="mx-auto  max-w-2xl rounded-3xl ring-1 ring-gray-200  lg:mx-0 lg:flex lg:max-w-none">
        <div class="p-8 sm:p-10 lg:flex-auto">
            <img class="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
          <h3 class="text-2xl font-bold tracking-tight text-gray-900">{{ props.post.title }}</h3>
          <p class="mt-6 text-base leading-7 text-gray-600">Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis repellendus etur quidem assumenda.</p>
          <div class="mt-10 flex items-center gap-x-4">
            <h4 class="flex-none text-sm font-semibold leading-6 text-indigo-600">What’s included</h4>
            <div class="h-px flex-auto bg-gray-100" />
          </div>
          <ul role="list" class="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
            <li class="flex gap-x-3">
              <CheckIcon class="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
              feature
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { CheckIcon } from '@heroicons/vue/20/solid';
const props = defineProps(['post'])
console.log(props.post)
</script>