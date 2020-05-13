<template>
  <q-dialog v-model="show_dialog" full-width persistent>
    <q-card>
      <q-bar>
        <div class="text-h6">Post</div>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup color="negative">
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-form @submit="storeBlog" @reset="onReset" class="q-gutter-md">
        <q-card-section class="q-pt-none">
          <div class="row q-pa-md q-gutter-sm">
            <div class="col">
              <div class="row q-pa-md q-gutter-sm">
                <div class="col">
                  <q-input
                    v-model="blogs.title"
                    label="Title"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  ></q-input>
                </div>
                <div class="col">
                  <q-input
                    v-model="blogs.post_by"
                    label="Post by"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  ></q-input>
                </div>
              </div>

              <div class="row q-pa-md q-gutter-sm">
                <div class="col item-content">
                  <q-editor
                    v-model="blogs.description"
                    placeholder="Description"
                    min-height="5rem"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="row q-pa-lg q-gutter-md">
            <div class="col item-content">
              <q-uploader
                multiple
                auto-upload
                label="Gallery"
                accept="image/*"
                ref="gallery"
                :factory="factoryFnGallery"
                class="full-width"
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
      show_dialog: false,
      blogs: {
        title: "",
        post_by: "",
        description: ""
      },
      formData: new FormData()
    };
  },
  methods: {
    showDialog() {
      this.show_dialog = true;
    },

    storeBlog() {
      let vm = this;
      if (vm.formData.has("galleries[]")) {
        vm.$q.loading.show();
        vm.$store.dispatch("blogs/storeBlog", vm.blogs).then(function(res) {
          vm.formData.set("blog_id", res.id);
          vm.$store
            .dispatch("blogs/storeBlogGallery", vm.formData)
            .then(function(res1) {
              vm.onReset();
              vm.$q.loading.hide();
            });
        });
      }
    },

    onReset() {
      let vm = this;
      let b = vm.blogs;

      b.title = "";
      b.post_by = "";
      b.description = "";

      for (let key of vm.formData.keys()) {
        // here you can add filtering conditions
        vm.formData.delete(key);
      }
      vm.show_dialog = false;
    },

    factoryFnGallery(file) {
      let vm = this;
      vm.formData.append("galleries[]", file[0]);
    }
  }
};
</script>