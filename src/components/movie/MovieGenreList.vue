<template>
  <v-row class="px-4">
    <v-col v-for="(movie, index) in moviesByGenre" :key="index" cols="12" md="6" lg="4">
      <v-card height="480px">
        <v-row>
          <v-card-title class="text-subtitle-1 font-weight-bold">
            {{ movie.title }}
          </v-card-title>
        </v-row>
        <v-img
          height="250"
          :src="`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`"
          :alt="movie.title"
          class="d.flex align-end"
        >
          <SourceLike :source="movie" @addLike="addLike" :genreId="genreId">
          </SourceLike>
        </v-img>
        <v-card-subtitle>
          <v-row>
            <v-col class="pt-0"> {{ dateToLocale(movie.release_date) }} </v-col>
            <v-col>
              <v-row class="d-flex flex-row-reverse text-body-2">
                <div
                  class="px-1"
                  v-for="(genre, index) in linkedGenre(movie.genre_ids)"
                  :key="index"
                >
                  {{ genre.name }}
                </div>
              </v-row>
            </v-col>
          </v-row>
        </v-card-subtitle>
        <v-card-text> {{ showText(movie.overview) }} </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { MovieGenre } from '../../models/movieGenre.model';
import SourceLike from '../source/SourceLike.vue';

export default Vue.extend({
  name: 'MovieGenreList',
  props: {
    moviesByGenre: {
      type: Array,
    },
    movieGenre: {
      type: Array,
    },
    addLike: {
      type: Function,
    },
    genreId: {
      type: Number,
    },
  },
  components: {
    SourceLike,
  },

  data() {
    return {};
  },
  methods: {
    dateToLocale(date: string) {
      const dateGenre = new Date(date);
      return dateGenre.toLocaleString('fr', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    },
    linkedGenre(idGenrelist: []) {
      const genreList: MovieGenre[] = [];
      idGenrelist.map((id) => {
        (this.movieGenre as MovieGenre[])
          .filter((genre) => genre.id === id)
          .map((genre) => genreList.push(genre));
      });
      return genreList;
    },
    showText(text: string) {
      if (text.length > 250) {
        return `${text.substr(0, 250)}...`;
      } else {
        return text;
      }
    },
  },
});
</script>
