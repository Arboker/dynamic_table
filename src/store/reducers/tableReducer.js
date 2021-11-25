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
    loading: false,
    loadedValues: false,
    inserted: false
}

const tableReducer = (state = initialState, action) => {
    switch (action.type) {
        case "tableData/change":
            return {
                ...state,
                [action.payload.key]: action.payload.data
            }
        default:
            return state;
    }
}

export default tableReducer;