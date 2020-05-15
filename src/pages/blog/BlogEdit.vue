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

      <q-form @submit="updateBlog" @reset="onReset" class="q-gutter-md">
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

          <div class="q-gutter-sm q-pa-lg row items-start" v-show="is_blog_gallery">
            <q-img
              v-for="(img, i) in blogs.blog_gallery"
              :key="i"
              :src="img.gallery"
              spinner-color="red"
              style="height: 140px; max-width: 150px"
            >
              <q-btn
                @click.stop="deleteGallery(i, img.id, img.gallery)"
                class="absolute all-pointer-events"
                style="top: 8px; right: 8px"
                round
                color="red"
                size="10px"
                icon="clear"
              />
            </q-img>

            <q-btn
              style="height: 140px; width: 150px"
              size="70px"
              color="teal"
              icon="cloud_upload"
              @click="is_blog_gallery = !is_blog_gallery"
            />
          </div>

          <div v-show="!is_blog_gallery" class="row q-pa-lg q-gutter-md">
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
        id: "",
        title: "",
        post_by: "",
        description: "",
        blog_gallery: []
      },
      formData: new FormData(),
      is_blog_gallery: true
    };
  },
  methods: {
    showDialog(blog) {
      let b = this.blogs;
      b.id = blog.id;
      b.title = blog.title;
      b.post_by = blog.post_by;
      b.description = blog.description;
      b.blog_gallery = blog.blog_gallery;
      console.log(blog);
      this.show_dialog = true; //Upload or not
    },

    updateBlog() {
      let vm = this;

      vm.$q.loading.show();
      vm.$store.dispatch("blogs/updateBlog", vm.blogs).then(function(res) {
        if (vm.is_blog_gallery === false) {
          vm.formData.set("blog_id", vm.blogs.id);
          vm.$store
            .dispatch("blogs/updateBlogGallery", vm.formData)
            .then(function(res1) {
              vm.onReset();
              vm.$q.loading.hide();
              vm.is_blog_gallery = false;
            });
        } else {
          vm.onReset();
          vm.$q.loading.hide();
          vm.is_blog_gallery = false;
        }
      });
    },

    deleteGallery(i, id, path) {
        // console.log(this.blogs)
      this.blogs.blog_gallery.splice(i, 1);
        this.$store.dispatch("blogs/deleteBlogGallery", { id: id, path: path });
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