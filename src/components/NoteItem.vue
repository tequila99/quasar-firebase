<template lang='pug'>
  .tw-max-w-2xl.tw-px-8.tw-py-3.tw-mx-auto.tw-bg-gray-50.tw-rounded-md.tw-shadow-md
    .tw-flex.tw-items-center
      span.tw-text-xs.tw-font-light.tw-text-gray-600 обновлено {{ relativeDate(value.updatedAt) }} назад
    .tw-mt-2
      .tw-truncate.tw-mb-2
        //- a.tw-text-xl.tw-font-bold.tw-text-gray-700(href='#') {{ value.title }}
        router-link.tw-text-xl.tw-font-bold.tw-text-gray-700(:to='`/notes/${value.id}`')  {{ value.title }}
        //- a.tw-text-xl.tw-font-bold.tw-text-gray-700(:to='`/notes/${value.id}`')  {{ value.title }}
          q-tooltip {{ value.title }}
      p.tw-text-gray-600.ellipsis-3-lines {{ value.text }}
    .tw-mt-4.tw-flex(v-if='tags.length')
      q-chip(
        v-for='tag in tags'
        :key='tag'
        :label='tag'
        outline
        square
        color='primary'
        size='0.7rem'
        clickable
        @click='$emit("tag", tag)'
      )
    .tw-mt-4.tw-flex.tw-items-center.tw-justify-between
      .tw-flex.tw-items-center
        q-avatar(
          color='blue-grey-2'
          text-color='white'
          size='md'
        )
          img(v-if='value.owner.photoURL' :src='value.owner.photoURL')
        span.gt-md.tw-ml-2.tw-text-xs.tw-font-light.tw-text-gray-600 {{ value.owner.displayName}}
      div(class='tw-flex tw-items-center tw-justify-end')
        q-btn(
          v-if='isOwner&&false'
          color='primary'
          flat
          round
          size='md'
          icon='o_edit'
        )
        q-btn.q-ml-xs(
          color='primary'
          flat
          round
          size='md'
          icon='o_chat_bubble_outline'
        )
        q-btn.q-ml-xs(
          color='primary'
          flat
          round
          size='md'
          icon='o_attach_file'
        )
        q-btn.q-ml-xs(
          v-if='isOwner'
          color='primary'
          flat
          round
          size='md'
          icon='o_share'
        )
        q-btn.q-ml-xs(
          v-if='isOwner'
          color='primary'
          flat
          round
          size='md'
          icon='o_delete'
          @click='$emit("delete", value.id)'
        )
      //- .tw-flex.tw-item-center
        img.tw-hidden.tw-object-cover.tw-w-10.tw-h-10.tw-mx-4.tw-rounded-full(
          src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80"
          alt="avatar"
        )
        a.tw-font-bold.tw-text-gray-700.tw-cursor-pointer Khatab wedaa
</template>

<script>
import { formatDistanceToNow } from 'date-fns'
import ruLocale from 'date-fns/locale/ru'
import { mapGetters } from 'vuex'
export default {
  name: 'NoteItem',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

    }
  },
  watch: {},
  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser'
    }),
    isOwner () {
      return this.currentUser.id === this.value.owner.id
    },
    tags () {
      return this.value.tags && Array.isArray(this.value.tags) ? this.value.tags : []
    }
  },
  methods: {
    relativeDate (value) {
      return formatDistanceToNow(value, { locale: ruLocale })
    }
  },
  created () {},
  mounted () {},
  components: {}
}
</script>
