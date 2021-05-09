<template lang='pug'>
  q-page.tw-relative(class='md:tw-px-xl')
    q-scroll-area.tw-absolute.tw-h-full.tw-w-full.tw-mw-2xl
      q-list.q-mt-md.q-px-md(separator)
        transition-group(
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
        )
        note-item(v-for='note in listNotes' :key='note.id' :value='note')
      q-page-sticky(position='bottom-right' :offset='fabPos')
        q-fab(
          icon='o_add'
          color="primary"
          :disable="draggingFab"
          v-touch-pan.prevent.mouse='moveFab'
        )
</template>

<script>
import NoteItem from 'components/NoteItem'
import { mapGetters } from 'vuex'
export default {
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
    moveFab (e) {
      this.draggingFab = e.isFirst !== true && e.isFinal !== true
      this.fabPos = [
        this.fabPos[0] - e.delta.x,
        this.fabPos[1] - e.delta.y
      ]
    }
  },
  created () {},
  mounted () {},
  components: { NoteItem }
}
</script>

<style lang='scss' scoped>
</style>
