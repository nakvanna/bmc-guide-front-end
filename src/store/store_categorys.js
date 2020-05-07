const state = {
    categories: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
}

const mutations = {

}

const actions = {

}

const getters = {
    categories: (state) => {
        return state.categories;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}