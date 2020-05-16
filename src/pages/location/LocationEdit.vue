<template>
  <q-dialog v-model="show_dialog" full-width>
    <q-card>
      <q-card-section>
        <div class="text-h6">Edit Location Place</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit="updateLocation" @reset="onReset" class="q-gutter-md">
          <div class="row q-pa-md q-gutter-sm">
            <div class="col">
              <q-select
                bottom-slots
                v-model="locations.category"
                :options="categories"
                label="Category"
                @input="locations.sub_category = null"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please select something']"
              ></q-select>
            </div>
            <div class="col">
              <q-select
                bottom-slots
                v-model="locations.sub_category"
                :options="subCategories"
                label="Subcategory"
                @input="sub_cate_on_input = true"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please select something']"
              >
                <template v-slot:append>
                  <q-btn
                    round
                    dense
                    flat
                    icon="add"
                    @click.stop="$refs.add_travel_category.showDialog()"
                  />
                </template>
              </q-select>
            </div>
          </div>
          <div class="row q-pa-md q-gutter-sm">
            <div class="column items_center">
              <div class="col">
                <!-- <q-uploader
            v-model="locations.thumbnail"
            url="http://localhost:4444/upload"
            style="max-width: 300px"
                />-->
                <q-card class="my-card" v-show="is_upload">
                  <q-img :src="locations.thumbnail" basic width="200px">
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

                <q-uploader
                  v-show="!is_upload"
                  style="max-width: 300px"
                  label="Thumbnail រូបភាពបង្ហាញ"
                  accept="image/*"
                  ref="featuredImage"
                  :factory="factoryFnThumbnail"
                  class="full-width"
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
              </div>
            </div>

            <div class="col">
              <div class="row">
                <div class="col q-pl-md">
                  <q-input
                    v-model="locations.name"
                    label="Shop name *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />
                </div>
                <div class="col q-pl-md">
                  <q-input
                    v-model="locations.location_url"
                    label="Location URL *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col q-pl-md">
                  <q-input
                    v-model="locations.website"
                    label="Website *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />
                </div>
                <div class="col q-pl-md">
                  <q-input
                    v-model="locations.tel"
                    label="Tel *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col q-pl-md">
                  <q-input
                    v-model="locations.email"
                    label="E-mail *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />
                </div>
                <div class="col q-pl-md">
                  <q-select
                    label="Can do *"
                    v-model="locations.can_do"
                    use-input
                    use-chips
                    multiple
                    hide-dropdown-icon
                    input-debounce="0"
                    @new-value="createValue"
                  />
                  <!-- <q-input
                    v-model="locations.can_do"
                    label="Can do *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />-->
                </div>
              </div>
            </div>
          </div>
          <div class="row q-pa-md q-gutter-sm">
            <div class="col">
              <q-editor
                v-model="locations.about"
                :dense="$q.screen.lt.md"
                :toolbar="[
        [
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            list: 'only-icons',
            options: ['left', 'center', 'right', 'justify']
          },
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            options: ['left', 'center', 'right', 'justify']
          }
        ],
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['token', 'hr', 'link', 'custom_btn'],
        ['print', 'fullscreen'],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
              'p',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'code'
            ]
          },
          {
            label: $q.lang.editor.fontSize,
            icon: $q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          },
          {
            label: $q.lang.editor.defaultFont,
            icon: $q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'impact',
              'lucida_grande',
              'times_new_roman',
              'verdana'
            ]
          },
          'removeFormat'
        ],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

        ['undo', 'redo'],
        ['viewsource']
      ]"
                :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      }"
              />
            </div>
            <div class="col-5">
              <div class="q-gutter-sm row items-start" v-show="is_gallery_upload">
                <q-img
                  v-for="(img, i) in locations.gallery"
                  :key="i"
                  :src="img.galleries"
                  spinner-color="red"
                  style="height: 140px; max-width: 150px"
                >
                  <!-- <q-btn
                    @click.exact="deleteGallery($event, img.id, img.galleries)"
                    class="absolute all-pointer-events"
                    style="top: 8px; right: 8px"
                    round
                    color="red"
                    size="10px"
                  />-->
                  <q-icon
                   @click.exact="deleteGallery($event, img.id, img.galleries)"
                   class="absolute all-pointer-events"
                    style="top: 8px; right: 8px"
                    round
                    color="red"
                    size="20px"
                    name="delete"
                  />
                </q-img>

                <q-btn
                  style="height: 140px; max-width: 150px"
                  size="70px"
                  color="teal"
                  icon="cloud_upload"
                  @click="is_gallery_upload = !is_gallery_upload"
                />
              </div>

              <q-uploader
                v-show="!is_gallery_upload"
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

          <!-- <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>-->
          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn label="Update" type="submit" color="primary" />
          </q-card-actions>
          <travel-category ref="add_travel_category" :category="locations.category"></travel-category>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import TravelCategory from "pages/category/TravelCategory";

export default {
  components: {
    TravelCategory
  },

  computed: {
    filteredCategory() {
      let self = this;
      return this.$store.state.sub_categories.sub_categories.filter(function(
        x
      ) {
        return x.category === self.locations.category;
      });
    },
    subCategories() {
      let vm = this;
      return this.filteredCategory.map(function(e) {
        return {
          label: e.sub_category,
          value: e.id
        };
      });
    },
    activeUserInfo() {
      return this.$store.state.users.AppActiveUser;
    }
  },

  created() {
    this.$store.dispatch("sub_categories/fetchSubCategories");
  },

  data() {
    return {
      sub_cate_on_input: false,
      is_upload: true,
      is_gallery_upload: true,
      categories: [
        "ប្រាសាទ Temple",
        "ព្រៃភ្នំ Mountain",
        "សណ្ឋាគា Accommodation"
      ],
      show_dialog: false,

      locations: {
        id: null,
        name: null,
        category: null,
        sub_category: null,
        location_url: null,
        thumbnail: null,
        website: null,
        tel: null,
        email: null,
        can_do: null,
        about: "",
        gallery_id: "1",
        gallery: null
      },
      galleries: {
        location_id: null,
        gallery: null
      },

      formData: new FormData(),
      galleryData: new FormData()
    };
  },

  methods: {
    showDialog(location) {
      console.log(location);
      let vm = this.locations;
      this.is_upload = true;
      this.is_gallery_upload = true;

      vm.id = location.id;
      vm.name = location.name;
      vm.category = location.category;
      vm.sub_category = location.sub_category;
      vm.location_url = location.location_coord;
      vm.thumbnail = location.thumbnail;
      vm.website = location.website;
      vm.tel = location.tel;
      vm.email = location.email;
      vm.can_do = location.can_do.split(",");
      vm.about = location.about;
      vm.gallery_id = location.gallery_id;
      vm.gallery = location.gallery;

      this.show_dialog = true;
    },
    createValue(val, done) {
      // specific logic to eventually call done(...) -- or not
      done(val, "add-unique");
    },

    updateLocation() {
      let vm = this;

      vm.formData.set("id", vm.locations.id);
      vm.formData.set("name", vm.locations.name);
      vm.formData.set("user_id", vm.activeUserInfo.uid);
      vm.formData.set("category", vm.locations.category);

      if (vm.sub_cate_on_input == true) {
        vm.formData.set("sub_category", vm.locations.sub_category.label);
      } else {
        vm.formData.set("sub_category", vm.locations.sub_category);
      }

      vm.formData.set("location_coord", vm.locations.location_url);
      vm.formData.set("website", vm.locations.website);
      vm.formData.set("tel", vm.locations.tel);
      vm.formData.set("email", vm.locations.email);
      vm.formData.set("can_do", vm.locations.can_do);
      vm.formData.set("about", vm.locations.about);
      vm.formData.set("gallery_id", vm.locations.gallery_id);
      vm.$q.loading.show();
      vm.$store
        .dispatch("locations/updateLocation", vm.formData)
        .then(function(data) {
          if (vm.is_gallery_upload == false) {
            vm.galleryData.set("location_id", vm.locations.id);
            vm.$store
              .dispatch("locations/updateGallery", vm.galleryData)
              .then(function(data1) {
                for (let key of vm.formData.keys()) {
                  // here you can add filtering conditions
                  vm.formData.delete(key);
                }
                for (let key of vm.galleryData.keys()) {
                  vm.galleryData.delete(key);
                }
                vm.$q.loading.hide();
                vm.onReset();
                vm.$refs.featuredImage.reset();
                vm.$q.loading.hide();
                vm.$q.notify({
                  message: "Data was updated!",
                  position: "top",
                  color: "positive"
                });
                vm.$refs.gallery.reset();
                vm.show_dialog = false;
              });
          } else {
            for (let key of vm.formData.keys()) {
              // here you can add filtering conditions
              vm.formData.delete(key);
            }
            for (let key of vm.galleryData.keys()) {
              vm.galleryData.delete(key);
            }
            vm.$q.loading.hide();
            vm.onReset();
            vm.$refs.featuredImage.reset();
            vm.$q.loading.hide();
            vm.$q.notify({
              message: "Data was updated!",
              position: "top",
              color: "positive"
            });
            vm.$refs.gallery.reset();
            vm.show_dialog = false;
          }
        });
    },

    deleteGallery(e, id, path) {
      // console.log(e);
      e.path[2].remove();
      this.$store.dispatch("galleries/deleteGallery", { id: id, path: path });
    },

    factoryFnThumbnail(file) {
      let vm = this;
      vm.formData.set("thumbnail", file[0]);
    },

    factoryFnGallery(file) {
      let vm = this;
      vm.galleryData.append("galleries[]", file[0]);
    },

    onReset() {
      let data = this.locations;
      data.name = null;
      data.location_url = null;
      data.thumbnail = null;
      data.website = null;
      data.tel = null;
      data.email = null;
      data.can_do = null;
      data.about = "";
      data.gallery_id = null;
      data.category = null;
    }
  }
};
</script>