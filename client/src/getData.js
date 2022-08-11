import { baseURL } from './config.js';
import { show } from './view.js';
import { pagination } from './pagination.js';
import { router } from './router.js';

export const getData = (event) => {
    axios.get(baseURL + router(event)).then(function (response) {
        var el = document.createElement('script');
        el.type = 'application/ld+json';
        var jsonLd = {
            "@context": "http://schema.org/",
            "@id": "/api/product",
            "@type": "hydra:Collection"
        }
        jsonLd['hydra:member'] = response.data['hydra:member'];
        el.text = JSON.stringify(jsonLd);
        document.querySelector('head').appendChild(el);
        console.log(el.text);

        const orderByName = document.getElementById("order-by-name");
        const filterWithImages = document.getElementById("filter-with-images-only");
        const searchButton = document.getElementById("search-button");
        orderByName.addEventListener("click", getData);
        filterWithImages.addEventListener("click", getData);
        searchButton.addEventListener("click", getData);

        orderByName.style.display = 'block';
        filterWithImages.style.display = 'block';
        searchButton.style.display = 'block';
        if ( typeof orderByName.order === 'undefined')
            orderByName.order = 'asc';
        else if ( orderByName.order === 'asc') orderByName.order = 'desc'
        else orderByName.order = 'asc'
        console.log(response);
            pagination(response.data);
            show(response.data['hydra:member']);
            // console.log(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });

}
