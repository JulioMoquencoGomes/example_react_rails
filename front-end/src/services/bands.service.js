import axios from 'axios';

const apiUrl = "http://localhost:3000";

const bandsService = {

    async list(){
        const enpoint = apiUrl + "/bands"
        return axios.get(enpoint);
    },

    async getOne(bandId){
        const enpoint = apiUrl + "/bands/" + bandId
        return axios.get(enpoint);
    },

    async create(data){
        const enpoint = apiUrl + "/bands"
        return axios.post(enpoint, data);
    },

    async edit(data, bandId){
        const enpoint = apiUrl + "/bands/" + bandId
        return axios.put(enpoint, data);
    },

    async delete(bandId){
        const enpoint = apiUrl + "/bands/" + bandId
        return axios.delete(enpoint);
    },


}

export default bandsService;