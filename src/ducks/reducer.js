import axios from 'axios';

const initialState = {
    listings: [],
    currentRestaurant: [],
    userId: 0,
    restaurantId: 0
}

const FULFILLED = '_FULFILLED';
const GET_LISTINGS = 'GET_LISTINGS';
const ADD_FAV_RESTAURANT = 'ADD_FAV_RESTAURANT';
const ADD_CURRENT_RESTAURANT = "ADD_CURRENT_RESTAURANT";
const GET_USER_ID = "GET_USER_ID";

export function getListings(location) {
    let listings = axios.get('/api/getlisting/' + location)
        .then(response => {
            return response.data
        })
    return {
        type: GET_LISTINGS,
        payload: listings
    }
}

export function addCurrentRestaurant(id) {
    let restaurant = axios.get(`/api/getRestaurant/${id}`)
        .then(response => {
            return response.data
        })
    return {
        type: ADD_CURRENT_RESTAURANT,
        payload: restaurant
    }
}

export function getCurrentUser() {
    let userID = axios.get('/auth/me').then(response => {
        console.log(response.data);
        return response.data.id
    })
    return {
        type: GET_USER_ID,
        payload: userID
    }
}

export function addFavRestaurant(user, restaurant) {
    console.log("this is addfav", user)
    const data = {
        userId: user,
        restaurantId: restaurant
    }
    axios.post('/api/addRestaurant', data).
        then(response => {
            console.log(response)
            alert("Restaurant has been added to favorites!")
        })
        .catch(err => {
            console.log("Create user error", err)
        })
    return {
        type: ADD_FAV_RESTAURANT
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_LISTINGS + FULFILLED:
            return Object.assign({}, state, { listings: action.payload })
        case ADD_CURRENT_RESTAURANT + FULFILLED:
            return Object.assign({}, state, { currentRestaurant: action.payload })
        case GET_USER_ID + FULFILLED:
            return Object.assign({}, state, { userId: action.payload })
        case ADD_FAV_RESTAURANT + FULFILLED:
            return Object.assign({}, state)

        default:
            return state;

    }
}