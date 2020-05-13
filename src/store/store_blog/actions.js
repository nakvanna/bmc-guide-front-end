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
