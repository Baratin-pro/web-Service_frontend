<template>
  <v-row class="px-4">
    <v-col v-for="(tv, index) in tvByGenre" :key="index" cols="12" md="6" lg="4">
      <v-card height="480px">
        <v-row>
          <v-card-title class="text-subtitle-1 font-weight-bold">
            {{ tv.name }}
          </v-card-title>
        </v-row>
        <v-img
          height="250"
          :src="`https://image.tmdb.org/t/p/w500/${tv.backdrop_path}`"
          :alt="tv.name"
        >
        </v-img>
        <v-card-subtitle>
          <v-row>
            <v-col class="pt-0"> {{ dateToLocale(tv.first_air_date) }} </v-col>
            <v-col>
              <v-row class="d-flex flex-row-reverse text-body-2">
                <div
                  class="px-1"
                  v-for="(genre, index) in linkedGenre(tv.genre_ids)"
                  :key="index"
                >
                  {{ $i18n.t(`tvGenre.${genre.name}`).toString() }}
                </div>
              </v-row>
            </v-col>
          </v-row>
        </v-card-subtitle>
        <v-card-text> {{ showText(tv.overview) }} </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { TvGenre } from '../../models/tvGenre.model';

export default Vue.extend({
  name: 'TvGenreList',
  props: {
    tvByGenre: {
      type: Array,
    },
    tvGenre: {
      type: Array,
    },
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
      const genreList: TvGenre[] = [];
      idGenrelist.map((id) => {
        (this.tvGenre as TvGenre[])
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
