<script setup lang="ts">
const route = useRoute();
interface IProps {
    itemsOnPage: number;
    pageIf: string
}
withDefaults(defineProps<IProps>(), {
    itemsOnPage: 10
});

const buttonPag = {};
</script>

<template>
    <template v-for="(pageNum, index) in itemsOnPage" :key="pageNum">
        <nuxt-link :to="{ name: 'posts', query: { page: pageNum } }" v-if="pageIf"
            :class="pageNum === parseInt(route.query.page as string)
                ? 'relative z-10 inline-flex items-center bg-gray-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                : 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'">{{
                                    pageNum }}</nuxt-link>
    </template>
</template>