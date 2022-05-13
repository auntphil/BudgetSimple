import { getUsername } from "./get"

export async function getRefreshToken(refresh, baseUrl){
    const data = new URLSearchParams()
    data.append("grant_type", "refresh_token")
    data.append("refresh_token", refresh)
    data.append("client_id", "5")
    data.append("client_secret", "drEAWVcZMIJUwrdBTkvC471IuSoRo1DCZZg39a4Y")

    fetch(`${baseUrl}/oauth/token`, {
        method: 'POST',
        headers: { 
            Accept:	'application/vnd.api+json',
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data
    })
        .then(response => response.json()
        .then(data => {
            if(typeof data.access_token !== "undefined"){
                    localStorage.setItem("access",data.access_token)
                    localStorage.setItem("refresh",data.refresh_token)
                    localStorage.setItem("time",Date.now())
                    getUsername(baseUrl, data.access_token)
            } else {
                console.log("Error Refreshing Token: " + data.message)
            }
        }))
}