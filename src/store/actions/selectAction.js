export const addToSelect = (key, data) => dispatch => {
    dispatch({
        type: "select/add",
        payload: {
            key: key,
            data: data
        }
    })
}

export const chooseSelect = (key, value) => dispatch => {
    dispatch({
        type: "select/choose",
        payload: {
            key: key,
            value: value
        }
    })
}

export const removeFromSelect = (key, id) => dispatch => {
    dispatch({
        type: "select/remove",
        payload: {
            key: key,
            id: id
        }
    })
}


export const removeElement = (key, data) => dispatch => {
    dispatch({
        type: "select/removeElement",
        payload: {
            key: key,
            data: data
        }
    })
}

export const removeAllSelect = (key) => dispatch => {
    dispatch({
        type: "select/removeAll",
        payload: {
            key: key
        }
    })
}