export function SET_CATEGORY (state, payload){
    
    state.categories = payload;

}

export function ADD_CATEGORY (state, payload) {
    
    state.categories.unshift(payload);
}

export function REMOVE_CATEGORY (state, i) {

    state.categories.splice(i, 1);

}
