<template>
  <v-card>
    <v-tabs v-model="tab">
      <v-tab v-for="(genre, index) in genreList" :key="index">{{ genre.name }}</v-tab>
    </v-tabs>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'MovieGenreList',
  props: {
    genreList: {
      type: Array,
    },
  },

  data() {
    return {
      tab: 0,
    };
  },
  methods: {},
});
</script>
