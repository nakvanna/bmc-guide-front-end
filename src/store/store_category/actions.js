import $http from '../../boot/http_request'

export async function fetchCategories({ commit }) {

    try {
        const res = await $http.get('/category');
        commit('SET_CATEGORY', res.data);
    } catch (e) {
        return false
    }

}

export async function storeCategory({ commit }, data) {

    try {
        const res = await $http.post('/category', data);
        commit('ADD_CATEGORY', res.data);
    } catch (e) {
        return false
    }

}

export async function deleteCategory({ commit }, data) {

    try {
        const res = await $http.delete('/category/' + data.id);
        commit('REMOVE_CATEGORY', data.i);
    } catch (e) {
        return false
    }

}