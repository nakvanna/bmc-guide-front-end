import Vue from 'vue'
import Vuex from 'vuex'

import locations from './store_location'
import categories from './store_category'
import galleries from './store_gallery'
import sub_categories from './store_sub_category'
import users from './store_user'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      locations, categories, galleries, sub_categories, users
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
