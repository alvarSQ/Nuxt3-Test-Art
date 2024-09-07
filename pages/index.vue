<script setup lang="ts"></script>

<template>
  <div class="flex justify-center items-center h-screen">
    <nuxt-link
      :to="{ name: 'posts', query: { page: 1 } }"
      class="text-5xl font-extrabold text-zinc-400"
      >Перейти к постам</nuxt-link
    >
  </div>
</template>
