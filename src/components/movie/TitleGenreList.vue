<template>
  <v-card elevation="0" @click="$emit('genreId', genre.id)"> {{ genre.name }}</v-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TitleGenreList',
  props: {
    genre: {
      type: Object,
    },
  },

  data() {
    return {};
  },
  methods: {},
});
</script>
