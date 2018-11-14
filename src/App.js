import React, {Component} from 'react';
import  axios from 'axios'
import './App.css';
import {
    Container,
    Header,
    Segment,
    Breadcrumb,
    Loader,
    Dimmer,
    Message
} from 'semantic-ui-react'
import CourseSelector from "./courseselector";
import GroupGenerator from "./groupgenerator";
import MainMenu from "./mainmenu"
import {averageMeanGrade, buildurl} from "./helper"

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            token: null,
            course: null,
            coursesList: [],
            students: [],
            loading: false,
            error : null
        }
    }

    onLogin = (token) => {
        this.setState({token: token, loading: true, error: null, course: null, coursesList: []});
        axios.post(buildurl("open/v1/me"), null, {headers: {'Content-Type': 'application/json', 'authToken': token}}
        ).then(response => {
            console.log(response);
            this.setState({coursesList: response.data.courses, error: null, loading: false});
        }).catch(error => {
            console.log(error);
            let err = "";
            if (error.response && error.response.status === 401){
                err = "The login is invalido or the token has expired. Try to relogin.";
            } else {
                err = error.message
            }
            this.setState({loading:false, error: err})
        })
    };

    logout = () => {
        this.setState({token: null, course: null, error: null})
    };

    onCourseSelected = (course) =>{
        this.setState({loading: false});
        console.log("Clicked " + course);
        this.setState({course: course});
        let payload = { "courseId": course.id};
        axios.post(buildurl("open/v1/grades"), payload, {headers: {'Content-Type': 'application/json', 'authToken': this.state.token}})
            .then(response => {
                console.log("Grades Response");
                console.log(response);
                let students = new Map();
                for (let i = 0 ; i < response.data.length; i++) {
                    const grade = response.data[i];
                    if (!students.has(grade.studentName)){
                        students.set(grade.studentName, []);
                    }
                    if (grade.grade !== null ) {
                        students.get(grade.studentName).push(grade.grade);
                    }
                }

                let studentGrades = [];
                for (var [name, gradesArray] of students) {
                    studentGrades.push({
                        studentName: name,
                        grade: averageMeanGrade(gradesArray)
                    });
                }

                this.setState({loading:false, error: null, students: studentGrades});
            })
            .catch(error => {
                let err = "";
                if (error.response && error.response.status === 401){
                    err = "Your user has not permission to use the 'grades' endpoint. Please request an admin to grant permissions to use that endpoint.";
                } else {
                    err = error.message;
                }
                this.setState({loading:false, error: err})

            })
    };

    unselectCourse = () => {
        this.setState({course: null});
    };

    render() {
        const course = this.state.course;
        let breadcrumb;
        if (course != null) {
            breadcrumb = <Breadcrumb>
                <Breadcrumb.Section >Random Group Generator</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right angle' />
                <Breadcrumb.Section link onClick={() => {this.unselectCourse()}}>Select course</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right angle' />
                <Breadcrumb.Section active>Group Generation</Breadcrumb.Section>
            </Breadcrumb>
        } else {
            breadcrumb = <Breadcrumb>
                <Breadcrumb.Section >Random Group Generator</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right angle' />
                <Breadcrumb.Section active>Select course</Breadcrumb.Section>
            </Breadcrumb>
        }

        let mainContent = null;
        if (this.state.error == null){
            if (this.state.token) {
                mainContent =
                    <Container>
                        <div>{breadcrumb}</div>
                        {this.state.course ? (
                            <GroupGenerator course={this.state.course} studentList={this.state.students}/>
                        ):(
                            <CourseSelector coursesList={this.state.coursesList} courseSelected={this.onCourseSelected}/>
                        )}
                    </Container>
            } else {
                mainContent =
                    <Segment>
                        <Header as='h1'>Welcome to Random Group Generator</Header>
                        <p>Please login to start using the application</p>
                    </Segment>
            }
        }

        return (
            <div>
                <MainMenu isLogin={this.state.token != null} onLogout={this.logout} onLogin={this.onLogin}/>
                <Container style={{marginTop: '7em'}}>
                    {this.state.loading === true ? (
                            <Dimmer active inverted>
                                <Loader inverted>Loading</Loader>
                            </Dimmer>
                    ): null}
                    {this.state.error ? (
                        <Message negative>
                            <Message.Header>We're sorry an error occured</Message.Header>
                            <p>{this.state.error}</p>
                        </Message>
                    ) : (null)}
                    {mainContent}
                </Container>
            </div>
        );
    }
}

export default App;
