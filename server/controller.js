axios = require("axios");

module.exports = {

    readListing: (req, res) => {
        const location = req.params.location
        axios.get(`https://api.yelp.com/v3/businesses/search?term=restaurants&categories=vegan&limit=50&location=${location}`, { headers: { "Authorization": `Bearer ${process.env.YELP_ACCESS_TOKEN}` } })
            .then(response => res.status(200).send(response.data.businesses))
    },

    readRestaurant: (req, res) => {
        const db = req.app.get('db');
        axios.get(`https://api.yelp.com/v3/businesses/${req.params.id}`, { headers: { "Authorization": `Bearer ${process.env.YELP_ACCESS_TOKEN}` } })
            .then(response => res.status(200).send(response.data))
    },

    addRestaurant: (req, res, next) => {
        console.log("added")
        console.log(req.body)
        console.log('the user id is ', req.user)
        const db = req.app.get('db');
        const { userId, restaurantId } = req.body;
        console.log(userId, restaurantId)
        db.add_favorite_restaurant([userId, restaurantId])
            .then((data) => res.status(200).send())
            .catch(() => res.status(500).send())
    },

    readFavListing: (req, res) => {
        const location = req.params.location
        axios.get(`https://api.yelp.com/v3/businesses/search?term=restaurants&categories=vegan&limit=50&location=${location}`, { headers: { "Authorization": `Bearer ${process.env.YELP_ACCESS_TOKEN}` } })
            .then(response => res.status(200).send(response.data.businesses))
    }

}