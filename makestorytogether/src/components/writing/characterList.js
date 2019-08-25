import React from 'react';
import { List, message, Spin } from 'antd';
import { connect } from 'react-redux'
import { getCharacters } from '../../api/stories';
import { createItem } from '../../api/items';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Animate from 'rc-animate';
import '../../styles/characterList.css'

class CharacterList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            characters: [],
            loading: true
        }
    }
    componentDidMount() {
        if (this.props.storyId === null) return
        console.log(this.props.storyId)
        this.fetch()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.storyId !== this.props.storyId || prevProps.writing_status !== this.props.writing_status) {
            this.fetch()
        }
    }

    fetch = () => {
        getCharacters(this.props.token, this.props.storyId)
        .then((characters) => {
            this.setState({ characters, loading: false })
        })
    }

    handleLike = (characterid) => {
        createItem(this.props.token, {
            liked_object: {
                id: characterid,
                model_name: 'character',
                app_label: 'stories'
            }
        }, 'like')
        .then((res) => {
            res.success ? message.info('Go to profile to see your like list~') :
            message.info('You already liked it!');
        })
    }

    render() {
        return (
            <List
                className='character-list'
                itemLayout="horizontal"
                dataSource={this.state.characters}
                renderItem={character => (
                <List.Item actions={[
                    <div onClick={() => this.handleLike(character.id)}>Like it!</div>
                ]}>
                    <List.Item.Meta
                        title={character.name}
                        description={character.description}
                    />
                </List.Item>
                )}
            />
        )}
}

const mapStateToProps = (state) => {
    return {
        token: state.writers.token,
        screen_name: state.writers.screen_name,
        writing_status: state.stories.writing_status
    }
}

export default connect(mapStateToProps)(CharacterList);

