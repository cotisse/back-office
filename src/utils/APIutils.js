import {BASE_URL} from 'utils/constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : options.url
    })
    
    if(localStorage.getItem('accessToken')) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getAllVehicule() {
    return request({
        url: BASE_URL+"/api/backoffice/vehiculeDetails",
        method: 'GET'
    });
}
export function getVehiculeByClass(classe) {
    return request({
        url: BASE_URL+"/api/backoffice/vehicule/"+classe,
        method: 'GET'
    });
}
export function getAllClasses() {
    return request({
        url: BASE_URL+"/api/backoffice/classes",
        method: 'GET'
    });
}
export function getAllBrands() {
    return request({
        url: BASE_URL+"/api/backoffice/brands",
        method: 'GET'
    });
}
export function getAllTrips(){
    return request({
        url: BASE_URL+"/api/backoffice/trips",
        method: 'GET'
    });
}
export function getAllJourney(){
    return request({
        url: BASE_URL+"/api/backoffice/destinations",
        method: 'GET'
    });
}
// export function saveVehicule(vehiculeData){
//     return request({
//         url: "http://localhost:5001/api/backOffice/vehicule/save",
//         method: 'POST',
//         body : JSON.stringify(vehiculeData)
//     });
// }