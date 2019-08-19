import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Anchor } from 'antd';
import '../styles/writing.css';

const { Link } = Anchor;

const handleClick = (e, link) => {
    e.preventDefault();
    console.log(link);
};

class Writing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storyId: props.location.state.storyId
        }
    }
    

    render() {
        return (
        <div>
            {this.props.token === null ?
                <Redirect
                    to={{
                    pathname: "/profile"
                    }}
                /> : null
            }
            
            <Anchor affix={false} onClick={handleClick} className='storyTOC'>
                <Link href="#components-anchor-demo-basic" title="Basic demo" />
                <Link href="#components-anchor-demo-static" title="Static demo" />
                <Link href="#API" title="API">
                    <Link href="#Anchor-Props" title="Anchor Props" />
                    <Link href="#Link-Props" title="Link Props" />
                </Link>
            </Anchor>
            
        </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.writers.token
    }
}

export default connect(mapStateToProps)(Writing);