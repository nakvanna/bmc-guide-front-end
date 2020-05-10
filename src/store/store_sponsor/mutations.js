
export function SET_SPONSOR (state, payload) {
    state.sponsors = payload;
}

export function ADD_SPONSOR (state, payload) {
    state.sponsors.unshift(payload);
}

export function UPDATE_SPONSOR (state, payload) {
    let index = state.sponsors.findIndex(x=>x.id===payload.id);
    state.sponsors.splice(index, 1, payload);
}

export function REMOVE_SPONSOR (state, i) {
    state.sponsors.splice(i, 1);
}