<template>
  <div>
    <v-alert prominent v-if="error" type="error">
      {{ error }}
    </v-alert>
    <v-card>
      <v-tabs v-model="tab">
        <v-tab v-for="(genre, index) in movieGenre" :key="index">
          <TitleGenreList :genre="genre" @genreId="loadMovieByGenre"></TitleGenreList>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(genre, index) in movieGenre" :key="index">
          <MovieGenreList :movieListByGenre="moviesByGenre"></MovieGenreList>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MovieGenreList from '../components/movie/MovieGenreList.vue';
import TitleGenreList from '../components/movie/TitleGenreList.vue';
import { MovieByGenre } from '../models/movieByGenre.model';
import { MovieGenre } from './../models/movieGenre.model';

export default Vue.extend({
  name: 'Movies',
  components: {
    MovieGenreList,
    TitleGenreList,
  },
  data() {
    return {
      error: null as string | null,
      movieGenre: [] as MovieGenre[],
      moviesByGenre: [] as MovieByGenre[],
      tab: 0,
      genreId: null as null | number,
    };
  },
  mounted() {
    this.loadMovieGenreList();
    this.loadMovieByGenre();
  },
  methods: {
    async loadMovieGenreList() {
      try {
        this.movieGenre = await this.$api.movie.genreList();
      } catch (e) {
        this.handleError(e);
      }
    },
    async loadMovieByGenre(genreId = 28) {
      if (genreId) {
        try {
          this.moviesByGenre = await this.$api.movie.getByGenreId(genreId);
        } catch (e) {
          this.handleError(e);
        }
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
