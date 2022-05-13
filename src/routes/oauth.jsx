import React, { useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import OAuth2Login from "react-simple-oauth2-login/dist/OAuth2Login";

const Oauth = ({baseUrl, setBaseurl}) => {

    const [ clientid, setClientid ] = useState("")
    const [ clientsecret, setClientsecret ] = useState("")
    
    const onSuccess = (res) => {
        const data = new URLSearchParams()
        data.append("grant_type", "authorization_code")
        data.append("code", res.code)
        data.append("client_id", clientid)
        data.append("client_secret", clientsecret)
        data.append("redirect_uri", "http://localhost:3000/app")

        fetch(`${baseUrl}/oauth/token`, {
            method: 'POST',
            headers: { 
                Accept:	'application/vnd.api+json',
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: data
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("access",data.access_token)
            localStorage.setItem("refresh",data.refresh_token)
            localStorage.setItem("time",Date.now())
            localStorage.setItem("baseurl",baseUrl)
            localStorage.setItem("id",clientid)
            localStorage.setItem("secret",clientsecret)

            window.location.replace('/')
        })

    }

    const onFailure = (err) => {
        console.log(err)
    }

    return(
        <div id="App">
            <h1>Oauth SignIn</h1>
            <Form>
                <Form.Group className="mb-4">
                    <Form.Label htmlFor="baseurl">Firefly III URL</Form.Label>
                    <FormControl id="baseurl" aria-describedby="baseurl" type="text" value={baseUrl} onChange={ e => setBaseurl(e.target.value) } placeholder="https://url.com" />
                    <Form.Text className="text-muted">
                        URL of your Firefly III Instance
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label htmlFor="clientid">Client ID</Form.Label>
                    <FormControl id="clientid" aria-describedby="clientid" value={clientid} onChange={ e => setClientid(e.target.value) } placeholder="1" />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label htmlFor="clientsecret">Client Secret</Form.Label>
                    <FormControl id="clientsecret" aria-describedby="clientsecret" type="text" value={clientsecret} onChange={ e => setClientsecret(e.target.value) } placeholder="15asdf6" />
                </Form.Group>

                <OAuth2Login
                    authorizationUrl={baseUrl+"/oauth/authorize"}
                    responseType="code"
                    clientId={clientid}
                    redirectUri="http://localhost:3000/app"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                />
            </Form>
        </div>
    )
}

export default Oauth