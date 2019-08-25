import React from 'react';
import { fetchItemList } from '../../api/items';
import { List } from 'antd';
import Moment from 'react-moment';
import '../../styles/feed.css';

class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feeds: []
        }
    }

    componentDidMount() {
        fetchItemList('feed')
        .then((feeds) => {
            this.setState({ feeds });
            console.log('feeds', feeds)
        })
        
    }

    render() {
        return (
            <div className='feed-list'>
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.feeds}
                    renderItem={feed => (
                        <List.Item>
                            <List.Item.Meta
                            title={<Moment format="MM-DD HH:mm">{feed.created_at}</Moment> }
                            description={feed.feed_content}
                            />
                        </List.Item>)}
                />
            </div>
        )
    }
}
 
export default Feed;
