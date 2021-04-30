<template lang='pug'>
  div.upload-avatar
    q-avatar.relative(
      round
      color='blue-grey-2'
      size='140px'
      text-color='white'
      style='border: 5px solid white;')
        q-croppa(
          v-model='croppa'
          :width='140'
          :height='140'
          prevent-white-space
          :show-remove-button='false'
          remove-button-color='grey'
          @init='onInit'
        )
          img(
            crossOrigin='anonymous'
            :src='photoUrl'
            slot="initial"
          )
    q-btn.absolute-top-right(
      flat round icon='far fa-times-circle'
      color='primary'
    )
</template>

<script>
export default {
  name: 'UploadAvatar',
  props: {
    photoURL: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      croppa: {}
    }
  },
  watch: {},
  computed: {},
  methods: {
    onInit () {
      this.croppa.addClipPlugin(function (ctx, x, y, w, h) {
        /*
         * ctx: canvas context
         * x: start point (top-left corner) x coordination
         * y: start point (top-left corner) y coordination
         * w: croppa width
         * h: croppa height
        */
        console.log(x, y, w, h)
        ctx.beginPath()
        ctx.arc(x + w / 2, y + h / 2, w / 2, 0, 2 * Math.PI, true)
        ctx.closePath()
      })
    }
  },
  created () {},
  mounted () {},
  components: {}
}
</script>

<style lang='scss'>
.upload-avatar .croppa-container {
  background-color: transparent;
}
.upload-avatar .q-avatar__content {
  overflow: visible !important;
}
.upload-avatar .croppa-container svg.icon-remove {
  filter: none im !important;
  border: 1px solid white !important;
}
</style>
