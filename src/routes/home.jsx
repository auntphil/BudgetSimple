import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({username}) => {
    return(
        <div id="home">
            <Link to="/budgets" >View Budget</Link>
        </div>
    )
}

export default Home