import React, { Component } from 'react';
import PropTypes from 'prop-types';

import btnStyle from './he_btn.scss'
import gStyle from '../../scss/global/he_g.scss';

class OutlineButton extends Component {
    constructor(){
        super();

        this.onClick = this.onClick.bind(this);
    }

    render() {
        const { children, disabled, uppercase, borderColor, tabindex } = this.props;

        const buttonStyle = `${btnStyle.btn} ${btnStyle.ob} ${(disabled ? btnStyle.b_d:'')} ${(uppercase?gStyle.u:'')}`;

        return (
            <div className={btnStyle.mc}>
                <button tabindex={tabindex} className={buttonStyle} style={{color: borderColor, borderColor:borderColor}} disabled={disabled} onClick={this.onClick}>{children}</button>
            </div>
        );
    }
    onClick(e){
        const { onClick } = this.props;

        if(!onClick) return;

        onClick(e);
    }

}
OutlineButton.defaultProps = {
    children: '',
    disabled: false,
    uppercase: false,
    borderColor: '#00AF66',
    tabindex: 0,
    onClick: undefined
}
OutlineButton.propTypes = {
    children: PropTypes.string,
    disabled: PropTypes.bool,
    uppercase: PropTypes.bool,
    borderColor: PropTypes.string,
    tabindex: PropTypes.number,
    onClick: PropTypes.func,
};

export default OutlineButton;