import React, {Component} from 'react';
import {
    Card, Segment, Header
} from 'semantic-ui-react'


class CourseSelector extends Component {
    render() {
        return (
            <Segment>
                <Header>Select the course to work with</Header>
                <Card.Group>
                    {this.props.coursesList.map((course) => {
                        return(
                            <Card
                                key={course.id}
                                link
                                onClick={(e) => {this.props.courseSelected(course)}}
                                header={course.name}
                                meta={course.id}
                                description={"From: " + course.startDate + " To: " + course.endDate}
                            />
                            )
                    })}
                </Card.Group>
            </Segment>
        )
    }
};

export default CourseSelector