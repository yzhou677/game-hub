import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: 'add215c4107749f4b836b33e3482d3c2'
    }
})