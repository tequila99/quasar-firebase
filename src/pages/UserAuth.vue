<template lang='pug'>
  q-page(padding)
    h5.text-center.q-mt-xl {{ getAuthTitle }}
    q-form.authentication.q-px-md.q-gutter-y-sm(ref="emailAuthenticationForm" @submit="onSubmit")
      q-input(
        v-model="email"
        outlined
        color="primary"
        lazy-rules="lazy-rules"
        name="email"
        label="Login"
        :rules='[val => !!val || "*Field is required", val => val.includes("@") && val.includes(".") || "*Please Provide a valid email"]'
        )
          template(v-slot:prepend)
            q-icon(name='far fa-envelope')
      q-input(
        v-model="password"
        for="password"
        name="password"
        lazy-rules="lazy-rules"
        outlined
        autocomplete="current-password"
        color="primary"
        data-cy="password"
        label="Password"
        :rules='[val => !!val || "*Field is required"]'
        :type="isPwd ? 'password' : 'text'"
        @keyup.enter="onSubmit()"
      )
        template(v-slot:prepend)
            q-icon(name='fas fa-lock')
        template(v-slot:append)
          q-icon.cursor-pointer(
            :name="isPwd ? 'visibility_off' : 'visibility'" @click="isPwd = !isPwd"
          )
      q-input(
        v-if="isRegistration"
        lazy-rules="lazy-rules"
        outlined
        autocomplete="new-password"
        color="primary"
        data-cy="verifyPassword"
        label="Verify password"
        v-model="passwordMatch"
        :rules='[ val => !!val || "*Field is required", val => val === password || "*Passwords dont match" ]'
        :type="isPwd ? 'password' : 'text'"
        @keyup.enter="onSubmit();"
      )
        template(v-slot:prepend)
            q-icon(name='fas fa-lock')
        template(v-slot:append)
          q-icon.cursor-pointer(
            :name="isPwd ? 'visibility_off' : 'visibility'" @click="isPwd = !isPwd"
          )
      q-btn.full-width.q-mt-sm(
        color="primary"
        data-cy="submit"
        padding="md xs"
        type="submit"
        :icon='isRegistration ? "fas fa-user-plus" : "fas fa-sign-in-alt"'
        :label="getAuthButtonLabel")
      q-btn.full-width.q-mt-sm(
        color="secondary"
        padding="md xs"
        label="Войти с помощью Google"
        icon='fab fa-google'
        @click='handleLoginGoogle'
      )
      p.q-mt-md.q-mb-none.text-center
        router-link.text-blue(:to="routeAuthentication")
          span(v-if="isRegistration") У меня есть учетная запись
          span(v-else) Создать новый аккаунт
      p.q-ma-sm.text-center
        router-link.text-blue(to="forgotPassword") Я не помню пароль
</template>

<script>
import { mapActions } from 'vuex'
import { loadingSpinner } from '../mixins'
export default {
  mixins: [loadingSpinner],
  name: 'UserAuth',
  computed: {
    getAuthTitle () {
      return this.isRegistration ? 'Зарегистрироваться в системе' : 'Войти в систему'
    },
    getAuthButtonLabel () {
      return this.isRegistration ? 'Регистрация' : 'Вход в систему'
    },
    isRegistration () {
      return this.$route.name === 'Register'
    },
    routeAuthentication () {
      return this.isRegistration ? '/auth/login' : '/auth/register'
    }
  },
  data () {
    return {
      email: null,
      isPwd: true,
      password: null,
      passwordMatch: null
    }
  },
  methods: {
    ...mapActions({
      createUser: 'auth/createUser',
      login: 'auth/login',
      loginGoogle: 'auth/loginGoogle',
      showError: 'logs/showError'
    }),
    onSubmit () {
      const { email, password } = this
      this.$refs.emailAuthenticationForm.validate()
        .then(async success => {
          if (success) {
            this.isLoading = true
            try {
              if (this.isRegistration) {
                await this.createUser({ email, password })
              } else {
                await this.login({ email, password })
              }
            } catch (err) {
              this.showError(err)
            } finally {
              this.isLoading = false
            }
          }
        })
    },
    async handleLoginGoogle () {
      try {
        await this.loginGoogle()
      } catch (err) {
        this.showError(err)
      }
    }
  }
}
</script>

<style lang="scss">
.authentication {
  margin: auto;
  max-width: 25rem;
  width: 100%;
}
</style>
