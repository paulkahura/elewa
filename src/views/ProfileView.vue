<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl sm:text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Profile</h2>
        <p class="mt-6 text-lg leading-8 text-gray-600">View details about your profile.</p>
      </div>
      <div class="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
        <div class="p-8 sm:p-10 lg:flex-auto">
          <h3 class="text-2xl font-bold tracking-tight text-gray-900">Name: {{ store.user.name }}</h3>
          <p class="mt-6 text-base leading-7 text-gray-600">Email: {{ store.user.email }}</p>
          <p class="mt-6 text-base leading-7 text-gray-600">Address: {{ store.user.address.street }} {{ store.user.address.city }}</p>
          <div class="mt-10 flex items-center gap-x-4">
            <h4 class="flex-none text-sm font-semibold leading-6 text-indigo-600">Details</h4>
            <div class="h-px flex-auto bg-gray-100" />
          </div>
          <ul role="list" class="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
            <li class="flex gap-x-3">
              <EnvelopeIcon class="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
              {{ store.user.email }}
            </li>
            <li class="flex gap-x-3">
              <DevicePhoneMobileIcon class="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
              {{ store.user.phone }}
            </li>
            <li class="flex gap-x-3">
              <WifiIcon class="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
              {{ store.user.website }}
            </li>
            <li class="flex gap-x-3">
              <MapPinIcon class="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
              {{ store.user.address.street }} {{ store.user.address.city }}
            </li>
            <li class="flex gap-x-3">
              <BuildingOffice2Icon class="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
              {{ store.user.company.name }}
            </li>
          </ul>
        </div>
      
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckIcon, DevicePhoneMobileIcon, EnvelopeIcon, BuildingOffice2Icon, MapPinIcon, WifiIcon } from '@heroicons/vue/20/solid'
import { useUserStore } from '../stores/UserStore';

const store = useUserStore()
console.log(store.user)

const includedFeatures = [
  'Private forum access',
  'Member resources',
  'Entry to annual conference',
  'Official member t-shirt',
]
</script>