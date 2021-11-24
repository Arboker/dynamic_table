import CoefficientService from '../../services/CoefficientService'

export const load = (bool) => {
    return {
        type: "coeff/change",
        payload: {
            key: "loading",
            data: bool
        }
    }
}

export const setData = (key, data) => {
    return {
        type: "coeff/change",
        payload: {
            key: key,
            data: data
        }
    }
}