import $http from '../../boot/http_request';

export async function fetchSubCategories({ commit }) {

    try {
        const res = await $http.get('/sub-category');
        commit('SET_SUBCATEGORY', res.data);
    } catch (e) {
        return false
    }

}

export async function storeSubCategory({ commit }, data) {

    try {
        const res = await $http.post('/sub-category', data);
        commit('ADD_SUBCATEGORY', res.data);
    } catch (e) {
        return false
    }

}

export async function deleteSubCategory({ commit }, data) {

    try {
        const res = await $http.delete('/sub-category/' + data.id);
        commit('REMOVE_SUBCATEGORY', data.i);
    } catch (e) {
        return false
    }

}