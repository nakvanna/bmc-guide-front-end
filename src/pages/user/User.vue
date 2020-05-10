<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered separator>
        <q-item>
          <q-item-section class="text-bold">USERNAME</q-item-section>
          <q-item-section class="text-bold">E-MAIL</q-item-section>
          <q-item-section class="text-bold">TYPE</q-item-section>
          <q-item-section class="text-bold">Active</q-item-section>
        </q-item>
        <q-item clickable v-ripple v-for="(user, i) in users" :key="i">
          <q-item-section> {{user.name}} </q-item-section>
          <q-item-section> {{user.email}} </q-item-section>
          <q-item-section> {{user.type_user === 1 ? "Admin": "User"}} </q-item-section>
          <q-item-section v-if="user.status === true" class="text-primary"> ACTIVE </q-item-section>
          <q-item-section v-else class="text-negative"> INACTIVE </q-item-section>
        </q-item>
      </q-list>

    </div>
  </q-page>
</template>

<script>
export default {
  computed: {
    users() {
      return this.$store.state.users.users;
    }
  },
  created() {
    // this.$store.dispatch("users/fetchUsers");
  }
};
</script>