import React, {Component} from 'react';
import {
    Table, Segment, Header
} from 'semantic-ui-react'


class CourseSelector extends Component {
    render() {
        return (
            <Segment vertical>
                <Header>Select the course to work with</Header>
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
                                    {course.startDate}
                                </Table.Cell>
                                <Table.Cell>
                                    {course.endDate}
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