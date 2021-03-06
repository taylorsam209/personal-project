import axios from "axios";
import swal from "sweetalert";

const initialState = {
  listings: [],
  currentRestaurant: [],
  user: {},
  restaurantId: 0,
  reviews: {}
};

const FULFILLED = "_FULFILLED";
const GET_LISTINGS = "GET_LISTINGS";
const ADD_FAV_RESTAURANT = "ADD_FAV_RESTAURANT";
const ADD_CURRENT_RESTAURANT = "ADD_CURRENT_RESTAURANT";
const GET_USER = "GET_USER";
const CLEAR_LISTINGS = "CLEAR_LISTINGS";
const CLEAR_RESTAURANT = "CLEAR_RESTAURANT";
const GET_REVIEWS = "GET_REVIEWS";
const CLEAR_REVIEWS="CLEAR_REVIEWS";

export function clearListings() {
  return {
    type: CLEAR_LISTINGS,
    payload: []
  };
}

export function clearRestaurant() {
  return {
    type: CLEAR_RESTAURANT,
    payload: []
  };
}

export function clearReviews() {
  return {
    type: CLEAR_REVIEWS,
    payload: {}
  };
}

export function getListings(location) {
  let listings = axios.get("/api/getlisting/" + location).then(response => {
    return response.data;
  });
  return {
    type: GET_LISTINGS,
    payload: listings
  };
}

export function getReviews(id) {
  let reviews = axios.get(`/api/reviews/${id}`).then(response => {
    return response.data;
  });
  return {
    type: GET_REVIEWS,
    payload: reviews
  };
}

export function addCurrentRestaurant(id) {
  let restaurant = axios.get(`/api/getRestaurant/${id}`).then(response => {
    return response.data;
  });
  return {
    type: ADD_CURRENT_RESTAURANT,
    payload: restaurant
  };
}

export function getCurrentUser() {
  let user = axios.get("/auth/me").then(response => {
    console.log(response.data);
    return response.data;
  });
  return {
    type: GET_USER,
    payload: user
  };
}

export function addFavRestaurant(userId, restaurant) {
  console.log("this is addfav", userId);
  const data = {
    userId: userId,
    restaurantId: restaurant
  };
  if (data.userId === undefined) {
    swal(
      "User not found.",
      "Please login to add favorite restaurants.",
      "error"
    );
    return {
      type: ADD_FAV_RESTAURANT
    };
  } else
    axios
      .post("/api/addRestaurant", data)
      .then(response => {
        console.log(response.data);
        if (response.data === "success") {
          swal(
            "Added to favorites!",
            "Go to profile to view your list!",
            "success"
          );
        } else {
          swal(
            "Attention",
            "Business already exists in your profile.",
            "warning"
          );
        }
      })
      .catch(err => {
        console.log("Create user error", err);
      });
  return {
    type: ADD_FAV_RESTAURANT
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_LISTINGS + FULFILLED:
      return Object.assign({}, state, { listings: action.payload });
    case ADD_CURRENT_RESTAURANT + FULFILLED:
      return Object.assign({}, state, { currentRestaurant: action.payload });
    case GET_REVIEWS + FULFILLED:
      return Object.assign({}, state, { reviews: action.payload });
    case GET_USER + FULFILLED:
      return Object.assign({}, state, { user: action.payload });
    case ADD_FAV_RESTAURANT + FULFILLED:
      return Object.assign({}, state);
    case CLEAR_LISTINGS:
      return Object.assign({}, state, { listings: action.payload });
    case CLEAR_RESTAURANT:
      return Object.assign({}, state, { currentRestaurant: action.payload });
    case CLEAR_REVIEWS:
      return Object.assign({}, state, { reviews: action.payload });
    default:
      return state;
  }
}
