import React from "react";
import {Link} from "react-router-dom"


const NotFound = () => (
    <div>
        <h3>Sorry, we could not find what you want</h3>
        <Link to="/">Go to main page </Link>
    </div>
);


export default NotFound;