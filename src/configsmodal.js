import React, {Component} from 'react';
import {Button, Input, Modal, Form} from 'semantic-ui-react'
import {saveBaseUrl, getBaseUrl} from "./helper"

class ConfigsModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            host : getBaseUrl()
        }
    }


    saveConfigs = () => {
        saveBaseUrl(this.state.host);
        this.props.close();
    };

    onBaseUrlChange = (e) => {
        this.setState({host : e.target.value})
    };

    onCancel = () => {
        this.props.close();
        this.setState({host: getBaseUrl()});
    };

    render() {
        return (
            <Modal open={this.props.open} size={'tiny'}
                   closeOnEscape={false} closeOnDimmerClick={false}>
                <Modal.Header>Configuration</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>API Base URL</label>
                            <Input placeholder='API URL' onChange={this.onBaseUrlChange} value={this.state.host}/>
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.onCancel} negative>
                        Cancel
                    </Button>
                    <Button onClick={this.saveConfigs} positive>
                        Save
                    </Button>

                </Modal.Actions>
            </Modal>
        )
    }
}

export default ConfigsModal
