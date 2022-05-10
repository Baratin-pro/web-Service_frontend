<template>
  <v-card>
    <v-form
      ref="form"
      v-model="valid"
      @submit.prevent="submitForm"
      autocomplete
      lazy-validation
    >
      <v-text-field
        v-model="email"
        label="E-mail : "
        :rules="[formRules.required, formRules.email]"
        required
      >
      </v-text-field>
      <v-text-field
        v-model="password"
        label="Mot de passe : "
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
        :rules="passwordRules"
        required
      >
      </v-text-field>
      <v-btn block elevation="1" x-large type="submit" color="primary">
        Connexion
      </v-btn>
    </v-form>
  </v-card>
</template>
<script lang="ts">
import Vue from 'vue';
import { formRules } from '../../utils/formRules';
import VueI18n from 'vue-i18n';
import { VForm } from '../../utils/VForm';

export interface LoginFormData {
  email: string;
  password: string;
}

export default Vue.extend({
  name: 'LoginForm',
  data() {
    return {
      valid: true,
      showPassword: false,
      email: '',
      password: '',
      formRules,
    };
  },
  computed: {
    passwordRules(): { (v: string): boolean | VueI18n.TranslateResult }[] {
      return [
        this.formRules.passwordMin,
        this.formRules.hasLowercase,
        this.formRules.hasUppercase,
        this.formRules.hasNumber,
      ];
    },
  },
  methods: {
    async submitForm() {
      const form = this.$refs.form as VForm;
      if (form?.validate()) {
        this.$emit('submit', {
          email: this.email,
          password: this.password,
        } as LoginFormData);
      }
    },
  },
});
</script>
