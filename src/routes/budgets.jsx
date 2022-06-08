import { useEffect, useState } from "react"
import { getBudgets, getMonth } from "../api/get"
import Loading from '../components/Loading'

import "../styles/budgets.css"

const Budgets = ({baseUrl, access}) => {

    const [ loading, setLoading ] = useState(true)
    const [ budgets, setBudgets ] = useState([])

    useEffect(() => {
        getBudgets(baseUrl, access, setBudgets, setLoading)
    }, [])

    return(
        <div id="budget" className="budget-all">
            { loading ? <Loading /> : ""}
            <div id="subHeader">
                <h1>{getMonth(new Date())} Budget</h1>   
            </div>
            <div id="budgetList">
                {budgets.map( (b, index) => (
                    <div className="budgetItem" key={index}>
                        <div className={b.attributes.remaining < 0 ? "remaining text-danger" : ( b.attributes.percent > 0.80 ? "remaining text-warning" : "remaining" )}>
                            {b.attributes.currency_symbol}{Math.abs(b.attributes.remaining)}
                        </div>
                        <div className="title">{b.attributes.name}</div>
                        <div className="amount">
                            /{b.attributes.currency_symbol}{parseFloat(b.attributes.amount).toFixed(0)}
                        </div>
                        <div className="budgetBarwrapper">
                            <div className="inner">
                                <div className={b.attributes.remaining < 0 ? "budgetBar bg-danger" : ( b.attributes.percent > 0.80 ? "budgetBar bg-warning" : "budgetBar bg-success" )} style={{ width: b.attributes.percent > 1 ? "100%" : (b.attributes.percent * 100)+"%"}}></div>
                                <div className="overage bg-danger" style={{width: ( b.attributes.percent > 1 ? ((b.attributes.percent - 1) * 100)+"%" : "0%")}}></div>
                            </div>
                        </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default Budgets