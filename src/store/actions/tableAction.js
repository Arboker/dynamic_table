export const changeTableData = (key, value) => dispatch => {
    dispatch({
        type: "tableData/change",
        payload: {
            key: key,
            data: value
        }
    })
}