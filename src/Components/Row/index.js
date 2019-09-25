import React, { Component } from 'react';
import _ from 'lodash';
import Card from './../Card';

import './index.less';

export default class Row extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { rowData: this.props.rowData };
    // }
    render() {
        const rowData = this.props.rowData;
        const { props: { rank } } = this;
        return (
            <div className="row">
                {
                    _.map(rowData, (item, index) => {
                        return <Card key={index} cardData={item} rank={rank} />
                    })
                }
            </div>
        );
    }
}