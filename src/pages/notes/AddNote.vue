<template lang='pug'>
  q-page
    note-form(@input='handleSaveNote')
</template>

<script>
import NoteForm from 'components/NoteForm'
import { mapActions } from 'vuex'
export default {
  name: 'AddNote',
  props: {},
  data () {
    return {
      actionComplete: false
    }
  },
  methods: {
    ...mapActions({
      add: 'notes/addNote',
      showError: 'logs/showError'
    }),
    async handleSaveNote (note) {
      this.isLoading = true
      try {
        await this.add(note)
        this.actionComplete = true
      } catch (err) {
        this.showError(err)
      } finally {
        this.isLoading = false
        this.$router.go(-1)
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.actionComplete) return next()
    this.$q.dialog({
      title: 'Подтвердите действие',
      message: 'Данные не сохранены. Вы действительно хотите покинуть страницу?',
      ok: {
        label: 'Да',
        flat: true
      },
      cancel: {
        label: 'Нет',
        outline: true
      }
    })
      .onOk(() => next())
      .onCancel(() => next(false))
  },
  components: { NoteForm }
}
</script>
