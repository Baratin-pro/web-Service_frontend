<template>
  <div v-if="(loadLike(source.id))">
    <v-alert prominent v-if="error" type="error">
      {{ error }}
    </v-alert>
    <v-btn
      icon
      style="position: relative;"
      @click="$emit('addLike', source.id, genreId)"
    >
      <v-icon color="red" x-large>
        mdi-heart
      </v-icon>
      <span
        style="position: absolute;"
        class="text-subtitle-1 white--text font-weight-bold pb-1"
      >
        <template v-if="sourceLike">
          {{ sourceLike }}
        </template>
        <template v-else>
          0
        </template>
      </span>
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Source } from '../../models/source.model';

export default Vue.extend({
  name: 'SourceLike',
  props: {
    source: {
      type: Object,
    },
    genreId: {
      type: Number,
    },
  },

  data() {
    return {
      error: null as string | null,
      sourceLike: undefined as undefined | number,
    };
  },
  methods: {
    async loadLike(sourceId: number) {
      try {
        const source: Source = await this.$api.source.getBySourceId(sourceId);
        if (source) {
          this.sourceLike = source.likes;
        }
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
