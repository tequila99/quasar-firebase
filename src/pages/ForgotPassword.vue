<template lang='pug'>
  q-page(padding="padding")
    q-form.authentication.q-gutter-y-md(ref="forgotPasswordForm" @submit="onSubmit")
      router-link(to="/")
          q-img(alt="Scori Logo" src="/fp-logo.png")
      h4.q-mb-none Восстановление пароля
      div.inst.q-mb-lg Пожалуйста введите адрес электронной почты. Не него будет выслана ссылка для сброса пароля.
      q-input(
        v-model="email"
        outlined
        autocomplete="email"
        color="primary"
        data-cy="email"
        for="email"
        label="EMAIL"
        lazy-rules="lazy-rules"
        name="email"
        :rules="[val => !!val || '*Field is required', val => val.includes('@') && val.includes('.') || '*Please Provide a valid email']"
      )
      q-btn.full-width.q-mt-md(
        color="primary" data-cy="submit" padding="md xs" label="Сбросить пароль" @click="onSubmit"
      )
</template>

<script>
import { mapActions } from 'vuex'
import { loadingSpinner } from '../mixins'

export default {
  mixins: [loadingSpinner],
  name: 'ForgotPassword',
  data () {
    return {
      email: ''
    }
  },
  methods: {
    ...mapActions({
      showInfo: 'logs/showInfo',
      showError: 'logs/showError',
      sendEmail: 'auth/sendEmail'
    }),
    onSubmit () {
      this.$refs.forgotPasswordForm.validate()
        .then(async success => {
          this.isLoading = true
          if (success) {
            try {
              await this.sendEmail(this)
              this.showInfo('На указанный было выслано письмо с ссылкой для сброса пароля')
              this.$router.push({ path: '/auth/login' })
            } catch (err) {
              this.showError('На указанный было выслано письмо с ссылкой для сброса пароля')
            }
          }
          this.isLoading = false
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.authentication
  margin auto
  max-width 30em
  width 100%
  .q-img
    height 190px
.q-page >>> .q-img__image
  height 184px
  background-size 35% !important
  background-position 50% 100% !important
</style>
