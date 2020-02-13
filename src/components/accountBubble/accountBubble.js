import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {randomHexColor, contrastColor,acronym} from 'halfeind-utils';

import abStyle from './he_ab.scss'


class AccountBubble extends Component {
    render() {
        const { radius, fill, img, label, labelColor, name } = this.props;

        let bubbleColor = contrastColor(fill);
        let accountName = !img && name ? this.getAccountName(name) : '?';

        return (
            <div className={abStyle.mc}>
                <div className={abStyle.in_c} style={{width:radius, height: radius, minWidth:radius, minHeight: radius,  backgroundColor: fill}}>
                    {img?(
                        <img alt='he_ab_alt' className={abStyle.i} src={img}/>
                    ):(
                        <div className={abStyle.n} style={{color:bubbleColor}}>
                            {accountName}
                        </div>
                    )}
                </div>
                {label&&(
                    <div className={abStyle.l_c} style={{color:labelColor}}>{label}</div>
                )}
                
            </div>
        );
    }
    getAccountName(name){
        let acr = acronym(name);
        if(!acr) return '?';
        acr = acr.length>2 ? acr.slice(0, 2) : acr;
        let accountName = acr.join('').toUpperCase();
        return accountName;
    }
}
AccountBubble.defaultProps = {
    radius: 50,
    fill: randomHexColor(),
    img: undefined,
    label: undefined,
    labelColor: '#000',
    name: undefined,
}
AccountBubble.propTypes = {
    radius: PropTypes.number,
    fill: PropTypes.string,
    img: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.object,PropTypes.string]),
    labelColor: PropTypes.string,
    name: PropTypes.string
};

export default AccountBubble;