import React from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown, Icon, Button } from 'antd';
import { fetchItemList } from '../../api/items';
import { createCharacter } from '../../actions/stories';
import '../../styles/characterForm.css';

class CharacterDropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            characters: [],
            selectedCharacter: null
        }
    }

    componentDidMount() {
        this.fetch(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedCharacter !== this.props.selectedCharacter){
            this.fetch(this, true)
        }
    }

    fetch = (that, updateSelected=false) => {
        fetchItemList('character', '', '', that.props.storyId, that.props.token)
        .then((characters) => {
            that.setState({ characters }, () => {
                if(that.state.selectedCharacter === null && characters.length !== 0) {
                    that.props.that.setState({ selectedCharacter: characters[0].id });
                }
            });
            if (updateSelected) {
                let selectedCharacter = characters.find((character) => character.id === that.props.selectedCharacter);
                that.setState({ selectedCharacter })
            }
        })
    }

    onClick = ({ key }) => {
        if (key === 'btn') {
            this.props.createCharacter()
        } else { // eslint-disable-next-line
            let selectedCharacter = this.state.characters.find((character) => {return character.id == key});
            this.props.that.setState({ selectedCharacter: selectedCharacter.id });
            this.setState({ selectedCharacter });
        }
    }

    getDefaultCharacter = () => {
        if (this.state.selectedCharacter !== null) {
            return this.state.selectedCharacter.name;
        }
        let character = this.state.characters.find((character) => character.default);
        if (character === undefined) {
            character = this.state.characters[0];
        }
        return character.name;
    }

    render() {
        const menu = (
            <Menu onClick={this.onClick}>
                {this.state.characters.map((character) => 
                    <Menu.Item key={character.id}>{character.name}</Menu.Item>    
                )}
                <Menu.Item key='btn'>
                    <span>New Character</span>
                </Menu.Item>
            </Menu>
        );
        return (
            <div>
            {this.state.characters.length === 0 ? 
                <Button onClick={() => this.props.createCharacter()}className='new-character-btn'>New Character</Button> : 
                <Dropdown overlay={menu}>
                    <div>
                        <span style={{ marginRight: '5px' }}>{this.getDefaultCharacter()}</span>
                        <Icon type="down" />
                    </div>
                </Dropdown>
            }
            
            </div>
        )
    }
}


const mapStatesToProps = state => {
    return {
        token: state.writers.token,
        writing_status: state.stories.writing_status
    }
}

export default connect(mapStatesToProps, {createCharacter})(CharacterDropDown);
