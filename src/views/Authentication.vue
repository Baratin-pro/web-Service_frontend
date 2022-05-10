<template>
  <v-container>
    <v-alert prominent v-if="error" type="error">
      {{ error }}
    </v-alert>
    <v-card max-width="500" class="mx-auto mt-12">
      <LoginForm @submit="login" v-model="isLogin" v-if="isLogin"></LoginForm>
      <SignupForm @submit="signup" v-model="isLogin" v-else></SignupForm>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue';
import LoginForm, { LoginFormData } from '../components/auth/LoginForm.vue';
import SignupForm, { SignupFormData } from '../components/auth/SignupForm.vue';
import { setToken } from '../api/auth.service';

export default Vue.extend({
  name: 'Authentication',
  components: {
    LoginForm,
    SignupForm,
  },
  data() {
    return {
      error: undefined as string | undefined,
      isLogin: true,
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
        this.$router.push({ name: 'Home' });
      } catch (e) {
        this.handleError(e);
      }
    },
    async signup(signupFormData: SignupFormData) {
      this.error = undefined;
      try {
        const signupValid = await this.$api.user.signup(
          signupFormData.email,
          signupFormData.password,
          signupFormData.username
        );
        if (signupValid) {
          const auth = await this.$api.user.login(
            signupFormData.email,
            signupFormData.password
          );
          setToken(auth.token);
          this.$router.push({ name: 'Home' });
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
        this.error = undefined;
      }, 10000);
    },
  },
});
</script>
