export const actionCoeff = (key, value) => dispatch => {
    dispatch({
        type: "coeff/action",
        payload: {
            key: key,
            value: value
        }
    })
}

export const changeCoeff = (key, value) => dispatch => {
    dispatch({
        type: "coeff/change",
        payload: {
            key: key,
            data: value
        }
    })
}

export const updateCoeff = (key, value) => dispatch => {
    dispatch({
        type: "coeff/update",
        payload: {
            key: key,
            data: value
        }
    })
}

export const changeDataCoeff = (value) => dispatch => {
    dispatch({
        type: "coeff/changeData",
        payload: {
            data: value
        }
    })
}