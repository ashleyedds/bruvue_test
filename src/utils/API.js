import axios from "axios";

const beerURL = "https://s3.amazonaws.com/bruvue-data/beer-data.json";



//Grab all the data from the API so we can use it in our application
export default {
    searchBeer: () => {
        fetch(beerURL, { mode: 'cors' })
            .then(function (response) {
                return response.text();
            })
            .then(function (text) {
                console.log('Request successful', text);
            })
            .catch(function (error) {
                console.log('Request failed', error)
            });
    }
}

