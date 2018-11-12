import React, {Component} from 'react';
import {
    Segment, Header, Input, Form, Button, Message, Card
} from 'semantic-ui-react'


class GroupGenerator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error : null,
            studentGroups : null,
            groupSize : 0,
        }
    }

    onGroupSizeChange = (e) => {
        this.setState({groupSize: e.target.value});
        console.log("On GroupSize Change: " + e.target.value);
    };

    generateRandom = () => {
        const error = this.validateInput();
        if (error !== ""){
            this.setState({error: error});
            return;
        }


        const studentsPerGroup = parseInt(this.state.groupSize);

        let groups = [];
        let group = [];
        let pendingStudents = this.props.studentList.slice();
        while (pendingStudents.length > 0){
            let index = parseInt(Math.random() * pendingStudents.length);
            if (group.length === studentsPerGroup ) {
                groups.push(group);
                group = [];
            }
            group.push(pendingStudents[index]);
            pendingStudents.splice(index, 1);
        }

        if (group.length > 0){
            groups.push(group);
        }

        this.setState({error: null, studentGroups: groups});
    };

    generateEvenDispersion = () => {
        const error = this.validateInput();
        if (error !== ""){
            this.setState({error: error});
            return;
        }
    };

    validateInput = () => {
        const groupSize = this.state.groupSize;

        if (groupSize == null){
            return "You must insert a group size";
        }
        if (groupSize === 0){
            return "You must select a group size greater than 0";
        }

        if (groupSize > this.props.studentList.length){
            return "You cannot select a group size grater than the students in the course";
        }
        return "";
    };

    render() {
        return (
            <div style={{marginTop: '1em'}}>
                <Segment>
                    <Header>Generate Group</Header>
                    <Message
                        content={"Course '" + this.props.course.name + "' with " + this.props.studentList.length + " students"}
                    />
                    <Form>
                        <Form.Field error={this.state.error ? true: false}>
                            <label>Group Size:</label>
                            <Input icon='hashtag' type="number" iconPosition='left' placeholder='Users per group' onChange={this.onGroupSizeChange}/>
                        </Form.Field>
                        {this.state.error ? (
                            <Message negative content={this.state.error} />
                        ):(null)}
                        <Message info>
                            <Message.Header>Groups types</Message.Header>
                            <Message.List>
                                <Message.Item>Random: Full random group generation</Message.Item>
                                <Message.Item>Even Dispersion: Generate random groups with even grades dispersion</Message.Item>
                            </Message.List>
                        </Message>
                        <div>
                            <Button primary onClick={this.generateRandom}>Random</Button>
                            <Button secondary onClick={this.generateEvenDispersion}>Even Dispersion</Button>
                        </div>
                    </Form>
                </Segment>
                {this.state.studentGroups ? (
                    <Segment>
                        <Header as="h2">Student Groups</Header>
                        {this.state.studentGroups.map((group, index) => {
                            return (
                                <Segment>
                                    <Header>Group {index+1}</Header>
                                    <Card.Group>
                                        {group.map((student) => {
                                            return <Card
                                                key={student.studentName}
                                                header={student.studentName}
                                                meta={"Average Grade: "+ student.grade}/>
                                        })}
                                    </Card.Group>
                                </Segment>)
                        })}
                    </Segment>
                ) : (null)}
            </div>
        )
    }
}

export default GroupGenerator