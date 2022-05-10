<template>
  <v-list dense :class="menuClass" :color="menuColor">
    <!-- Wesite title -->
    <v-list-item :to="{ name: 'Home' }" link>
      <v-list-item-content>
        <v-list-item-title class="shrink font-weight-black title">
          F-M-W
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <!-- Movies -->
    <v-list-item :to="{ name: 'Movies' }" link>
      <v-list-item-content>
        <v-list-item-title class="font-weight-black">
          Films
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <!-- Tv shows -->
    <v-list-item :to="{ name: 'Tvshows' }" link>
      <v-list-item-content>
        <v-list-item-title class="font-weight-black">
          Emissions télévisées
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <!-- Authors -->
    <v-list-item :to="{ name: 'Authors' }" link>
      <v-list-item-content>
        <v-list-item-title class="font-weight-black">
          Artistes
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <!-- Logout -->
    <v-list-item @click="$emit('logout')" link>
      <v-list-item-content>
        <v-list-item-title class="font-weight-black">Se déconnecter</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'MenuElements',
  props: {
    menuClass: {
      type: String,
    },
    menuColor: {
      type: String,
    },
  },
  data() {
    return {};
  },
  methods: {},
});
</script>
