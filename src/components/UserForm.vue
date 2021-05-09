<template lang='pug'>
  div
    .tw-w-full.tw-max-w-5xl.tw-mx-auto.tw-h-32.tw-bg-auto.pr-bg-image
      .tw-max-w-2xl.tw-mx-auto.tw-relative.tw-h-full
        user-avatar.tw-absolute.tw-left-10.tw-top-6(
          v-model='photoURL'
        )
    .tw-max-w-2xl.tw-mx-auto.tw-mt-14
      q-form.q-px-lg.column.q-gutter-y-none(ref='userform' @submit='handleSubmit')
        q-input.q-mb-md.tw-rounded-md(
          v-model='email'
          type='email'
          outlined
          color='primary'
          label='E-Mail'
          disable
          )
            template(v-slot:prepend)
              q-icon(name='far fa-envelope')
            q-tooltip Адрес электронной почты
        q-input.tw-rounded-md(
          v-model='displayName'
          outlined
          color='primary'
          label='Имя'
          placeholder='Иван Иванов'
          lazy-rules
          :rules='[ val => !!val || "Введите отображаемое имя"]'
          )
            template(v-slot:prepend)
              q-icon(name='far fa-user')
            q-tooltip Отображаемое имя
        q-input.tw-rounded-md(
          v-model='phoneNumber'
          outlined
          color='primary'
          label='Телефон'
          prefix='+7'
          mask='(###) ###-##-##'
          lazy-rules
          :rules='[ val => !!val || "Введите номер мобильного телефона"]'
          )
            template(v-slot:prepend)
              q-icon(name='fas fa-phone')
            q-tooltip Номер мобильного телефона
        q-btn.full-width.q-mt-lg.tw-rounded-md(
          color='primary'
          data-cy='submit'
          padding='md xs'
          type='submit'
          icon='o_done'
          label='Записать'
        )
</template>

<script>
import UserAvatar from 'components/UserAvatar'
const normalizePhone = phone => phone.replace('+7', '')
export default {
  name: 'UserForm',
  props: {
    value: {
      type: Object,
      default: () => ({
        email: '',
        displayName: '',
        phoneNumber: '',
        photoURL: ''
      })
    }
  },
  data () {
    return {
      email: '',
      displayName: '',
      phoneNumber: '',
      photoURL: ''
    }
  },
  watch: {
    value (val) {
      this.$nextTick(() => {
        this.setUser(val)
      })
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.userform.validate(true).then(outcome => {
        if (outcome) {
          this.$emit('input', {
            email: this.email,
            displayName: this.displayName,
            phoneNumber: this.phoneNumber,
            photoURL: this.photoURL
          })
          this.$emit('update')
        }
      })
    },
    setUser (user) {
      this.email = user?.email || ''
      this.displayName = user?.displayName || ''
      this.photoURL = user?.photoURL || ''
      this.phoneNumber = normalizePhone(user?.phoneNumber || '')
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.setUser(this.value)
    })
  },
  components: {
    UserAvatar
  }
}
</script>

<style lang='scss'>
.pr-bg-image {
  background-image: url('~assets/material.png');
  background-position: 50% 50%;
}
</style>
