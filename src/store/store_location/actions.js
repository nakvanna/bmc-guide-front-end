import $http from '../../boot/http_request';

export async function fetchLocations({ commit }) {

    try {
        const res = await $http.get('/location');
        commit('SET_LOCATION', res.data);
    } catch(e){
        return false
    }
    
}

export async function storeLocation({ commit }, form_data) {
    try {
        const res = await $http.post('/location', form_data);
        // commit('ADD_LOCATION', res.data);
        return res.data; // Need to use
    } catch(e) {
        return false
    }
}

export async function storeGallery({ commit }, form_data) {
    try {
        const res = await $http.post('/gallery', form_data);
        commit('ADD_LOCATION', res.data);
        console.log(res.data);
    } catch (e) {
        return false
    }
}

export async function updateLocation({ commit }, form_data) {
    try {
        const res = await $http.post('/location/update-custom/' + form_data.get('id'), form_data);
        // commit('UPDATE_LOCATION', res.data);
        return res.data;
    } catch (e){
        return false
    }
}

export async function updateGallery({ commit }, form_data) {
    try {
        const res = await $http.post('/gallery', form_data);
        commit('UPDATE_LOCATION', res.data);
    } catch (e) {
        return false
    }
}

export async function deleteLocation({ commit }, data){

    try {
        const res = await $http.delete('/location/' + data.id);
        commit('REMOVE_LOCATION', data.i);
        return true;
    } catch(e){
        return false
    }

}