<template>
  <v-app>
    <v-app-bar app color="primary" dark style="height: 80px;" class="py-1">
      <v-col lg="7" sm="4" class="d-flex align-center">
        <div class="pt-2">
          <v-img
            alt="F-M-W Logo"
            class="shrink"
            src="./assets/logo.png"
            transition="scale-transition"
            contain
            width="70px"
            height="70px"
          />
        </div>
        <div class="hidden-sm-and-down">
          <Navbar :logout="logout"></Navbar>
        </div>
      </v-col>

      <v-col
        lg="3"
        sm="4"
        class="hidden-md-and-up shrink font-weight-black title text-center"
      >
        F-M-W
      </v-col>

      <v-spacer></v-spacer>

      <v-col lg="2" sm="4"></v-col>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer">
      </v-app-bar-nav-icon>
    </v-app-bar>

    <template v-if="drawer">
      <Navbar
        :drawer="drawer"
        @stateChanged="drawer = $event"
        :logout="logout"
      ></Navbar>
    </template>

    <v-main class="mt-5">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Navbar from './components/layout/Navbar.vue';
import { clearToken } from './api/auth.service';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'App',
  components: {
    Navbar,
  },
  computed: {
    ...mapGetters(['user']),
  },
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    logout() {
      this.$store.commit('setUser', undefined);
      clearToken();
      this.$router.replace({ name: 'Authentication' });
    },
  },
});
</script>
