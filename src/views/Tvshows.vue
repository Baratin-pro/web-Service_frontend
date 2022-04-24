<template>
  <div>
    <v-alert prominent v-if="error" type="error">
      {{ error }}
    </v-alert>
    <v-card>
      <v-row>
        <v-card-title class="text-h2 font-weight-bold">
          Emissions télévisions
        </v-card-title>
        <v-col cols="12" md="3" class="d-flex mt-md-4">
          <v-select
            v-if="genreList[0]"
            v-model="selectedGenres"
            :items="genreList"
            :label="genreList[0].text"
            solo
            @input="loadTvGenreList(selectedGenres)"
          >
          </v-select>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { TvGenre } from './../models/tvGenre.model';

export default Vue.extend({
  name: 'Tvshows',
  data() {
    return {
      error: null as string | null,
      tvGenre: [] as TvGenre[],
      selectedGenres: [],
    };
  },
  async mounted() {
    await this.loadTvGenreList();
  },
  computed: {
    genreList(): { text: string; value: number | undefined }[] {
      return (this.tvGenre as TvGenre[]).map((genre) => ({
        text: this.$i18n.t(`tvGenre.${genre.name}`).toString(),
        value: genre.id,
      }));
    },
  },
  methods: {
    async loadTvGenreList() {
      try {
        this.tvGenre = await this.$api.tv.genreList();
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
