<template lang='pug'>
  q-card.profile.relative(flat)
    q-img(
      src='~assets/material.png'
       style='height: 150px;'
      )
      .croppa-toolbar.absolute-top.transparent(v-if='isCroppa')
        q-btn.q-ml-none(
          flat
          text-color='primary'
          size='md' no-caps
          round
          icon="o_done"
          @click='handleUploadImage'
        )
        q-btn.q-ml-none(
          flat
          text-color='primary'
          size='md' no-caps
          round
          icon="o_rotate_right"
          @click='handleRotateImage'
        )
        q-btn.q-ml-none(
          flat
          text-color='secondary'
          size='md' no-caps
          round
          icon="o_delete"
          @click='handleClearImage'
        )
    .profile__photo
      q-avatar.user-avatar.absolute(round color='blue-grey-2' size='140px'  text-color='white' style='border: 5px solid white;')
        img(v-if='photoURL' :src='photoURL')
        q-icon(v-else name='far fa-user')
      //- upload-avatar(
        :photoURL='photoURL'
      //- )
      q-croppa.upload-avatar(
        ref='croppa'
        accept='image/*'
        v-model='croppa'
        :width='140'
        :height='140'
        prevent-white-space
        placeholder=''
        :show-remove-button='false'
        @init='onInit'
        @new-image-drawn='isCroppa=true'
        @image-remove='isCroppa=false'
        @loading-start='isLoading=true'
        @loading-end='isLoading=false'
      )
    q-card-section.profile__section.q-mt-xl
      q-form.q-px-lg.full-height.column.q-gutter-y-md(@submit='saveUserData')
        q-input(
          v-model="email"
          outlined
          color="primary"
          label='E-Mail'
          disable
          )
            template(v-slot:prepend)
              q-icon(name='far fa-envelope')
        q-input(
          v-model="displayName"
          outlined
          color="primary"
          label='Отображаемое имя'
          placeholder='Иван Иванов'
          )
            template(v-slot:prepend)
              q-icon(name='far fa-user')
        q-input(
          v-model="phoneNumber"
          outlined
          color="primary"
          label='Номер сотового телефона'
          prefix='+7'
          mask='(###) ###-##-##'
          )
            template(v-slot:prepend)
              q-icon(name='fas fa-phone')
        q-btn.full-width.q-mt-lg(
          color="primary"
          data-cy="submit"
          padding="md xs"
          type="submit"
          icon='fas fa-check'
          label="Сохранить данные пользователя"
        )
    //- q-dialog(
      v-model="photoUpload" transition-hide="scale" transition-show="scale" @before-hide="resetPhotoType"
      )
      //- fbq-uploader.q-my-lg(
         label="Please Upload a Photo"
          :meta="meta"
          :prefixPath="prefixPath"
          @uploaded="uploadComplete"
        )
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { loadingSpinner } from '../../mixins'
// import firebase from '../../boot/firebase'
import { uid } from 'quasar'

export default {
  mixins: [loadingSpinner],
  name: 'UserProfile',
  data () {
    return {
      email: '',
      displayName: '',
      phoneNumber: '',
      photoType: '',
      photoUpload: false,
      photoURL: '',
      croppa: {},
      isCroppa: false
    }
  },
  watch: {
    user (value) {
      this.email = value?.email || ''
      this.displayName = value?.displayName || ''
      this.phoneNumber = (this.user?.phoneNumber || '').replace('+7', '')
      this.photoURL = this.user?.photoURL
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/currentUser'
    })
  },
  methods: {
    ...mapActions({
      update: 'user/updateUserData',
      showError: 'logs/showError'
    }),
    handleUploadImage () {
      this.croppa.generateBlob(blob => {
        const ref = this.$fb.storage().ref().child(uid())
        ref.put(blob).then(snapshot => {
          console.log(snapshot)
        }).catch(error => {
          this.showError(error)
        })
      })
    },
    handleClearImage () {
      this.$refs.croppa.remove()
    },
    handleRotateImage () {
      this.$refs.croppa.rotate()
    },
    onInit () {
      this.croppa.addClipPlugin(function (ctx, x, y, w, h) {
        ctx.beginPath()
        ctx.arc(x + w / 2, y + h / 2, w / 2, 0, 2 * Math.PI, true)
        ctx.closePath()
      })
    },
    async saveUserData () {
      this.isLoading = true
      try {
        await this.update({
          id: this.user.id,
          email: this.email,
          displayName: this.displayName,
          phoneNumber: `+7${this.phoneNumber.replace(/[^0-9]/g, '')}`
        })
      } catch (err) {
        this.showError(err)
      } finally {
        this.isLoading = false
      }
    }
  },
  mounted () {
    this.email = this.user?.email || ''
    this.displayName = this.user?.displayName || ''
    this.photoURL = this.user?.photoURL
    this.phoneNumber = (this.user?.phoneNumber || '').replace('+7', '')
  }
}
</script>

<style lang="scss">
.profile {
  margin: auto;
  max-width: 1024px;
  width: 100%;
  height: 100%;
  &__photo {
    top: 20px;
    left: 20px;
    border-radius: 50% !important;
    overflow: hidden;
    background-color: white;
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    width: 146px;
    height: 146px;;
  }
  &__section {
    max-width: 650px;
    margin: 30px auto 0 auto;
  }
}
.croppa-container {
  background-color: transparent;
  align-self: center;
}
.croppa-toolbar {
  left: 140px;
}
.user-avatar {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: 3px solid !important;
}
</style>
