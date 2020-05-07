
export function SET_SUBCATEGORY (state, payload) {
    state.sub_categories = payload;
}
export function ADD_SUBCATEGORY (state, payload) {
    state.sub_categories.unshift(payload);
}
export function REMOVE_SUBCATEGORY (state, i) {

    state.sub_categories.splice(i, 1);
}
