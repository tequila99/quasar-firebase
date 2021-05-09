<template lang='pug'>
  q-page
    note-form(:value='currentNote' @input='handleSaveNote')
</template>

<script>
import NoteForm from 'components/NoteForm'
import { mapActions } from 'vuex'
export default {
  name: 'AddNote',
  props: {},
  data () {
    return {
      actionComplete: false,
      currentNote: {
        title: '',
        text: '',
        createdAt: 0,
        updatedAt: 0
      }
    }
  },
  watch: {},
  computed: {
  },
  methods: {
    ...mapActions({
      add: 'notes/addNoteData',
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
  created () {},
  mounted () {},
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

<style lang='scss' scoped>
</style>
