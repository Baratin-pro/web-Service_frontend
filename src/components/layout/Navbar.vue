<template>
  <div>
    <template v-if="drawer">
      <v-navigation-drawer :value="drawer" @input="$emit('stateChanged', $event)" app>
        <MenuElements @logout="logout" :user="user"></MenuElements>
      </v-navigation-drawer>
    </template>
    <template v-else>
      <MenuElements
        menuClass="d-flex ml-2"
        menuColor="primary"
        @logout="logout"
        :user="user"
      ></MenuElements>
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
    logout: {
      type: Function,
    },
    user: {
      type: Object,
    },
  },
  methods: {},
});
</script>
