axios = require("axios");

module.exports = {

    readListing: (req, res) => {
        const location = req.params.location
        axios.get(`https://api.yelp.com/v3/businesses/search?term=restaurants,food&categories=vegan,vegetarian,organic_stores,farmersmarket,ethicgrocery&radius=35000&limit=50&location=${location}`, { headers: { "Authorization": `Bearer ${process.env.YELP_ACCESS_TOKEN}` } })
            .then(response => res.status(200).send(response.data.businesses))
    },

    readRestaurant: (req, res) => {
        axios.get(`https://api.yelp.com/v3/businesses/${req.params.id}`, { headers: { "Authorization": `Bearer ${process.env.YELP_ACCESS_TOKEN}` } })
            .then((response) => res.status(200).send(response.data))
    },

    addRestaurant: (req, res) => {
        const db = req.app.get('db');
        const { userId, restaurantId } = req.body;
        console.log(userId, restaurantId)
        db.add_favorite_restaurant([userId, restaurantId])
            .then((data) => res.status(200).send())
            .catch(() => res.status(500).send())
    },

    readFavListing: (req, res) => {
        const db = req.app.get('db');
        db.find_fav_restaurants(req.params.id)
            .then(yelpIdList => {
                let favListing = [];
                console.log("YelpID", yelpIdList)
                for (let i = 0; i < yelpIdList.length; i++) {
                    let yelpId = yelpIdList[i].restaurant_id;
                    console.log("FOR LOOP VALUE", yelpId)
                    console.log("FUNCTION CALLING API", GetMyResourceData(yelpId));
                }
                function GetMyResourceData(yelpId) {
                axios.get(`https://api.yelp.com/v3/businesses/${yelpId}`, { headers: { "Authorization": `Bearer ${process.env.YELP_ACCESS_TOKEN}` } })
                    .then(response => res.send(response.data)) 
                }
            })
    },

}