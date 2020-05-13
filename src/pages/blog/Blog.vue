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
          <q-item clickable v-ripple @click="$refs.blog_view.showDialog(blog)" v-for="(blog, i) in blogs" :key="i">
            <q-item-section>{{blog.title}}</q-item-section>
            <q-item-section class="text-center">{{blog.post_by}}</q-item-section>
            <q-item-section>
              <div class="q-gutter-sm text-right">
                <q-btn
                  round
                  color="primary"
                  icon="edit"
                  @click="$refs.sponsor_edit.showDialog(sponsor)"
                />
                <q-btn round color="negative" icon="delete" @click="comfirmLocation(blog.id, i)" />
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
    BlogAdd, BlogView, BlogEdit
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
      showBlog(blog){
          
      }
  }
};
</script>