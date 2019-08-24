import React from 'react';
import { fetchItemList } from '../../api/items';
import { List } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../styles/characters.css'

class Characters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            characters: []
        }
    }

    componentDidMount() {
        fetchItemList('character', '', '', '', this.props.token)
        .then((characters) => {
            this.setState({ characters });
            console.log('characters', characters)
        });
    }

    render() {
        return <List
                    className='character-list'
                    itemLayout="horizontal"
                    dataSource={this.state.characters}
                    renderItem={character => (
                    <List.Item actions={[
                        <Link to={{ pathname: '/just-writing!', state: { storyId: character.story} }}>go to the story</Link>
                    ]}>
                        <List.Item.Meta
                            title={character.name}
                            description={character.description}
                        />
                    </List.Item>
                    )}
                />
    }
}

const mapStatesToProps = (state) => {
    return {
        token: state.writers.token
    }
}

export default connect(mapStatesToProps)(Characters);
