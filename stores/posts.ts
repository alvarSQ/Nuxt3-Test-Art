import { defineStore } from 'pinia';
interface IPost {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const URL_JSONPLACEHOLDER = 'https://jsonplaceholder.typicode.com/';

export const usePostStore = defineStore('posts', {
  state: () => ({
    posts: <IPost[] | null>null,
    error: <string>'',
    loading: <boolean>true
  }),
  getters: {},
  actions: {
    async getPosts() {
      try {
        const data = await $fetch<IPost[] | null>(
         `${URL_JSONPLACEHOLDER}posts`
        );
              
        if (data) this.posts = [...data];        
        return data;
      } catch (e) {
        if (e instanceof Error) {
          this.error = e.message;
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
