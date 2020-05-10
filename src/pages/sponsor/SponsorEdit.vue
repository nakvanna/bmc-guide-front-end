<template>
  <q-dialog v-model="show_dialog" full-width persistent>
    <q-card>
      <q-bar>
        <div class="text-h6">Update Sponsor</div>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup color="negative">
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-form @submit="updateSponsor" @reset="onReset" class="q-gutter-md">
        <q-card-section class="q-pt-none">
          <div class="row q-pa-md q-gutter-sm">
            <div class="col-3 q-pt-lg">
              <q-uploader
                v-show="is_upload"
                style="max-width: 300px"
                label="Sponsor Image រូបភាពបង្ហាញ"
                accept="image/*"
                ref="featuredImage"
                :factory="factoryFnThumbnail"
                class="full-width"
                hide-upload-btn
                auto-upload
              >
                <template v-slot:list="scope">
                  <q-list separator>
                    <q-item v-for="file in scope.files" :key="file.name">
                      <q-item-section>
                        <q-item-label class="full-width ellipsis">{{ file.name }}</q-item-label>

                        <q-item-label caption>Status: {{ file.__status }}</q-item-label>

                        <q-item-label caption>{{ file.__sizeLabel }} / {{ file.__progressLabel }}</q-item-label>
                      </q-item-section>

                      <q-item-section v-if="file.__img" thumbnail class="gt-xs">
                        <img :src="file.__img.src" />
                      </q-item-section>

                      <q-item-section top side>
                        <q-btn
                          class="gt-xs"
                          size="12px"
                          flat
                          dense
                          round
                          icon="delete"
                          @click="scope.removeFile(file)"
                        />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </template>
              </q-uploader>

              <q-card class="my-card" v-show="!is_upload">
                <q-img :src="sponsors.image" basic>
                  <div class="absolute-bottom text-h6">
                    <div class="row">
                      <q-btn
                        round
                        color="primary"
                        icon="cloud_upload"
                        @click="is_upload = !is_upload"
                      />
                    </div>
                  </div>
                </q-img>
              </q-card>
            </div>
            <div class="col">
              <div class="row q-pa-md q-gutter-sm">
                <div class="col">
                  <q-input
                    label="Sponsor Name"
                    v-model="sponsors.name"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  ></q-input>
                </div>
                <div class="col">
                  <q-input
                    label="Sponsor Price"
                    v-model="sponsors.price"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  ></q-input>
                </div>
              </div>

              <div class="row q-pa-md q-gutter-sm">
                <div class="col item-content">
                  <q-input
                    label="Description"
                    rows="2"
                    v-model="sponsors.description"
                    type="textarea"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />
                </div>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn label="Submit" type="submit" color="primary" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data() {
    return {
      is_upload: false,
      show_dialog: false,
      formData: new FormData(),
      sponsors: {
        id: null,
        image: null,
        name: null,
        price: 0,
        description: null
      }
    };
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.users.AppActiveUser;
    }
  },

  created() {
    // console.log(this.activeUserInfo);
  },

  methods: {
    showDialog(sponsor) {
      let sp = this.sponsors;
      console.log(sponsor);
      sp.id = sponsor.id;
      sp.image = sponsor.image;
      sp.name = sponsor.name;
      sp.price = sponsor.price;
      sp.description = sponsor.description;

      this.show_dialog = true;
    },
    factoryFnThumbnail(file) {
      let vm = this;
      vm.formData.set("image", file[0]);
    },
    updateSponsor() {
      let vm = this;
      vm.formData.set("user_id", vm.activeUserInfo.uid);
      vm.formData.set('id', vm.sponsors.id);
      vm.formData.set("name", vm.sponsors.name);
      vm.formData.set("price", vm.sponsors.price);
      vm.formData.set("description", vm.sponsors.description);
      vm.$q.loading.show();
      vm.$store
        .dispatch("sponsors/updateSponsor", vm.formData)
        .then(function(d) {
          vm.onReset();
          vm.show_dialog = false;
          vm.$q.loading.hide();
        });
    },
    onReset() {
      let vm = this;
      vm.sponsors.name = null;
      vm.sponsors.price = 0;
      vm.sponsors.description = null;
      vm.$refs.featuredImage.reset();
      for (let key of vm.formData.keys()) {
        // here you can add filtering conditions
        vm.formData.delete(key);
      }
    }
  }
};
</script>