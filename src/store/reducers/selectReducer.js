const initialState = {
    companies: {},
    regions: {},
    travelType: {},
    package: {},
    currency: {},
    coeff_currency: {},
}

const selectReducer = (state = initialState, action) => {
    switch (action.type) {
        case "select/add":
            return {
                ...state,
                [action.payload.key]: [
                    ...state[action.payload.key],
                    action.payload.data
                ]
            }
        case "select/choose":
            return {
                ...state,
                [action.payload.key]: action.payload.value
            }
        case "select/remove":
            return {
                ...state,
                [action.payload.key]: state[action.payload.key].filter(item => item.id !== action.payload.id)
            }
        case "select/removeElement":
            return {
                ...state,
                [action.payload.key]: state[action.payload.key].filter(item => item !== action.payload.data)
            }
        case "select/removeAll":
            return {
                ...state,
                [action.payload.key]: []
            }
        default:
            return state;
    }
}

export default selectReducer;