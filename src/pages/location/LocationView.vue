<template>
  <q-dialog v-model="show_dialog" full-width>
    <q-card>
      <q-card-section>
        <div class="text-h6">View Location</div>
      </q-card-section>

      <div class="row q-pa-sm">
        <div class="col-2">
          <q-card class="width: 100% max-width: 250px">
            <q-img :src="baseUrl + locations.thumbnail" basic>
              <div class="absolute-bottom text-h6">Thumbnail</div>
            </q-img>
          </q-card>
        </div>
      </div>
      <div class="row">
        <div class="col text-center">
          <h4>
            <u>{{locations.name}}</u>
          </h4>
        </div>
      </div>
      <q-separator />
      <div class="row">
        <div class="col-4">
          <ul>
            <li class="q-pb-md">Category: <span class="text-bold">{{ locations.category }}</span></li>
            <li class="q-pb-md">Sub Category: <span class="text-bold">{{ locations.sub_category }}</span></li>
            <li class="q-pb-md">Location: <span class="text-bold">{{ locations.location_coord }}</span></li>
            <li class="q-pb-md">Website: <span class="text-bold">{{ locations.website }}</span></li>
            <li class="q-pb-md">Tel: <span class="text-bold">{{ locations.tel }}</span></li>
            <li class="q-pb-md">E-mail: <span class="text-bold">{{ locations.email }}</span></li>
            <li class="q-pb-md">Can do: <span class="text-bold">{{ locations.can_do }}</span></li>
          </ul>
        </div>
        <div class="col">
          <div class="q-pa-md">
            <div class="q-gutter-sm row items-start">
              <q-img
                v-for="(img, i) in locations.gallery"
                :key="i"
                :src="baseUrl + img.galleries"
                spinner-color="red"
                style="height: 140px; max-width: 150px"
              />
            </div>
          </div>
        </div>
      </div>
      <q-separator />
      <div class="row q-pa-md" v-html="locations.about"></div>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  data() {
    return {
      baseUrl: "http://127.0.0.1:8000",
      show_dialog: false,
      url: "https://placeimg.com/500/300/nature",
      locations: {
        name: null,
        category: null,
        sub_category: null,
        location_coord: null,
        thumbnail: null,
        website: null,
        tel: null,
        email: null,
        can_do: null,
        about: "",
        gallery_id: "",
        gallery: []
      }
    };
  },
  methods: {
    showDialog(location) {
      console.log(location.gallery);
      let vm = this.locations;
      this.show_dialog = true;
      vm.name = location.name;
      vm.category = location.category;
      vm.sub_category = location.sub_category;
      vm.location_coord = location.location_coord;
      vm.website = location.website;
      vm.tel = location.tel;
      vm.email = location.email;
      vm.can_do = location.can_do;
      vm.about = location.about;
      vm.thumbnail = location.thumbnail;
      vm.gallery = location.gallery;
    }
  }
};
</script>