<template>
  <v-card height="480px" class="px-4" v-if="(loadMovieById(sourceId))">
    <v-alert prominent v-if="error" type="error">
      {{ error }}
    </v-alert>
    <template v-if="movie">
      <v-row>
        <v-card-title class="text-subtitle-1 font-weight-bold">
          {{ movie.title }}
        </v-card-title>
      </v-row>
      <v-img
        height="250"
        :src="`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`"
        :alt="movie.title"
      >
      </v-img>
      <v-card-subtitle>
        <v-row>
          <v-col class="pt-0"> {{ dateToLocale(movie.release_date) }} </v-col>
          <v-col>
            <v-row class="d-flex flex-row-reverse text-body-2"> </v-row>
          </v-col>
        </v-row>
      </v-card-subtitle>
      <v-card-text> {{ showText(movie.overview) }} </v-card-text>
    </template>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Movie } from '../../models/movie.model';

export default Vue.extend({
  name: 'MovieList',
  props: {
    sourceId: {
      type: String,
    },
  },

  data() {
    return {
      error: null as string | null,
      movie: undefined as undefined | Movie,
    };
  },
  methods: {
    async loadMovieById(sourceId: string) {
      const id = parseInt(sourceId);
      try {
        this.movie = await this.$api.movie.getById(id);
      } catch (e) {
        this.handleError(e);
      }
    },
    dateToLocale(date: string) {
      const dateGenre = new Date(date);
      return dateGenre.toLocaleString('fr', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    },
    showText(text: string) {
      if (text.length > 250) {
        return `${text.substr(0, 250)}...`;
      } else {
        return text;
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
