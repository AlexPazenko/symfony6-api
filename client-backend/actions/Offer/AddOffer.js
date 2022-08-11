import {baseURL} from '../../src/config.js';
import {Login} from '../Login.js';

export class AddOffer extends Login {

    constructor(url,price,priceCurrency,product_id)
    {
        super('AddOffer')
        this.url = url
        this.price = price
        this.priceCurrency = priceCurrency
        this.productID = product_id
    }


    AddOffer()
    {
        let params = {
            "url": this.url,
            "price": this.price,
            "priceCurrency": this.priceCurrency,
            "product": "api/products/"+this.productID
        }
        console.log(params);

        let config = {
            headers: {
                'accept': 'application/ld+json',
                "Content-Type": "application/ld+json"
            }
        }
        console.log(config);

        axios.post(baseURL+'/api/offers', params, config)
            .then((response) => {
                console.log(response);
            }).catch((error) => {
            console.log(error);
            if( error.response.data.code == "401")
            {
                this.handle401Error()
            }
        })
    }

}

