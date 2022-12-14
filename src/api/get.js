const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function getMonth(d){
    return monthNames[d.getMonth()];
}

function getCurrentMonthFirstDay(){
    let d = new Date()
    return `${d.getFullYear().toString()}-${(d.getMonth() + 1).toString()}-01`
}

function getCurrentMonthLastDay(){
    const d = new Date()
    const l=  new Date(d.getFullYear(), d.getMonth() + 1, 0)
    return `${l.getFullYear().toString()}-${(l.getMonth() + 1).toString()}-${l.getDate().toString()}`

}

export async function getUsername(baseUrl, access, setUsername){
    fetch(`${baseUrl}/api/v1/about/user`, {
        headers: {
            'authorization': `Bearer ${access}`
        }
    })
    .then(response => response.json())
    .then(data => {
        setUsername(data.data.attributes.email)
    })
}

export async function getBudgets(baseUrl, access, setBudgets, setLoading){
    const firstDay = getCurrentMonthFirstDay()
    const lastDay = getCurrentMonthLastDay()
    fetch(`${baseUrl}/api/v1/budget-limits?start=${firstDay}&end=${lastDay}`,{
        headers: {
            'authorization': `Bearer ${access}`
        }
    })
    .then(response => response.json())
    .then(limits => {

        fetch(`${baseUrl}/api/v1/budgets?start=${firstDay}&end=${lastDay}`,{
            headers: {
                'authorization': `Bearer ${access}`
            }
        })
        .then(response => response.json())
        .then(data => {
            limits.data.map( (l)=> {
                for(let i = 0; i < data.data.length; i++){
                    if( l.attributes.budget_id == data.data[i].id ){
                        l.attributes.name = data.data[i].attributes.name
                        l.attributes.percent = parseFloat((Math.abs(l.attributes.spent) / l.attributes.amount) ).toFixed(2)
                        l.attributes.remaining = parseFloat(l.attributes.amount - (Math.abs(l.attributes.spent))).toFixed(2)
                        break
                    }
                }
            })
            
            setBudgets(limits.data)
            setLoading(false)
        })
        .catch(error => {
         console.error('Error:', error)   
        })   
    })
    .catch(error => {
     console.error('Error:', error)   
    })
}