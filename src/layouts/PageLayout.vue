<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class='bg-white text-primary'>
      <q-toolbar>
        <q-btn
          flat
          round
          icon="fas fa-arrow-left"
          size='md'
          color='secondary'
          @click='handleBack'
        />

        <q-toolbar-title class='text-secondary'>
          {{ $route.name }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container style='height: 100vh !important;'>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'PageLayout',
  data () {
    return {
      createUser: false
    }
  },
  methods: {
    handleBack () {
      if (this.createUser) {
        this.$router.push({ path: '/' })
      } else {
        this.$router.go(-1)
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.createUser = from.matched.some(route => route.path === '/auth')
    })
  }
}
</script>

<style lang='scss'>
</style>
