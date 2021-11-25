import Setttings from '../services/Settings'
class Insertion extends Setttings {
    constructor() {
        super();
    }

    insertData = () => (dispatch, getState) => {
        const state = getState();
        const tableData = state.tableReducer.data
        let updateData = [];
        let insertData = [];
        let deleteData = [];

        tableData.map(item => {
            const values = item.values;
            const keys = Object.keys(values);

            keys.map(key => {
                if (item.action && item.action === "delete") {
                    const newValue = {
                        ...values[key],
                        action: "delete"
                    }
                    deleteData.push(newValue)
                }
                if (values[key].action) {
                    if (values[key].action === "insert") {
                        insertData.push(values[key]) 
                    }
                    else if (values[key].action === "update") {
                        updateData.push(values[key]) 
                    }  
                    else if (values[key].action === "delete") {
                        deleteData.push(values[key]) 
                    }                             
                }
            })
        })

        const mergedData = [
            ...updateData,
            ...insertData,
            ...deleteData
        ]
        console.log(mergedData)
        this.insert(mergedData).then(res => {
            if (res.status) {
                dispatch({
                    type: "tableData/change",
                    payload: {
                        key: "inserted",
                        data: true
                    }
                })
                dispatch({
                    type: "tableData/change",
                    payload: {
                        key: "loadedValues",
                        data: false
                    }
                })
            }
            alert(res.message)
        })
    }


    insert = async (data) => {
        const url = this.url + `/insert`

        const insertReq = {
            method: "POST",
            body: JSON.stringify(
                data
            )
        }

        const request = await fetch(url, insertReq);
        const json = await request.json();

        return json;
    }
}

export default new Insertion().insertData