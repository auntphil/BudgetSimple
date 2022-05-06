import React from "react";
import { Button, Form, FormControl } from "react-bootstrap";

class Oauth extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            baseurl: '',
            clientid: '',
            clientsecret: ''
        }
    }

    update_baseurl = (value) => this.setState({baseurl:value})
    update_clientid = (value) => this.setState({clientid:value})
    update_clientsecret = (value) => this.setState({clientsecret:value})

    save_oauth = () => {
        localStorage.setItem("baseurl",this.state.baseurl)
        localStorage.setItem("clientid",this.state.clientid)
        localStorage.setItem("clientsecret",this.state.clientsecret)

        this.props.update_localStorage(true)
    }

    render(){
        return(
            <div id="App">
                <h1>Oauth SignIn</h1>
                <Form>
                    <Form.Group className="mb-4">
                        <Form.Label htmlFor="baseurl">Firefly III URL</Form.Label>
                        <FormControl id="baseurl" aria-describedby="baseurl" type="text" value={this.state.baseurl} onChange={ e => this.update_baseurl(e.target.value) } placeholder="https://url.com" />
                        <Form.Text className="text-muted">
                            URL of your Firefly III Instance
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label htmlFor="clientid">Client ID</Form.Label>
                        <FormControl id="clientid" aria-describedby="clientid" value={this.state.clientid} onChange={ e => this.update_clientid(e.target.value) } placeholder="1" />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label htmlFor="clientsecret">Client Secret</Form.Label>
                        <FormControl id="clientsecret" aria-describedby="clientsecret" type="password" value={this.state.clientsecret} onChange={ e => this.update_clientsecret(e.target.value) } placeholder="15asdf6" />
                    </Form.Group>

                    <Button className="btn-lg center-block" onClick={this.save_oauth}>Sign In</Button>
                </Form>
            </div>
        );
    }
}

export default Oauth