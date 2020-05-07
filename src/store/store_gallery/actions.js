import $http from '../../boot/http_request'

export async function storeGallery({ commit }, form_data) {
    try {
        const res = await $http.post('/gallery', form_data);
    } catch (e) {
        return false
    }
}

export async function updateGallery({ commit }, form_data) {
    try {
        const res = await $http.post('/location/update-custom/' + form_data.get('id'), form_data);
    } catch (e) {
        return false
    }
}

export async function deleteGallery({ commit }, data) {
    try {
        const res = await $http.delete('/gallery/' + data.id);
    } catch (e) {
        return false
    }
}