<template>
  <v-card>
    <v-container v-for="(movie, index) in movieListByGenre" :key="index">
      {{ movie.id }} {{ movie.title }}
    </v-container>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'MovieGenreList',
  props: {
    movieListByGenre: {
      type: Array,
    },
  },

  data() {
    return {};
  },
  computed: {},
  methods: {},
});
</script>
