<template>
  <q-page class="bg-grey-6 window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md text-bold">Tourism Login</h5>
      </div>
      <div class="row">
        <q-form @submit="login()">
          <q-card square bordered class="q-pa-xs shadow-1">
            <q-card-section>
              <div class="q-gutter-xs">
                <q-input
                  square
                  filled
                  clearable
                  v-model="data.email"
                  type="email"
                  label="E-mail"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type your E-mail!']"
                />
                <q-input
                  square
                  filled
                  clearable
                  v-model="data.password"
                  type="password"
                  label="Password"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type your password!']"
                />
              </div>
            </q-card-section>
            <q-card-actions class="q-px-md">
              <q-btn
                unelevated
                type="submit"
                color="primary"
                size="lg"
                class="full-width"
                label="Login"
              />
            </q-card-actions>
            <q-card-section class="text-center q-pa-none">
              <p class="text-grey-6">Not reigistered? Created an Account</p>
            </q-card-section>
          </q-card>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      data: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      let vm = this;
      vm.$store.dispatch('users/login', this.data).then(function(res){
        vm.$router.push('/location');
      })
    }
  }
};
</script>

<style>
.q-card {
  width: 360px;
}
</style>