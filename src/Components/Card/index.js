import React, { Component } from 'react';

import './index.less';
export default class Card extends Component {
    render() {
        const { props: { cardData, rank } } = this;
        return <span className={cardData === 2 ? 'basic' : cardData === rank ? 'win' : ''}>{cardData !== 0 && cardData}</span>;
    }
}