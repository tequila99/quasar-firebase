<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class='bg-white text-primary'>
      <q-toolbar>
        <q-btn
          flat
          round
          icon="menu"
          size='lg'
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Квазар.Проекты
        </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
        <q-btn icon='fas fa-sign-out-alt' size='lg' flat round class='q-mx-sm gt-xs' @click='logout'/>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item clickable v-ripple class='q-my-sm' to='/user/profile'>
          <q-item-section avatar>
            <q-avatar color='blue-grey-2'>
              <img v-if='user.photoURL' :src='user.photoURL' />
              <q-icon v-else name='fas fa-user' color='white'/>
            </q-avatar>
          </q-item-section>

        <q-item-section>
          <q-item-label class="bold">{{ user.displayName || "( Имя не задано )" }}</q-item-label>
          <q-item-label caption lines="1">{{ user.email }}</q-item-label>
        </q-item-section>
      </q-item>

      </q-list>
    </q-drawer>

    <q-page-container style='height: 100vh !important;'>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/currentUser'
    })
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout'
    })
  }
}
</script>

<style lang='scss'>
</style>
