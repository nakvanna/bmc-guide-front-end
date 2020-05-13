<template>
  <q-dialog v-model="show_dialog" full-width>
    <q-card>
      <q-bar>
        <div class="text-h6">Post</div>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup color="negative">
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-item-section>
        <div class="row q-pa-lg" v-html="blog_data.description"></div>
        <div class="q-pa-lg row items-start">
            <q-img v-for="(img, i) in blog_data.blog_gallery" :key="i"
              :src="img.gallery"
              spinner-color="red"
              style="height: 140px; max-width: 150px"
            />
        </div>
      </q-item-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data() {
    return {
      show_dialog: false,
      blog_data: []
    };
  },

  methods: {
    showDialog(blog) {
      this.show_dialog = true;
      this.blog_data = blog;
    }
  }
};
</script>