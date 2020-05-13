<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>{{title}}</q-toolbar-title>

        <div>
          <q-btn @click="alert = true" flat color="negative" icon="exit_to_app" label="Loguot" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" :width="200" :breakpoint="400">
      <q-scroll-area
        style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd"
      >
        <q-list padding>
          <q-item clickable v-ripple to="/" exact>
            <q-item-section avatar>
              <q-icon name="map" />
            </q-item-section>

            <q-item-section>Location</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/sponsor" exact>
            <q-item-section avatar>
              <q-icon name="stars" />
            </q-item-section>

            <q-item-section>Sponsor</q-item-section>
          </q-item>
          
          <q-item clickable v-ripple to="/blog" exact>
            <q-item-section avatar>
              <q-icon name="collections" />
            </q-item-section>

            <q-item-section>Blog</q-item-section>
          </q-item>
          
          <q-item clickable v-ripple to="/service" exact>
            <q-item-section avatar>
              <q-icon name="airplanemode_active" />
            </q-item-section>

            <q-item-section>Service</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/user" exact>
            <q-item-section avatar>
              <q-icon name="people" />
            </q-item-section>

            <q-item-section>User</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold text-uppercase	">{{ displayName.displayName }}</div>
          <div>@BMC-Guide</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6 text-negative">Log out comfirm!</div>
        </q-card-section>

        <q-card-section class="q-pt-none">Are you sure?</q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="No" color="primary" v-close-popup />
          <q-btn flat @click="logout" label="Yes" color="negative" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { LocalStorage } from "quasar";

export default {
  computed: {
    title() {
      return this.$route.name;
    },
    activeUserInfo() {
      return this.$store.state.users.AppActiveUser;
    },
    displayName(){
      return LocalStorage.getItem("userInfo").user_info;
    }
  },

  async created() {
    let vm = this;
    const token = LocalStorage.getItem("userInfo");
    if (token) {
      await vm.$store.dispatch("users/updateUserData", token);
    }
   
   this.$store.dispatch("locations/fetchLocations");
   this.$store.dispatch("users/fetchUsers");
   this.$store.dispatch("categories/fetchCategories");
   this.$store.dispatch("sponsors/fetchSponsor");
   this.$store.dispatch("blogs/fetchBlogs");
  },
  methods: {
    logout() {
      LocalStorage.remove("userInfo");
      this.$router.push("/login");
    }
  },

  name: "MainLayout",

  data() {
    return {
      alert: false,
      leftDrawerOpen: false,
    };
  }
};
</script>
