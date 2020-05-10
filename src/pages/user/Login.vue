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
                  :rules="[val => !!val || 'Email is missing', isValidEmail]"
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
    isValidEmail(val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || "Invalid email";
    },
    login() {
      let vm = this;
      vm.$store.dispatch("users/login", this.data).then(function(res) {
        vm.$router.push("/");
      });
    }
  }
};
</script>

<style>
.q-card {
  width: 360px;
}
</style>