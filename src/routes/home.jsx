import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';
import { getCharts } from '../api/get';
import Loading from '../components/Loading';

const Home = ({username, baseUrl, access}) => {

    const [ charts, setCharts ] = useState({names:[],entry:[]})
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        getCharts(baseUrl, access, setCharts, setLoading)
    }, [])

    return(
        <div id="home">
            { loading ? <Loading /> : "" }
            <Link to="/budgets" >View Budget</Link>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={charts.entry}>
                        <Legend />
                        <Tooltip />
                        {
                            charts.names.map((name)=>{
                                return(
                                    <Line type="monotone" dataKey={name} stroke="#000000" key={name} />
                                )
                            })
                        }
                    </LineChart>
                </ResponsiveContainer>
        </div>
    )
}

export default Home