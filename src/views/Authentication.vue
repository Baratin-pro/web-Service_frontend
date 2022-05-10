<template>
  <v-card>
    <LoginForm @submit="login"></LoginForm>
  </v-card>
</template>
<script lang="ts">
import Vue from 'vue';
import LoginForm, { LoginFormData } from '../components/auth/LoginForm.vue';
import { setToken } from '../api/auth.service';

export default Vue.extend({
  name: 'Authentication',
  components: {
    LoginForm,
  },
  data() {
    return {
      error: undefined as string | undefined,
    };
  },
  methods: {
    async login(loginFormData: LoginFormData) {
      this.error = undefined;
      try {
        const auth = await this.$api.user.login(
          loginFormData.email,
          loginFormData.password
        );
        setToken(auth.token);
        console.log(auth.token);
        this.$router.push({ name: 'Home' });
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
        this.error = undefined;
      }, 10000);
    },
  },
});
</script>
