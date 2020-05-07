const state = {
    locations:{
        shopname: 'Shop name',
        location_url: 'Location URL',
        thumbnail: "Thumbnail.jpg",
        website: 'www.website.com',
        tel: '09838483494',
        email: 'email@gmail.com',
        can_do: 'Swimming, Walking, Take a photo',
        about: 'Hello',
        gallery: '',
        category: 'Facebook',
    },
}

const mutations = {
    

}

const actions = {
    fetchLocations({ commit }) {
        console.log('Hello');
    }
}

const getters = {
    locations: (state) => {
        return state.locations;
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}