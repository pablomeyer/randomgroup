import React, {Component} from 'react';
import {Container, Menu, Image, Icon, Button} from 'semantic-ui-react'
import l from "./TrilogyEd_Dark.svg";
import ConfigsModal from "./configsmodal"
import LoginModal from "./login";

class MainMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            showingConfigs: false,
            showingLogin : false
        }
    }

    onLogin = (token) => {
        this.props.onLogin(token);
        this.setState({showingLogin : false});
    };

    showConfig = () => {
        this.setState({showingConfigs: true});
    };

    onConfigSaved = () => {
        this.props.onLogout();
        this.closeConfigs();
    };

    closeConfigs = () => {
        this.setState({showingConfigs: false});
    };

    showLogin = () => {
        this.setState({showingLogin : true});
    }

    closeLogin = () => {
        this.setState({showingLogin : false});
    }

    render() {
        const isLogin = this.props.isLogin;
        return (
            <Menu fixed='top' inverted>
                <Container>
                    <Menu.Item as='a' header>
                        <Image size='mini' src={l} style={{marginRight: '1.5em'}}/>
                        Random Group Generator
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item>
                        {isLogin ? (
                            <Button onClick={()=> {this.props.onLogout()}}>Logout</Button>
                        ): (
                            <Button primary onClick={this.showLogin}>Login</Button>
                        ) }
                        </Menu.Item>
                        <Menu.Item icon onClick={this.showConfig} >
                            <Icon name='cog' size='large' />
                        </Menu.Item>
                    </Menu.Menu>
                </Container>
                <ConfigsModal open={this.state.showingConfigs} close={this.closeConfigs} saved={this.onConfigSaved}/>
                <LoginModal   open={this.state.showingLogin}   close={this.closeLogin} onLogin={this.onLogin}/>
            </Menu>
        )
    }
}

export default MainMenu