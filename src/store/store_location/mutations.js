
export function SET_LOCATION (state, payload) {
    state.locations = payload;
}

export function ADD_LOCATION (state, payload) {
    state.locations.unshift(payload);
}

export function UPDATE_LOCATION (state, payload) {
    let index = state.locations.findIndex(x=>x.id===payload.id);
    state.locations.splice(index, 1, payload);
}

export function REMOVE_LOCATION (state, i) {
    state.locations.splice(i, 1);
}

