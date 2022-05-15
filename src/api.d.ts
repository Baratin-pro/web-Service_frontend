import Vue from 'vue';
import { api } from './api/api';

declare module 'vue/types/vue' {
  interface Vue {
    $api: typeof api
  }
}