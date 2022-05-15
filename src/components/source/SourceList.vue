<template>
  <v-card elevation="0">
    <v-card-title class="text-md-h3 text-h4 font-weight-bold">
      {{ title }}
    </v-card-title>
    <v-row>
      <v-col v-for="(source, index) in sources" :key="index" cols="12" md="6" lg="4">
        <MovieList :sourceId="source.sourceId"></MovieList>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import MovieList from '..//movie/MovieList.vue';

export default Vue.extend({
  name: 'SourceList',
  data() {
    return {};
  },
  components: {
    MovieList,
  },
  props: {
    sources: {
      type: Array,
    },
    title: {
      type: String,
    },
  },
});
</script>
