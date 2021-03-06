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
            @input="loadTvByGenre(selectedGenres)"
          >
          </v-select>
        </v-col>
      </v-row>
      <TvGenreList
        :genreId="genreId"
        :tvByGenre="tvByGenre"
        :tvGenre="tvGenre"
        :addLike="addLike"
      >
      </TvGenreList>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TvGenreList from '../components/tv/TvGenreList.vue';
import { TvGenre } from './../models/tvGenre.model';
import { TvByGenre } from '../models/tvByGenre.model';

export default Vue.extend({
  name: 'Tvshows',
  components: {
    TvGenreList,
  },
  data() {
    return {
      error: null as string | null,
      tvGenre: [] as TvGenre[],
      tvByGenre: [] as TvByGenre[],
      genreId: undefined as undefined | number,
      selectedGenres: [],
    };
  },
  async mounted() {
    await this.loadTvGenreList();
    this.loadTvByGenre(this.tvGenre[0].id);
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
    async loadTvByGenre(genreId: number) {
      try {
        this.genreId = genreId;
        this.tvByGenre = await this.$api.tv.getByGenreId(genreId);
      } catch (e) {
        this.handleError(e);
      }
    },
    async addLike(source: number, genreId: number) {
      try {
        await this.$api.source.sourceLike(source, 'tv', '1');
        return this.loadTvByGenre(genreId);
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
