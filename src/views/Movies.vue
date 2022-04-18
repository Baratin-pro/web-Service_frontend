<template>
  <div>
    <v-alert prominent v-if="error" type="error">
      {{ error }}
    </v-alert>
    <MovieGenreList :genreList="movieGenre"></MovieGenreList>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MovieGenreList from '../components/movie/MovieGenreList.vue';
import { MovieGenre } from './../models/movieGenre.model';

export default Vue.extend({
  name: 'Movies',
  components: {
    MovieGenreList,
  },
  data() {
    return {
      error: null as string | null,
      movieGenre: [] as MovieGenre[],
    };
  },
  mounted() {
    this.loadMovieGenreList();
  },
  methods: {
    async loadMovieGenreList() {
      try {
        this.movieGenre = await this.$api.movie.genreList();
      } catch (e) {
        this.handleError(e);
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleError(err: any) {
      if (this.$te(`error.${err.message}`)) {
        this.error = this.$t(`error.${err.message}`).toString();
      } else {
        this.error = this.$t('error.unkown').toString();
      }
      setTimeout(() => {
        this.error = null;
      }, 10000);
    },
  },
});
</script>
