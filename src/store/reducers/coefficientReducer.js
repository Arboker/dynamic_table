const initialState = {
    data: [
        {
            values: {
                field0: {
                    value: "1"
                },
                field1: {
                    value: "1"
                }
            }
        }
    ],
    insuredAmount: [],
    toUpdate: [],
    coveredPackage: {},
    loading: false,
    loadedCoeff: false,
    inserted: false
}

const coefficientReducer = (state = initialState, action) => {
    switch (action.type) {
        case "coeff/change":
            return {
                ...state,
                [action.payload.key]: action.payload.data
            }
        case "coeff/action":
            return {
                ...state,
                [action.payload.key]: state[action.payload.key].map(item => {
                    if (item.name === action.payload.value.name) {
                        return {
                            ...item,
                            selected: !item.selected
                        }
                    }
                    return {
                        ...item
                    }
                })
            }
        case "coeff/update":
            return {
                ...state,
                [action.payload.key]: [
                    ...state[action.payload.key],
                    action.payload.data
                ]
            }
        case "coeff/changeData":
            return {
                ...state,
                data: action.payload.data
            }
        default:
            return state;
    }
}

export default coefficientReducer;