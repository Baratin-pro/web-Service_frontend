<template>
  <div>
    <v-alert prominent v-if="error" type="error">
      {{ error }}
    </v-alert>
    <v-card>
      <v-row>
        <v-card-title class="text-h2 font-weight-bold">
          Films
        </v-card-title>
        <v-col cols="12" md="2" class="d-flex mt-md-4">
          <v-select
            v-model="selectedGenres"
            :items="genreList"
            label="Tous les films"
            solo
            @input="loadMovieByGenre(selectedGenres)"
          >
          </v-select>
        </v-col>
      </v-row>
      <MovieGenreList
        :moviesByGenre="moviesByGenre"
        :movieGenre="movieGenre"
      ></MovieGenreList>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MovieGenreList from '../components/movie/MovieGenreList.vue';
import { MovieByGenre } from '../models/movieByGenre.model';
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
      moviesByGenre: [] as MovieByGenre[],
      selectedGenres: [],
    };
  },
  mounted() {
    this.loadMovieGenreList();
  },
  computed: {
    genreList(): { text: string; value: number | undefined }[] {
      const genres: [{ name: string; id: number | undefined }] = [
        { name: 'Tous les films', id: undefined },
      ];
      genres.push(...this.movieGenre);
      return genres.map((genre) => ({
        text: genre.name,
        value: genre.id,
      }));
    },
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
      if (isNaN(genreId)) {
        this.moviesByGenre = [];
      } else {
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
