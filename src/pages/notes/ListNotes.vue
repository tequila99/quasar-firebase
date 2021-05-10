<template lang='pug'>
  q-page.tw-relative(class='md:tw-px-xl')
    q-scroll-area.tw-absolute.tw-h-full.tw-w-full.tw-mw-2xl
      q-list.q-mt-md.q-px-md(separator padding)
        transition-group(
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
        )
        note-item.tw-mt-4(
          v-for='note in listNotes'
          :key='note.id'
          :value='note'
          @delete='handleDelete'
          @tag='handleTag'
        )
      q-page-sticky(position='bottom-right' :offset='fabPos')
        q-fab(
          icon='o_add'
          color="primary"
          :disable="draggingFab"
          v-touch-pan.prevent.mouse='moveFab'
          @click='handleAdd'
        )
</template>

<script>
import NoteItem from 'components/NoteItem'
import { mapGetters, mapActions } from 'vuex'
import { loadingSpinner } from 'src/mixins'
export default {
  mixins: [loadingSpinner],
  name: 'NotesList',
  props: {},
  data () {
    return {
      fabPos: [36, 18],
      draggingFab: false
    }
  },
  watch: {},
  computed: {
    ...mapGetters({
      listNotes: 'notes/listNotes'
    })
  },
  methods: {
    ...mapActions({
      delete: 'notes/delNoteData',
      showError: 'logs/showError'
    }),
    moveFab (e) {
      this.draggingFab = e.isFirst !== true && e.isFinal !== true
      this.fabPos = [
        this.fabPos[0] - e.delta.x,
        this.fabPos[1] - e.delta.y
      ]
    },
    handleAdd () {
      this.$router.push('/notes/add')
    },
    handleTag (tag) {
      console.log(tag)
    },
    handleDelete (id) {
      this.$q.dialog({
        title: 'Подтвердите действие',
        message: 'Вы действительно хотите удалить эту заметку?',
        ok: {
          label: 'Да',
          flat: true
        },
        cancel: {
          label: 'Нет',
          outline: true
        }
      }).onOk(async () => {
        try {
          this.delete({ id })
        } catch (err) {
          this.showError(err)
        } finally {
          this.isLoading = false
        }
      })
    }
  },
  created () {},
  mounted () {},
  components: { NoteItem }
}
</script>

<style lang='scss' scoped>
</style>
