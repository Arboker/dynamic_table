import Setttings from '../services/Settings'
import { getData } from '../store/actions/validation'
class Insertion extends Setttings {
    constructor() {
        super();
    }

    insertData = () => (dispatch, getState) => {
        const state = getState();
        const coeff = state.coefficientReducer.data
        let updateData = [];
        let insertData = [];
        let deleteData = [];

        coeff.map(item => {
            console.log(item)            
        })

        const mergedData = [
            ...updateData,
            ...insertData,
            ...deleteData
        ]
        this.insert(mergedData).then(res => {
            if (res.status) {
                dispatch({
                    type: "coeff/change",
                    payload: {
                        key: "inserted",
                        data: true
                    }
                })
                dispatch({
                    type: "coeff/change",
                    payload: {
                        key: "loadedCoeff",
                        data: false
                    }
                })
            }
            alert(res.message)
        })
    }

    action = (item, currentPrice, state) => {
        const travelType = state.selectReducer.travelType.code;
        const currency = state.selectReducer.coeff_currency.code
        currentPrice = JSON.parse(JSON.stringify(currentPrice))
        let covidPrices = currentPrice.covid_prices.map(covid => {
            if (covid) {
                if (covid.coefficient === "") {
                    covid.action = "delete";
                }
                return covid;
            }
        }).filter(el => el !== undefined);
        if (covidPrices) {
            covidPrices = covidPrices.filter(covid => covid.action !== undefined)
        }
        else {
            covidPrices = []
        }

        const obj = {
            "travel_type_val1": item.travel_type_val1,
            "travel_type_val2": item.travel_type_val2,
            "insurance_type_code": currentPrice.insurance_type_code,
            "travel_type_code": travelType,
            "currency_code": currency,
            "insured_amount_id": currentPrice.insured_amount_id,
            "daily_rate": currentPrice.price,
            "covid_coefficients": covidPrices,
            "covered_package_id": state.coefficientReducer.coveredPackage.id
        }
        return obj
    }

    updateAction = (item, currentPrice, state) => {
        const isDeleteAction = this.checkOnDeleteAction(currentPrice, item)
        const actionObj = this.action(item, currentPrice, state)
        const obj = {
            "id": currentPrice.id,
            "action": isDeleteAction ? "delete" : "update"
        }
        return { ...actionObj, ...obj }
    }

    insertAction = (item, currentPrice, state) => {
        const isDeleteAction = this.checkOnDeleteAction(currentPrice)
        const actionObj = this.action(item, currentPrice, state)
        const obj = {
            "action": "insert"
        }
        if (isDeleteAction) {
            return {
                status: false
            }
        }
        if (currentPrice.price === "") {
            return {
                status: false
            }
        }
        else {
            return { ...actionObj, ...obj }
        }
    }

    checkOnDeleteAction = (item, main) => {
        if (main !== undefined) {
            return item.price.trim() === "" || main.action === "delete"
        }
    }

    insert = async (data) => {
        const url = this.medicalUrl + `/admin/base_coefficients`

        const insertReq = {
            method: "POST",
            headers: {
                'Authorization': this.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    base_coefficients: data
                }
            )
        }

        const request = await fetch(url, insertReq);
        const json = await request.json();

        return json;
    }
}

export default new Insertion().insertData