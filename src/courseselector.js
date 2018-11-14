import React, {Component} from 'react';
import {
    Table, Segment, Header
} from 'semantic-ui-react'
import moment from 'moment';


class CourseSelector extends Component {
    render() {
        return (
            <Segment vertical>
                <Header as="h2">Select the course to work with</Header>
                <Table selectable basic>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Start Date</Table.HeaderCell>
                            <Table.HeaderCell>End Date</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {this.props.coursesList.map((course) => {
                        const startDate = moment(course.startDate).format('MM-DD-YYYY');
                        const endDate = moment(course.endDate).format('MM-DD-YYYY');
                        return(
                            <Table.Row
                                key={course.id}
                                onClick={(e) => {this.props.courseSelected(course)}}
                            >
                                <Table.Cell>
                                    {course.name}
                                </Table.Cell>
                                <Table.Cell>
                                    {course.id}
                                </Table.Cell>
                                <Table.Cell>
                                    {startDate}
                                </Table.Cell>
                                <Table.Cell>
                                    {endDate}
                                </Table.Cell>
                            </Table.Row>
                            )
                    })}
                    </Table.Body>
                </Table>
            </Segment>
        )
    }
};

export default CourseSelector