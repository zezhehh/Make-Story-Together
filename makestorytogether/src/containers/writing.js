import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Writing extends React.Component {
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
        </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.writers.token
    }
}

export default connect(mapStateToProps)(Writing);