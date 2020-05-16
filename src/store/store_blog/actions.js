import $http from '../../boot/http_request';

export async function fetchBlogs({ commit }){
    try{
        const res = await $http.get('/blog');
        commit('SET_BLOG', res.data);
    } catch(e){
        return false
    }
}

export async function storeBlog({ commit }, blogs) {
    try {
        const res = await $http.post('/blog', blogs);
        return res.data;
    } catch (e) {
        return false;
    }
}

export async function storeBlogGallery({ commit }, formData){
    try {
        const res = await $http.post('/blog-gallery', formData);
        commit('ADD_BLOG', res.data);
    } catch(e){
        return false
    }
}

export async function updateBlog({ commit }, blogs){
    try {
        const res = await $http.put('/blog/'+blogs.id, blogs);
    } catch(e){
        return false
    }
}

export async function updateBlogGallery({ commit }, formData){
    try {
        const res = await $http.post('/blog-gallery', formData);
        commit('UPDATE_BLOG', res.data);
    } catch(e){
        return false
    }
}

export async function deleteBlog({ commit }, data){

    try {
        const res = await $http.delete('/blog/' + data.id);
        commit('REMOVE_BLOG', data.i);
        return true;
    } catch(e){
        return false
    }

}

export async function deleteBlogGallery({ commit }, data){
    
    try {
        const res = await $http.delete('/blog-gallery/' + data.id);
    } catch (e) {
        return false
    }

}