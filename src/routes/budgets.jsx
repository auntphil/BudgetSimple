import { useEffect, useState } from "react"
import { getBudgets } from "../api/get"
import Loading from '../components/Loading'

import "../styles/budgets.css"

const Budgets = ({baseUrl, access}) => {

    const [ loading, setLoading ] = useState(true)
    const [ budgets, setBudgets ] = useState([])

    useEffect(() => {
        getBudgets(baseUrl, access, setBudgets, setLoading)
    })

    return(
        <div id="budget" className="budget-all">
            { loading ? <Loading /> : ""}
            <div id="subHeader">
                <h1>Budgets</h1>   
            </div>
            {budgets.map( (b, index) => (
                <div className="budgetItem" key={index}>
                    <div>{b.attributes.name}</div>
                    <div>
                        <span className={parseFloat(b.attributes.amount - (-b.attributes.spent)).toFixed(b.attributes.currency_decimal_places) < 0 ? "remaining text-danger" : "remaining"}>
                            {b.attributes.currency_symbol}{parseFloat(b.attributes.amount - (-b.attributes.spent)).toFixed(b.attributes.currency_decimal_places)}
                        </span>
                        /
                        <span className="amount">
                            {b.attributes.currency_symbol}{parseFloat(b.attributes.amount).toFixed(b.attributes.currency_decimal_places)}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Budgets