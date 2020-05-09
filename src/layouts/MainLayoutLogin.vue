<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  computed : {
    title(){
      return this.$route.name;
    },
  },
  name: 'MainLayoutLogin',

  data () {
    return {
      leftDrawerOpen: false,
    }
  }
}
</script>
