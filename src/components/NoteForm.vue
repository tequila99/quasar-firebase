<template lang='pug'>
  .tw-max-w-2xl.tw-mx-auto.tw-mt-4
    q-form.q-px-lg.column.q-gutter-y-none(ref='noteform' @submit='handleSubmit')
      q-input.q-mb-md.tw-rounded-md(
        v-model='title'
        outlined
        autofocus
        color='primary'
        label='Заголовок'
        stack-label
        lazy-rules
        :rules='[ val => !!val || "Введите заголовок заметки"]'
      )
        template(v-slot:prepend)
          q-icon(name='o_label')
        q-tooltip Заголовок заметки
      q-input.q-mb-md.tw-rounded-md(
        type='textarea'
        v-model='text'
        outlined
        label='Содержание'
        placeholder='Содержание заметки'
        stack-label
        lazy-rules
        :rules='[ val => !!val || "Введите содержание заметки"]'
      )
        template(v-slot:prepend)
          q-icon(name='o_article')
        q-tooltip Содержание заметки
      q-select.tw-rounded-md(
        stack-label
        outlined
        label='Теги'
        v-model='tags'
        clearable
        clear-icon='o_close'
        use-input
        use-chips
        multiple
        :input-debounce='0'
        @new-value='createTag'
        :options='filteredOptions'
        @filter='filterFn'
      )
        template(v-slot:selected-item='{ index, opt, removeAtIndex}')
          q-chip(
            :label='opt'
            outline
            square
            removable
            color='primary'
            size='0.7rem'
            @remove='removeAtIndex(index)'
          )
        template(v-slot:prepend)
          q-icon(name='o_tag')
        q-tooltip Введите список тегов для быстрого поиска
      q-btn.full-width.q-mt-lg.tw-rounded-md(
        color='primary'
        data-cy='submit'
        padding='md xl'
        type='submit'
        icon='o_published_with_changes'
        label='Сохранить'
      )
        q-tooltip Сохранить заметку
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'NoteForm',
  props: {
    value: {
      type: Object,
      default: () => ({
        title: '',
        text: ''
      })
    }
  },
  data () {
    return {
      title: '',
      text: '',
      tags: [],
      options: [],
      filteredOptions: []
    }
  },
  watch: {},
  computed: {
    ...mapGetters({
      listTags: 'notes/listTags'
    })
  },
  methods: {
    createTag (val, done) {
      if (!val.length) return
      if (!this.options.includes(val)) {
        this.options.push(val)
      }
      done(val, 'toggle')
    },
    filterFn (val, update) {
      update(() => {
        if (val === '') {
          this.filteredOptions = this.options
        } else {
          const needle = val.toLowerCase()
          this.filteredOptions = this.options.filter(
            v => v.toLowerCase().indexOf(needle) > -1
          )
        }
      })
    },
    handleSubmit () {
      this.$refs.noteform.validate(true).then(outcome => {
        if (outcome) {
          this.$emit('input',
            {
              title: this.title,
              text: this.text,
              tags: this.tags || []
            })
          this.$emit('update')
        }
      })
    }
  },
  created () {},
  mounted () {
    this.title = this.value.title
    this.text = this.value.text
    this.tags = this.value.tags && Array.isArray(this.value.tags) ? this.value.tags : []
    this.options = this.listTags
    this.filteredOptions = this.listTags
  },
  components: {}
}
</script>
