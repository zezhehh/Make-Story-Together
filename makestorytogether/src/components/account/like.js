import React from 'react';
import { fetchItemList, deleteItem } from '../../api/items';
import { List } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../styles/like.css'

class Likes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            likes: []
        }
    }

    componentDidMount() {
        this.fetch()
    }

    fetch = () => {
        fetchItemList('like', '', '', '', this.props.token)
        .then((likes) => {
            this.setState({ likes });
            console.log('likes', likes)
        });
    }

    handleUnlike = (likeId) => {
        deleteItem(this.props.token, likeId, 'like')
        .then(() => this.fetch())
    }

    getItemByModel = (like) => {
        let liked_object = like.liked_object;
        switch (like.model_name) {
            case 'story':
                return (
                    <List.Item actions={[
                        <Link 
                            to={{ pathname: '/just-writing!', state: { storyId: liked_object.id} }}>
                            go to the story
                        </Link>,
                        <span onClick={() => this.handleUnlike(like.id)}>Unlike it</span>
                    ]}>
                        <List.Item.Meta
                            title={liked_object.title}
                            description={liked_object.description}
                        />
                    </List.Item>
                )
            case 'plot':
                return (
                    <List.Item>
                        <List.Item.Meta
                            title={liked_object.content}
                            // description={liked_object.content}
                        />
                    </List.Item>
                )
            case 'character':
                return (
                    <List.Item>
                        <List.Item.Meta
                            title={liked_object.name}
                            description={liked_object.description}
                        />
                    </List.Item>
                )
            case 'writer':
                return (
                    <List.Item>
                        <List.Item.Meta
                            title={liked_object.screen_name}
                            // description={liked_object.description}
                        />
                    </List.Item>
                )
        }
    }

    render() {
        return <List
                    className='like-list'
                    itemLayout="horizontal"
                    dataSource={this.state.likes}
                    renderItem={like => (
                        this.getItemByModel(like)
                    )}
                />
    }
}

const mapStatesToProps = (state) => {
    return {
        token: state.writers.token
    }
}

export default connect(mapStatesToProps)(Likes);
