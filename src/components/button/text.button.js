import React, { Component } from 'react';
import PropTypes from 'prop-types';

import btnStyle from './he_btn.scss'
import gStyle from '../../scss/global/he_g.scss';

class TextButton extends Component {
    constructor(){
        super();

        this.onClick = this.onClick.bind(this);
    }

    render() {
        const { children, disabled, uppercase, textColor, tabindex } = this.props;

        const buttonStyle = `${btnStyle.btn} ${btnStyle.tb} ${(disabled ? btnStyle.b_d:'')} ${(uppercase?gStyle.u:'')}`;

        return (
            <div className={btnStyle.mc}>
                <button tabIndex={tabindex} className={buttonStyle} style={{color:textColor}}  disabled={disabled} onClick={this.onClick}>{children}</button>
            </div>
        );
    }
    onClick(e){
        const { onClick } = this.props;

        if(!onClick) return;

        onClick(e);
    }

}
TextButton.defaultProps = {
    children: '',
    disabled: false,
    uppercase: false,
    textColor: '#00AF66',
    tabindex: 0,
    onClick: undefined
}
TextButton.propTypes = {
    children: PropTypes.string,
    disabled: PropTypes.bool,
    uppercase: PropTypes.bool,
    textColor: PropTypes.string,
    tabindex: PropTypes.number,
    onClick: PropTypes.func,
};

export default TextButton;