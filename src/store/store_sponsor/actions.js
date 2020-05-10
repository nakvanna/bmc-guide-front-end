import $http from '../../boot/http_request';

export async function fetchSponsor ({ commit }, form_data){
    try {
        const res = await $http.get('/sponsor');
        commit('SET_SPONSOR', res.data);
    } catch(e){
        return false
    }
}

export async function storeSponsor ({ commit }, form_data) {
    try {
        const res = await $http.post('/sponsor', form_data);
        commit('ADD_SPONSOR', res.data);
    } catch(e){

    }
}

export async function updateSponsor({ commit }, form_data) {
    try {
        const res = await $http.post('/sponsor/update-custom/' + form_data.get('id'), form_data);
        commit('UPDATE_SPONSOR', res.data);
        return res.data;
    } catch (e){
        return false
    }
}

export async function deleteSponsor({ commit }, data){

    try {
        const res = await $http.delete('/sponsor/' + data.id);
        commit('REMOVE_SPONSOR', data.i);
        return true;
    } catch(e){
        return false
    }

}