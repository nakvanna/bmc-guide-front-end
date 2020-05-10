<template>
  <div class="q-pa-md">
    <div v-if="locations.length">
      <!-- <div class="row q-pb-lg">
        <div class="col-12 col-md-4">
          <q-btn
            color="primary"
            icon="add"
            label="Add New"
            @click="$refs.location_add.showDialog()"
          />
        </div>
      </div> -->

      <q-list bordered class="q-pa-lg rounded-borders">
        <q-item-label header>List of Items</q-item-label>
        <q-item v-for="(location, i) in locations" :key="i">
          <!-- <h2>{{ baseUrl + location.thumbnail }}</h2> -->
          <q-item-section avatar top>
            <q-avatar size="75px">
              <img :src="location.thumbnail" />
            </q-avatar>
          </q-item-section>

          <q-item-section top>
            <q-item-label lines="1">
              <span class="text-weight-medium">{{ location.name }}</span>
              <span class="text-grey-8"> {{ location.sub_category }}</span>
            </q-item-label>
            <q-item-label caption lines="1">
              <!-- <div v-html="location.about"></div> -->
              {{location.category}}
            </q-item-label>
            <q-item-label
              lines="1"
              class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase"
            >
              <span
                class="cursor-pointer"
                @click="$refs.location_view.showDialog(location)"
              >Read more...</span>
            </q-item-label>
          </q-item-section>

          <q-item-section top side>
            <div class="text-grey-8 q-gutter-xs">
              <q-btn
                @click="$refs.location_edit.showDialog(location)"
                color="primary"
                class="gt-xs"
                size="18px"
                flat
                dense
                round
                icon="edit"
              />
              <q-btn
                @click="comfirmLocation(location.id, i, location.gallery)"
                class="gt-xs"
                size="18px"
                color="red"
                flat
                dense
                round
                icon="delete"
              />
            </div>
          </q-item-section>
        </q-item>
        <!-- <q-separator spaced /> -->
      </q-list>

      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn @click="$refs.location_add.showDialog()" fab icon="add" color="primary" />
      </q-page-sticky>
    </div>
    <div v-else>
      <q-page class="flex flex-center">
        <h5 class="text-grey-6 text-bold">No data!</h5>
        <q-btn flat class="text-primary" @click="$refs.location_add.showDialog()">Add New</q-btn>
      </q-page>
    </div>

    <location-add ref="location_add"></location-add>
    <location-edit ref="location_edit"></location-edit>
    <location-view ref="location_view"></location-view>

    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6 text-negative">Delete comfirm!</div>
        </q-card-section>

        <q-card-section class="q-pt-none">Are you sure?</q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="No" color="primary" v-close-popup />
          <q-btn flat @click="deleteLocation" label="Yes" color="negative" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import LocationAdd from "./LocationAdd";
import LocationEdit from "./LocationEdit";
import LocationView from "./LocationView";

export default {
  components: {
    LocationAdd,
    LocationView,
    LocationEdit
  },

  computed: {
    locations() {
      return this.$store.state.locations.locations;
    }
  },

  created() {
    // this.$store.dispatch("locations/fetchLocations");
  },

  data() {
    return {
      alert: false,
      deleteData: {
        id: null,
        i: null,
        gallery: []
      }
    };
  },
  methods: {
    comfirmLocation(id, i, gallery) {
      this.alert = true;
      this.deleteData.id = id;
      this.deleteData.i = i;
      this.deleteData.gallery = gallery;
    },

    deleteLocation() {
      let vm = this;
      vm.$store
        .dispatch("locations/deleteLocation", vm.deleteData)
        .then(function(data) {
          if (data == true) {
            for (let i = 0; i < vm.deleteData.gallery.length; i++) {
              vm.$store.dispatch("galleries/deleteGallery", {
                id: vm.deleteData.gallery[i].id,
                path: vm.deleteData.gallery[i].galleries
              });
            }
          }
        });
    }
  }
};
</script>