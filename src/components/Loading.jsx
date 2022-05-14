import { Spinner } from "react-bootstrap"

const Loading = () => {
    return(
        <div className="loadingWrapper">
            <Spinner animation="grow" variant="success" />
            <span>Loading</span>
        </div>
    )
}

export default Loading