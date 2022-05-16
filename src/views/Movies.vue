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
            v-if="genreList[0]"
            v-model="selectedGenres"
            :items="genreList"
            :label="genreList[0].text"
            solo
            @input="loadMovieByGenre(selectedGenres)"
          >
          </v-select>
        </v-col>
      </v-row>
      <MovieGenreList
        :genreId="genreId"
        :moviesByGenre="moviesByGenre"
        :movieGenre="movieGenre"
        :addLike="addLike"
      >
      </MovieGenreList>
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
      genreId: undefined as undefined | number,
      selectedGenres: [],
    };
  },
  async mounted() {
    await this.loadMovieGenreList();
    this.loadMovieByGenre(this.movieGenre[0].id);
  },
  computed: {
    genreList(): { text: string; value: number | undefined }[] {
      return (this.movieGenre as MovieGenre[]).map((genre) => ({
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
    async loadMovieByGenre(genreId: number) {
      try {
        this.genreId = genreId;
        this.moviesByGenre = await this.$api.movie.getByGenreId(genreId);
      } catch (e) {
        this.handleError(e);
      }
    },
    async addLike(source: number, genreId: number) {
      try {
        await this.$api.source.sourceLike(source, 'movie', '1');
        return this.loadMovieByGenre(genreId);
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
