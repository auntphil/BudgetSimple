export async function getUsername(baseUrl, access, setUsername){

    fetch(`${baseUrl}/api/v1/about/user`, {
        headers: {
            'authorization': `Bearer ${access}`, 
            Accept:	'application/vnd.api+json'
        }
    })
        .then(response => response.json())
        .then(data => {
            setUsername(data.data.attributes.email)
        })
}