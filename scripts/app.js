import {
    fetchData
} from "./data/fetch.js";
import {
    popUpToggler
} from "./popUp.js";
import {
    renderMap
} from "./Three/render.js"


// render Three
renderMap();

// data fetching
fetchData();

// elements
popUpToggler;