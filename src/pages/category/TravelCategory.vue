<template>
  <div>
    <q-dialog v-model="show_dialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Category</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            autofocus
            v-model="data.sub_category"
            label="New Category"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Add" @click="storeSubCategory()" v-close-popup />
        </q-card-actions>

        <q-list bordered class="rounded-borders">
          <q-item-label header>List of Categories</q-item-label>

          <q-item v-for="(item, i) in subCategories" :key="i">
            <q-item-section top>
              <q-item-label class="text-black text-bold" caption lines="1">{{ item.sub_category }}</q-item-label>
            </q-item-section>

            <q-item-section top side>
              <div class="text-black q-gutter-xs">
                <q-btn
                  class="gt-xs"
                  size="12px"
                  flat
                  dense
                  round
                  icon="delete"
                  @click="alert = true"
                />
              </div>
              <q-dialog v-model="alert">
                <q-card>
                  <q-card-section>
                    <div class="text-h6 text-negative">Delete comfirm!</div>
                  </q-card-section>

                  <q-card-section
                    class="q-pt-none"
                  >
                    Are you sure?
                  </q-card-section>

                  <q-card-actions align="right">
                    <q-btn flat label="No" color="primary" v-close-popup />
                    <q-btn flat @click="deleteSubCategory(item.id, i)" label="Yes" color="negative" v-close-popup />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: ["category"],
  data() {
    return {
      alert: false,
      show_dialog: false,
      data: {
        category: "",
        sub_category: ""
      }
    };
  },
  computed: {
    subCategories() {
      return this.$store.state.sub_categories.sub_categories;
    }
  },
  created() {},
  methods: {
    showDialog() {
      this.show_dialog = true;
    },
    storeSubCategory() {
      let vm = this;
      this.data.category = this.category;
      
      if (this.data.category != "") {
        this.$store
          .dispatch("sub_categories/storeSubCategory", this.data)
          .then(function(res) {
            vm.data = {
              category: "",
              sub_category: ""
            };
          });
      }
    },
    deleteSubCategory(id, i) {
      this.$store.dispatch("sub_categories/deleteSubCategory", { id, i });
    }
  }
};
</script>