import React, {Component} from 'react';
import l from './TrilogyEd_Dark.svg'
import  axios from 'axios'
import './App.css';
import {
    Button,
    Container,
    Header,
    Image,
    Menu,
    Segment,
    Input,
    Icon, Popup
} from 'semantic-ui-react'
import CourseSelector from "./courseselector";

const baseUrl =  "http://localhost:8080/open/v1/";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            key: null,
            currentKey: null,
            course: null,
            coursesList: [],
            students: [],
            loading: false
        }
    }

    componentDidMount() {
        this.setKey("NS4yMDE4LTExLTAyIDE2OjEzOjE1LjA4MTAzMyAtMDMwMCAtMDMgbT0rMzU1OC40MzAyMjk1NzA");
    }

    setKey = (key) => {
        this.setState({key: key, loading: true})
        axios.post(baseUrl + "me", null, {headers: {'Content-Type': 'application/json', 'apiKey': key}}
        ).then(response => {
            console.log(response);
            this.setState({coursesList: response.data.courses});
        }).catch(error => {
            console.log(error);
            this.setState({loading:false})
        })
    }

    submitKey = () => {
        this.setKey(this.state.currentKey);
    }

    onKeyChange = (e) => {
        this.setState({currentKey: e.target.value})
    }

    resetKey = () => {
        this.setState({key: null, course: null})
    }

    onCourseSelected = (courseId) =>{
        console.log("Clicked " + courseId)
        this.setState({course: courseId})
    }

    render() {
        return (
            <div className="App">
                <Menu fixed='top' inverted>
                    <Container>
                        <Menu.Item as='a' header>
                            <Image size='mini' src={l} style={{marginRight: '1.5em'}}/>
                            Random Group Generator
                        </Menu.Item>

                        {this.state.key ? (
                            <Menu.Menu position='right'>
                                <Menu.Item>
                                    <Icon name='key'/>
                                    <Popup trigger={<div>{this.state.key.length > 12 ? this.state.key.substring(0,12) + "..." : this.state.key} </div>}>
                                        Current key: {this.state.key}
                                    </Popup>
                                </Menu.Item>
                                <Menu.Item>
                                    <Button size='mini' onClick={this.resetKey}>Change key</Button>
                                </Menu.Item>
                            </Menu.Menu>
                        ) : (
                            <Menu.Menu position='right'>
                                <Menu.Item>
                                    <Input icon='key' iconPosition='left' placeholder='Enter Key ...'
                                           onChange={this.onKeyChange}
                                           action={<Button content="Apply" onClick={this.submitKey}/>}/>
                                </Menu.Item>
                            </Menu.Menu>
                        )}
                    </Container>
                </Menu>

                <Container style={{marginTop: '7em'}}>
                    {this.state.key ? (

                            <CourseSelector coursesList={this.state.coursesList} courseSelected={this.onCourseSelected}/>
                    ) : (
                        <Segment>
                            <Header as='h1'>Welcome to Random Group Generator</Header>
                            <p>Please insert your API KEY to start using the application</p>
                        </Segment>
                    )}
                </Container>
            </div>

        );
    }
}

export default App;
