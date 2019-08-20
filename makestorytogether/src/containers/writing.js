import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Anchor, Typography, Button, Icon, Input } from 'antd';
import { fetchItemDetail } from '../api/items';
import { emptyStoryDetail } from '../api/emptyStructure';
import '../styles/writing.css';
const { Title } = Typography;

const { Link } = Anchor;

const handleClick = (e, link) => {
    e.preventDefault();
    console.log(link);
};

class Writing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storyId: null,
            storyDetail: emptyStoryDetail,
            inputPlotVisible: false,
            inputChapterVisible: false,
            value: '',
            chapterTitle: '',
        }
    }

    componentDidMount() {
        this.setState({storyId: props.location.state.storyId},
            () => this.fetch())
    }
    
    fetch = () => {
        fetchItemDetail(this.state.storyId, 'story', this.props.token)
        .then((storyDetail) => {
            this.setState({ storyDetail });
            console.log(this.state.storyDetail);
        })
    }

    handleNewPlot = () => {
        this.setState({inputPlotVisible: false, value: ''})
    }

    handleNewChapter = () => {
        this.setState({inputChapterVisible: false, chapterTitle: ''})
    }

    newPlot = () => {
        return (
            <div>
                {!this.state.inputPlotVisible && <Button onClick={() => this.setState({inputPlotVisible: true})}><Icon type='plus' />New Plot</Button>}
                {this.state.inputPlotVisible && 
                <Input
                    placeholder="Input nothing to quit"
                    value={this.state.value} 
                    onChange={(e) => this.setState({value: e.target.value})} 
                    onPressEnter={this.handleNewPlot} 
                />}
            </div>
        )
    }

    newChapter =() => {
        return (
            <div>
                {!this.state.inputChapterVisible && <Button onClick={() => this.setState({inputChapterVisible: true})}><Icon type='plus' />New Chapter</Button>}
                {this.state.inputChapterVisible && 
                <Input
                    placeholder="Input nothing to quit"
                    value={this.state.chapterTitle} 
                    onChange={(e) => this.setState({chapterTitle: e.target.value})} 
                    onPressEnter={this.handleNewChapter} 
                />}
            </div>
        )
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
            <Title style={{ textAlign: "center", padding: '20px' }}>{this.state.storyDetail.title}</Title>
            <div className='writingPage' style={{ display: 'flex' }}>
                <Anchor affix={false} onClick={handleClick} className='storyTOC'>
                    <Link href="#components-anchor-demo-basic" title="Basic demo" />
                    <Link href="#components-anchor-demo-static" title="Static demo" />
                    <Link href="#API" title="API">
                        <Link href="#Anchor-Props" title="Anchor Props" />
                        <Link href="#Link-Props" title="Link Props" />
                    </Link>
                </Anchor>
                
                <div className='storyEditor'>
                    {this.newPlot()}
                    {this.newChapter()}
                </div>
            </div>
        </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.writers.token
    }
}

export default connect(mapStateToProps)(Writing);