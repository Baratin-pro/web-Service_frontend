<template>
  <div>
    <v-alert prominent v-if="error" type="error">
      {{ error }}
    </v-alert>
    <SourceList
      title="Films favoris"
      :sources="moviesFavoritesByUser"
      v-if="moviesFavoritesByUser"
    >
    </SourceList>
    <!-- <SourceList
      class="mt-2"
      title="Emissions télévisions favoris"
      :sources="tvFavoritesByUser"
      v-if="tvFavoritesByUser"
    ></SourceList> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Source } from '../models/source.model';
import SourceList from '../components/source/SourceList.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    SourceList,
  },
  data() {
    return {
      error: null as string | null,
      sources: [] as Source[],
    };
  },
  computed: {
    moviesFavoritesByUser(): Source[] {
      return (this.sources as Source[]).filter((source) => source.type === 'movie');
    },
    tvFavoritesByUser(): Source[] {
      return (this.sources as Source[]).filter((source) => source.type === 'tv');
    },
  },
  async mounted() {
    this.loadSourceFavoritesByUser();
  },
  methods: {
    async loadSourceFavoritesByUser() {
      try {
        this.sources = await this.$api.source.getFavoritesByUser();
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
