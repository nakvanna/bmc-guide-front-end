export function SET_BLOG (state, payload) {
    state.blogs = payload;
}

export function ADD_BLOG (state, payload) {
    state.blogs.unshift(payload);
}

export function UPDATE_BLOG (state, payload) {
    let index = state.blogs.findIndex(x=>x.id===payload.id);
    state.blogs.splice(index, 1, payload);
}

export function REMOVE_BLOG (state, i) {
    state.blogs.splice(i, 1);
}

