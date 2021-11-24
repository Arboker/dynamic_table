import Setttings from './Settings'

class NomenclatureService extends Setttings {
    constructor() {
        super()
    }
    getCurrencies = async () => {
        let url = this.nomenclatureUrl + `/currencies`

        const request = await fetch(url, this.mainReq);
        const json = await request.json();

        return json;
    }
}

export default new NomenclatureService();