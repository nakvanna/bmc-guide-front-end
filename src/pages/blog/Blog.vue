<template>
  <q-page>
    <div v-if="blogs.length">
      <div class="q-pa-md">
        <q-list bordered separator>
          <q-item>
            <q-item-section class="text-bold">TITLE</q-item-section>
            <q-item-section class="text-bold text-center">POST BY</q-item-section>
            <q-item-section class="text-bold text-right">ACTION</q-item-section>
          </q-item>
          <!--  -->
          <q-item
            clickable
            v-ripple
            @click="$refs.blog_view.showDialog(blog)"
            v-for="(blog, i) in blogs"
            :key="i"
          >
            <q-item-section>{{blog.title}}</q-item-section>
            <q-item-section class="text-center">{{blog.post_by}}</q-item-section>
            <q-item-section>
              <div class="q-gutter-sm text-right">
                <q-btn
                  round
                  color="primary"
                  icon="edit"
                  @click.stop="$refs.blog_edit.showDialog(blog)"
                />
                <q-btn
                  round
                  color="negative"
                  icon="delete"
                  @click.stop="comfirmLocation(blog.id, i, blog.blog_gallery)"
                />
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn @click="$refs.blog_add.showDialog()" fab icon="add" color="primary" />
      </q-page-sticky>
    </div>

    <div v-else>
      <q-page class="flex flex-center">
        <h5 class="text-grey-6 text-bold">No data!</h5>
        <q-btn flat class="text-primary" @click="$refs.blog_add.showDialog()">Add New</q-btn>
      </q-page>
    </div>

    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6 text-negative">Delete comfirm!</div>
        </q-card-section>

        <q-card-section class="q-pt-none">Are you sure?</q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="No" color="primary" v-close-popup />
          <q-btn flat @click="deleteBlog" label="Yes" color="negative" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <blog-add ref="blog_add"></blog-add>
    <blog-view ref="blog_view"></blog-view>
    <blog-edit ref="blog_edit"></blog-edit>
  </q-page>
</template>

<script>
import BlogAdd from "./BlogAdd";
import BlogView from "./BlogView";
import BlogEdit from "./BlogEdit";
export default {
  components: {
    BlogAdd,
    BlogView,
    BlogEdit
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
  computed: {
    blogs() {
      return this.$store.state.blogs.blogs;
    }
  },
  created() {
    console.log(this.blogs);
  },
  methods: {
    comfirmLocation(id, i, gallery) {
      this.alert = true;
      this.deleteData.id = id;
      this.deleteData.i = i;
      this.deleteData.gallery = gallery;
      console.log(id, i, gallery);
    },
    deleteBlog() {
      let vm = this;
      vm.$store
        .dispatch("blogs/deleteBlog", vm.deleteData)
        .then(function(data) {
          if (data == true) {
            for (let i = 0; i < vm.deleteData.gallery.length; i++) {
              vm.$store.dispatch("blogs/deleteBlogGallery", {
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