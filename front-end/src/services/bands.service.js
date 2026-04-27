import axios from 'axios';

// Armazenando o endereço da API
const apiUrl = "http://localhost:3000";

const bandsService = {

    // Função para listar os bands 
    async list(){
        const enpoint = apiUrl + "/bands"
        return axios.get(enpoint);
    },

    // Função para recuperar dados de um band específico
    async getOne(bandId){
        const enpoint = apiUrl + "/bands/" + bandId
        return axios.get(enpoint);
    },

    // Função para criar um novo band
    async create(data){
        const enpoint = apiUrl + "/bands"
        return axios.post(enpoint, data);
    },

    // Função para editar um band específico
    async edit(data, bandId){
        const enpoint = apiUrl + "/bands/" + bandId
        return axios.put(enpoint, data);
    },

    // Função para exluir um band específico
    async delete(bandId){
        const enpoint = apiUrl + "/bands/" + bandId
        return axios.delete(enpoint);
    },


}

export default bandsService;