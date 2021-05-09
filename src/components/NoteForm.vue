<template lang='pug'>
  .tw-max-w-2xl.tw-mx-auto.tw-mt-4
    q-form.q-px-lg.column.q-gutter-y-none(ref='noteform' @submit='handleSubmit')
      q-input.q-mb-md.tw-rounded-md(
        v-model='title'
        outlined
        color='primary'
        label='Заголовок'
        placeholder='Заголовок заметки'
      )
        template(v-slot:prepend)
          q-icon(name='o_title')
        q-tooltip Заголовок заметки
      q-input.tw-rounded-md(
        type='textarea'
        v-model='text'
        outlined
        label='Содержание'
        placeholder='Содержание заметки'
      )
        template(v-slot:prepend)
          q-icon(name='o_article')
        q-tooltip Содержание заметки
      q-btn.full-width.q-mt-lg.tw-rounded-md(
        color='primary'
        data-cy='submit'
        padding='md xl'
        type='submit'
        icon='o_done'
        label='Опубликовать'
      )
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  name: 'NoteForm',
  props: {},
  data () {
    return {
      title: '',
      text: ''
    }
  },
  watch: {},
  computed: {
  },
  methods: {
    handleSubmit () {
      this.$refs.noteform.validate(true).then(outcome => {
        if (outcome) {
          this.$emit('input',
            {
              title: this.title,
              text: this.text
            })
          this.$emit('update')
        }
      })
    }
  },
  created () {},
  mounted () {},
  components: {}
}
</script>
