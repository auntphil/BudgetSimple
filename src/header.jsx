import { Link } from "react-router-dom";

export default function Header({username}) {
    return(
        <header className="App-header">
            <Link to="/" className="titleLink">
                <div className="title"><span className="budget">BUDGET</span><span className="simple">simple</span></div>
            </Link>
            <div id="username">
                {username.split('@')[0]}
            </div>
        </header>
    );
}