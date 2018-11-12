import React, {Component} from 'react';
import {Container, Menu, Image, Icon, Popup, Button, Input} from 'semantic-ui-react'
import l from "./TrilogyEd_Dark.svg";
import ConfigsModal from "./configsmodal"

class MainMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentKey: null,
            showingConfigs: false
        }
    }

    onKeyChange = (e) => {
        this.setState({currentKey: e.target.value})
    };

    showConfig = () => {
        this.setState({showingConfigs: true});
    };

    closeConfigs = () => {
        this.setState({showingConfigs: false});
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
                    <Menu.Menu position='right'>
                    {key ?
                        [  <Menu.Item key={"key"}>
                                <Icon name='key'/>
                                <Popup trigger={<div>{key.length > 12 ? key.substring(0,12) + "..." : key} </div>}>
                                    Current key: {key}
                                </Popup>
                            </Menu.Item>,
                            <Menu.Item key={"button"}>
                                <Button size='mini' onClick={() => {this.props.resetKey()}}>Change key</Button>
                            </Menu.Item>
                        ]
                     : (
                            <Menu.Item>
                                <Input icon='key' iconPosition='left' placeholder='Enter Key ...'
                                       onChange={this.onKeyChange}
                                       action={<Button content="Apply" onClick={() => {this.props.submitKey(this.state.currentKey)}}/>}/>
                            </Menu.Item>
                    )}
                        <Menu.Item icon onClick={this.showConfig} >
                            <Icon name='cog' size='large' />
                        </Menu.Item>
                    </Menu.Menu>
                </Container>
                <ConfigsModal open={this.state.showingConfigs} close={this.closeConfigs}/>
            </Menu>

        )
    }
}

export default MainMenu