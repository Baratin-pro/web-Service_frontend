<template>
  <div>
    <template v-if="drawer">
      <v-navigation-drawer :value="drawer" @input="$emit('stateChanged', $event)" app>
        <MenuElements></MenuElements>
      </v-navigation-drawer>
    </template>
    <template v-else>
      <MenuElements menuClass="d-flex ml-2" menuColor="primary"></MenuElements>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import MenuElements from './MenuElements.vue';

export default Vue.extend({
  name: 'Navbar',
  components: {
    MenuElements,
  },

  data() {
    return {};
  },
  props: {
    drawer: {
      type: Boolean,
    },
  },
  methods: {},
});
</script>
