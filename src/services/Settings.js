class Setttings {
    constructor() {
        this.nomenclatureUrl = "";
        this.medicalUrl = ""

        this.mainReq = {
            method: "GET"
        }
        this.token = "Bearer " + document.getElementById("token_id").value;
        this.bearerReq = {
            method: "GET",
            headers: {
                'Authorization': this.token,
                'Content-Type': 'application/json',
            },
        }
    }
}

export default Setttings;