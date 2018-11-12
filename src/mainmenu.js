import React, {Component} from 'react';
import {Container, Menu, Image, Icon, Popup, Button, Input} from 'semantic-ui-react'
import l from "./TrilogyEd_Dark.svg";

class MainMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentKey: null,
        }
    }

    onKeyChange = (e) => {
        this.setState({currentKey: e.target.value})
    };

    render() {
        const key = this.props.apikey;
        return (
            <Menu fixed='top' inverted>
                <Container>
                    <Menu.Item as='a' header>
                        <Image size='mini' src={l} style={{marginRight: '1.5em'}}/>
                        Random Group Generator
                    </Menu.Item>

                    {key ? (
                        <Menu.Menu position='right'>
                            <Menu.Item>
                                <Icon name='key'/>
                                <Popup trigger={<div>{key.length > 12 ? key.substring(0,12) + "..." : key} </div>}>
                                    Current key: {key}
                                </Popup>
                            </Menu.Item>
                            <Menu.Item>
                                <Button size='mini' onClick={() => {this.props.resetKey()}}>Change key</Button>
                            </Menu.Item>
                        </Menu.Menu>
                    ) : (
                        <Menu.Menu position='right'>
                            <Menu.Item>
                                <Input icon='key' iconPosition='left' placeholder='Enter Key ...'
                                       onChange={this.onKeyChange}
                                       action={<Button content="Apply" onClick={() => {this.props.submitKey(this.state.currentKey)}}/>}/>
                            </Menu.Item>
                        </Menu.Menu>
                    )}
                </Container>
            </Menu>
        )
    }
}

export default MainMenu