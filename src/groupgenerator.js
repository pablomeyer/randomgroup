import React, {Component} from 'react';
import {
    Segment, Header, Input, Form, Button, Message, Card, Divider
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
        if (error !== "") {
            this.setState({error: error});
            return;
        }

        const studentsPerGroup = parseInt(this.state.groupSize);
        let pendingStudents = this.props.studentList.slice();
        pendingStudents = pendingStudents.map((ps) => {
            const simplifiedGrade = (ps.grade[0] !== '-') ? ps.grade[0] : 'I';
            return {...ps, simplifiedGrade: simplifiedGrade}
        });

        pendingStudents = pendingStudents.sort(function (a, b) {
            if (a.simplifiedGrade > b.simplifiedGrade) return 1;
            if (a.simplifiedGrade < b.simplifiedGrade) return -1;
            return 0;
        });

        let gradeGroupsMap = new Map();
        let curGrade = '';
        let group = [];
        pendingStudents.forEach((ps) => {
            if(ps.simplifiedGrade !== curGrade){
                if(curGrade != '') {
                    gradeGroupsMap.set(curGrade, group);
                }

                group = [];
                curGrade = ps.simplifiedGrade;
            }

            group.push(ps);
        });
        gradeGroupsMap.set(curGrade, group);
        // TODO: randomize simplifiedGrade groups in map

        const availableGradeGroups = [...gradeGroupsMap.keys()];
        const availableStudentsList = [];
        availableGradeGroups.forEach((gg)=>{
           availableStudentsList.push(...gradeGroupsMap.get(gg));
        });

        let groups = [];
        const cantGroups =  Math.ceil(availableStudentsList.length / studentsPerGroup);
        while(availableStudentsList.length > 0){
            for(let i=0; i<cantGroups && availableStudentsList.length > 0; i++){
                const curGroup = groups[i] || [];
                curGroup.push(availableStudentsList[0]);
                availableStudentsList.splice(0, 1);
                groups[i] = curGroup;
            }

            for(let i=(cantGroups-1); i>=0 && availableStudentsList.length > 0; i--){
                console.log(i);
                const curGroup = groups[i] || [];
                curGroup.push(availableStudentsList[0]);
                availableStudentsList.splice(0, 1);
                groups[i] = curGroup;
            }
        }
        groups = groups.sort((a,b) => b.length - a.length);

        this.setState({error: null, studentGroups: groups});
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
                <div>
                    <Header as="h2">Generate Group</Header>
                    <Header as="h4" content={"Course '" + this.props.course.name + "' with " + this.props.studentList.length + " students"}/>

                    <Message info>
                        <Message.Header>Groups types</Message.Header>
                        <Message.List>
                            <Message.Item>Random: Full random group generation</Message.Item>
                            <Message.Item>Even Dispersion: Generate random groups with even grades
                                dispersion</Message.Item>
                        </Message.List>
                    </Message>

                    <Form>
                        <Form.Field error={this.state.error ? true: false} width={4}>
                            <label>Group Size:</label>
                            <Input icon='hashtag' type="number" iconPosition='left' placeholder='Users per group' onChange={this.onGroupSizeChange}/>
                        </Form.Field>
                        {this.state.error ? (
                            <Message negative content={this.state.error} />
                        ):(null)}


                        <div>
                            <Button primary onClick={this.generateRandom}>Random</Button>
                            <Button secondary onClick={this.generateEvenDispersion}>Even Dispersion</Button>
                        </div>
                    </Form>
                </div>

                {this.state.studentGroups ? (
                    <div>
                        <Divider/>
                        <Header as="h3">Student Groups</Header>
                        {this.state.studentGroups.map((group, index) => {
                            return (
                                <div>
                                    <Header as="h4">Group {index+1}</Header>
                                    <Card.Group>
                                        {group.map((student) => {
                                            return <Card
                                                image="/cardUser.jpg"
                                                key={student.studentName}
                                                header={student.studentName}
                                                meta={"Average Grade: "+ student.grade}/>
                                        })}
                                    </Card.Group>
                                    <Divider hidden/>
                                </div>)
                        })}
                    </div>
                ) : (null)}
            </div>
        )
    }
}

export default GroupGenerator