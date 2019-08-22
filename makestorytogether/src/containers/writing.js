import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Button } from 'antd';
import { fetchItemDetail } from '../api/items';
import { emptyStoryDetail } from '../api/emptyStructure';
import { storyEditIcon } from '../components/writing/writingElement';
import PlotEditor from '../components/writing/plotEditor';
import '../styles/writing.css';
import ChapterEditor from '../components/writing/chapterEditor';
const { Title } = Typography;


class Writing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storyId: null,
            storyDetail: emptyStoryDetail,
            currentChapterId: null,
            lastChapterId: null,
            editMode: false,
        }
    }

    componentWillMount() {
        this.setState({storyId: this.props.location.state.storyId},
            () => this.fetch())
    }

    fetch = () => {
        fetchItemDetail(this.state.storyId, 'story', this.props.token)
        .then((storyDetail) => {
            this.setState({ storyDetail });
        })
    }

    render() {
        
        return (
        <div className='writing'>
            {this.props.token === null ?
                <Redirect
                    to={{
                    pathname: "/profile"
                    }}
                /> : null
            }

            <Title style={{ textAlign: "center", padding: '20px' }}>
                <RouterLink to={`/story/${this.state.storyDetail.id}`} style={{ color: 'initial' }}>{this.state.storyDetail.title}</RouterLink>
                {storyEditIcon(this)}
                <br />
                <div style={{ fontSize: 'initial' }}>{this.state.storyDetail.creator}</div>
            </Title>

            {this.state.editMode ? 
            <div className='storyToolBar'>
                <Button type='primary' style={{ marginRight: '15px' }}>Clear empty contents</Button>
                <Button type='danger'>Remove all invalid plots</Button>
            </div>
            : null}

            <div className='writingPage'>
                <ChapterEditor 
                    that={this}
                    editMode={this.state.editMode}
                />
                
                <PlotEditor 
                    that={this}
                    currentChapterId={this.state.currentChapterId}
                    editMode={this.state.editMode}
                />
            </div>
        </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.writers.token,
        screen_name: state.writers.screen_name
    }
}

export default connect(mapStateToProps)(Writing);
