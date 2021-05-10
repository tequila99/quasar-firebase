<template lang='pug'>
  q-page
    note-form(:value='note' @input='handleSaveNote')
</template>

<script>
import NoteForm from 'components/NoteForm'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'EditNote',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      actionComplete: false
    }
  },
  watch: {},
  computed: {
    ...mapGetters({
      listNotes: 'notes/listNotes'
    }),
    note () {
      return this.listNotes.find(el => el.id === this.id) || { title: '', text: '' }
    }
  },
  methods: {
    ...mapActions({
      update: 'notes/updateNote',
      showError: 'logs/showError'
    }),
    async handleSaveNote (note) {
      this.isLoading = true
      try {
        await this.update({ id: this.id, ...note })
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
  // beforeRouteLeave (to, from, next) {
  //   if (this.actionComplete) return next()
  //   this.$q.dialog({
  //     title: 'Подтвердите действие',
  //     message: 'Данные не сохранены. Вы действительно хотите покинуть страницу?',
  //     ok: {
  //       label: 'Да',
  //       flat: true
  //     },
  //     cancel: {
  //       label: 'Нет',
  //       outline: true
  //     }
  //   })
  //     .onOk(() => next())
  //     .onCancel(() => next(false))
  // },
  components: { NoteForm }
}
</script>

<style lang='scss' scoped>
</style>
