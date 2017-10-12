import axios from 'axios';

const initialState = {
    listings:[]
}

const FULFILLED = '_FULFILLED';
const GET_LISTINGS = 'GET_LISTINGS';

export function getListings(location) {
     let listing = axios.get('/api/getlisting/' + location)
     .then(response => {
         console.log(response.data)
         return response.data
     })
    return {
        type: GET_LISTINGS,
        payload: listing
    }
}

//REDUCER FUNCTION

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_LISTINGS + FULFILLED:
        console.log("reducer is hit")
        return Object.assign({}, state, {listings: action.payload} )

        default:
            return state;
    }
}