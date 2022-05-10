<template>
  <v-container fluid>
    <v-form
      ref="form"
      v-model="valid"
      @submit.prevent="submitForm"
      autocomplete
      lazy-validation
    >
      <v-text-field
        v-model="username"
        label="Pseudo : "
        :rules="[formRules.required, formRules.nameLength]"
        required
      >
      </v-text-field>
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
        S'inscrire
      </v-btn>
    </v-form>
    <div class="d-flex flex-row-reverse">
      <v-btn type="submit" text @click="$emit('input', true)">
        Déja un compte ?
      </v-btn>
    </div>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue';
import { formRules } from '../../utils/formRules';
import VueI18n from 'vue-i18n';
import { VForm } from '../../utils/VForm';

export interface SignupFormData {
  email: string;
  password: string;
  username: string;
}

export default Vue.extend({
  name: 'SignupForm',
  props: {
    value: {
      type: Boolean,
    },
  },
  data() {
    return {
      valid: true,
      showPassword: false,
      email: '',
      password: '',
      username: '',
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
          username: this.username,
        } as SignupFormData);
      }
    },
  },
});
</script>
