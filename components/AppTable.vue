<script setup lang="ts">
const route = useRoute();
const postsStore = usePostStore();

await useAsyncData(() => postsStore.getPosts());

interface IColumn {
  key: string;
  label: string;
  sortable?: boolean;
}
type RowFromColumns<C extends IColumn[]> = {
  [K in C[number]["key"]]: any;
};

const itemsOnPage = ref(10);

const columns = [
  { label: "Id", key: "id", sortable: true },
  { label: "Title", key: "title", sortable: true },
  { label: "Body", key: "body" },
  { label: "User Id", key: "userId" },
];

const paginatedRows = computed(() => {
  if (route.query.page) {
    const rqp = +route.query.page;
    const startIndex = (rqp - 1) * itemsOnPage.value;
    const endIndex = startIndex + itemsOnPage.value;
    return postsStore.posts?.slice(startIndex, endIndex) as RowFromColumns<IColumn[]>[];
  }
  return;
});
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg mb-5">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th
            scope="col "
            class="px-6 py-3"
            v-for="(col, colIdx) in columns"
            :key="colIdx"
          >
            <div class="flex items-center gap-1 whitespace-nowrap">
              {{ col.label }}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b"
          v-for="(row, rowInd) in paginatedRows"
          :key="rowInd"
        >
          <td class="px-6 py-4" v-for="(col, colInd) in columns" :key="colInd">
            {{ row[`${col.key}`] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <AppPagination :items-on-page="itemsOnPage" :length-posts="postsStore.posts?.length" />
</template>
