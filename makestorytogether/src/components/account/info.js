import React from 'react';
import { fetchItemList } from '../../api/items';
import { Statistic, Icon, Card, Timeline, Spin, Row, Col } from 'antd';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import '../../styles/characters.css';
import '../../styles/info.css';


class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {},
            loading: true,
            duration: null
        }
    }

    componentDidMount() {
        fetchItemList('writer', '', '', '', this.props.token)
        .then((list) => {
            if (list.length !== 0) {
                this.setState({ info: list[0], loading: false,
                    duration: moment.duration(moment() - moment(list[0].created_at)).format('h').toString()
                 })
                console.log('info', list[0])
            }
        });
    }

    render() {
        const { timeline } = this.state.info;
        if (this.state.loading) return <Spin />
        return (
        <div style={{ paddingTop: '10px' }}>
            <Card className='info-card' style={{ textAlign: 'center' }}>
            <Row gutter={48}>
                <Col span={8}>
                    <Statistic title="#Like" value={this.state.info.likes_number} prefix={<Icon type="like" />} />
                </Col>
                <Col span={8}>
                    <Statistic title="Registration Time" value={parseInt(this.state.duration)} suffix="hours" />
                </Col>
                <Col span={8}>
                    <Statistic title="Update Cycle in Recent One Week" value={this.state.info.update_cycle} suffix="plots / day" />
                </Col>
            </Row>
            </Card>
            <Card className='info-card'>
            <Timeline className='timeline'>
                {Object.keys(timeline).map((key) => 
                    <Timeline.Item key={key}>
                        {key}  <Moment format="YYYY-MM-DD HH:mm">{timeline[key]}</Moment>
                    </Timeline.Item>
                )}
            </Timeline>
            </Card>
        </div>
    )}
}

const mapStatesToProps = (state) => {
    return {
        token: state.writers.token
    }
}

export default connect(mapStatesToProps)(Info);
