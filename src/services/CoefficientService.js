import Setttings from './Settings'

class CoefficientService extends Setttings {
    constructor() {
        super()
    }

    getCompanies = async () => {
        const url = this.nomenclatureUrl + `/companies`

        const request = await fetch(url, this.mainReq);
        const json = await request.json();

        return json;
    }

    getRegions = async (companyId) => {
        const url = this.medicalUrl + `/insurance_companies/${companyId}/regions`

        const request = await fetch(url, this.bearerReq);
        const json = await request.json();

        return json;
    }

    getTravelType = async () => {
        const url = this.nomenclatureUrl + `/travel_types`

        const request = await fetch(url, this.mainReq);
        const json = await request.json();

        return json;
    }
    
    getPackage = async (companyId) => {
        const url = this.medicalUrl + `/insurance_companies/${companyId}/packages`

        const request = await fetch(url, this.bearerReq);
        const json = await request.json();

        return json;
    }

    getInsuredSum = async (companyId, currency) => {
        const url = this.medicalUrl + `/insurance_companies/${companyId}/insured_amounts?currency_code=${currency}`

        const request = await fetch(url, this.bearerReq);
        const json = await request.json();

        return json;
    }

    getCoveredPackages = async (companyId, area, packageId) => {
        let url = this.medicalUrl + `/covered_packages?insurance_company_id=${companyId}&package_id=${packageId}`

        if (area.type === "region") {
            url = url + `&region_id=${area.id}`
        }

        if (area.type === "country") {
            url = url + `&country_id=${area.id}`
        }

        const request = await fetch(url, this.bearerReq);
        const json = await request.json();

        return json;
    }

    getCovidPackages = async (companyId) => {
        let url = this.medicalUrl + `/insurance_companies/${companyId}/covid_packages`

        const request = await fetch(url, this.bearerReq);
        const json = await request.json();

        return json;
    }

    getBaseCoefficient = async (companyId, area, travelType, packageId, currency) => {
        let url = this.medicalUrl + `/admin/base_coefficients?insurance_company_id=${companyId}&travel_type_code=${travelType}&package_id=${packageId}&covid=1&currency_code=${currency}`

        if (area.type === "region") {
            url = url + `&region_id=${area.id}`
        }

        if (area.type === "country") {
            url = url + `&country_id=${area.id}`
        }

        const request = await fetch(url, this.bearerReq);
        const json = await request.json();

        return json;
    } 
}

export default new CoefficientService();