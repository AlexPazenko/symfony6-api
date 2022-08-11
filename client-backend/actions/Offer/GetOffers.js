import {baseURL} from '../../src/config.js';

export class GetOffers {

    constructor()
    {
        let userId = localStorage.getItem('user_id')
        if(userId == null) return
        axios.get(baseURL + '/api/users/'+userId+'/offers')
            .then((response) => {
                 console.log(response.data['hydra:member']);
                response.data['hydra:member'].forEach(offer => {
                    this.addOptionElement(offer.url, offer['@id'])
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }

    addOptionElement(text, value)
    {
        let option = document.createElement("option");
        option.text = text;
        option.value = value;
        let select = document.getElementById("delete-offer");
        select.appendChild(option);
    }
}