import I18N from '@/i18n';

export const formRules = {
    required: (v: string) => !!v || I18N.t('rules.required'),
    email: (v: string) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || I18N.t('rules.email'),
    passwordMin: (v: string) => (v.length >= 8 && v.length < 32) || I18N.t('rules.passwordLength'),
    noNumber: (v: string) => /^([^0-9]*)$/.test(v) || I18N.t('rules.noNumber'),
    nameLength: (v: string) => (v.length >= 2) || I18N.t('rules.nameLength', { length: 2 }),
    hasLowercase: (v: string) => /[a-z]/.test(v) || I18N.t('rules.hasLowercase'),
    hasUppercase: (v: string) => /[A-Z]/.test(v) || I18N.t('rules.hasUppercase'),
    hasNumber: (v: string) => /[0-9]/.test(v) || I18N.t('rules.hasNumber'),
};