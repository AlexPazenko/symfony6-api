import {baseURL} from '../../src/config.js';
import {Login} from '../Login.js';

export class DeleteOffer extends Login {

    constructor(delete_url)
    {
        super('DeleteOffer')
        this.delete_url = delete_url
    }

    DeleteOffer(delete_url)
    {
        axios.delete(baseURL + this.delete_url)
            .then((response) => {
                console.log(response);
            })
            .catch( (error) => {
                console.log(error);
                if( error.response.data.code == "401")
                {
                    this.handle401Error()
                }
            });
    }
}