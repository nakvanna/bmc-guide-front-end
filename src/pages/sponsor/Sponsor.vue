<template>
  <q-page>
    <div v-if="sponsors.length">
      <div class="q-pa-md">
        <q-list bordered separator>
          <q-item>
            <q-item-section class="text-bold">IMAGE</q-item-section>
            <q-item-section class="text-bold">NAME</q-item-section>
            <q-item-section class="text-bold">PRICE</q-item-section>
            <q-item-section class="text-bold">DESCRIPTION</q-item-section>
            <q-item-section class="text-bold">ACTION</q-item-section>
          </q-item>
          <q-item clickable v-ripple v-for="(sponsor, i) in sponsors" :key="i">
            <q-item-section>
              <q-avatar rounded>
                <img :src="baseUrl + sponsor.image" />
              </q-avatar>
            </q-item-section>
            <q-item-section>{{sponsor.name}}</q-item-section>
            <q-item-section>$ {{sponsor.price}}</q-item-section>
            <q-item-section>{{sponsor.description}}</q-item-section>
            <q-item-section>
              <div class="q-gutter-sm">
                <q-btn round color="primary" icon="edit" @click="$refs.sponsor_edit.showDialog(sponsor)"/>
                <q-btn round color="negative" icon="delete" @click="comfirmLocation(sponsor.id, i)"/>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn @click="$refs.sponsor_add.showDialog()" fab icon="add" color="primary" />
      </q-page-sticky>
    </div>
    <div v-else class="flex flex-center">
      <q-page class="flex flex-center">
        <h5 class="text-grey-6 text-bold">No data!</h5>
        <q-btn flat class="text-primary" @click="$refs.sponsor_add.showDialog()">Add New</q-btn>
      </q-page>
    </div>

    <sponsor-add ref="sponsor_add"></sponsor-add>
    <sponsor-edit ref="sponsor_edit"></sponsor-edit>

     <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6 text-negative">Delete comfirm!</div>
        </q-card-section>

        <q-card-section class="q-pt-none">Are you sure?</q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="No" color="primary" v-close-popup />
          <q-btn flat @click="deleteSponsor" label="Yes" color="negative" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import SponsorAdd from "./SponsorAdd";
import SponsorEdit from "./SponsorEdit";
import baseUrl from '../../boot/bash_image_url';
export default {
  components: {
    SponsorAdd, SponsorEdit, baseUrl
  },

  computed: {
    sponsors() {
      return this.$store.state.sponsors.sponsors;
    }
  },

  created(){
    console.log(baseUrl);
  },

  data() {
    return {
      baseUrl: "http://127.0.0.1:8000",
      alert: false,
      deleteData: {
        id: null, i: null, 
      }
    };
  },
  methods: {
    deleteSponsor(){
      this.$store.dispatch('sponsors/deleteSponsor', this.deleteData);
    },
    comfirmLocation(id, i) {
      this.alert = true;
      this.deleteData.id = id;
      this.deleteData.i = i;
    },
  }
};
</script>