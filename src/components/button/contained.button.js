import React, { Component } from 'react'
import PropTypes from 'prop-types'

import btnStyle from './he_btn.scss'
import gStyle from '../../scss/global/he_g.scss';

class ContainedButton extends Component {
    constructor(){
        super();

        this.onClick = this.onClick.bind(this);
    }

    render() {
        const { children, disabled, uppercase, backgroundColor, tabindex, className} = this.props;

        const buttonStyle = `${btnStyle.btn} ${btnStyle.cb} ${(disabled?btnStyle.b_d:'')} ${(uppercase?gStyle.u:'')} ${(className?className:'')}`;

        return (
            <div className={btnStyle.mc}>
                <button tabIndex={tabindex} className={buttonStyle} style={{borderColor:backgroundColor, backgroundColor:backgroundColor}} disabled={disabled} onClick={this.onClick}>{children}</button>
            </div>
        );
    }
    onClick(e){
        const { onClick } = this.props;

        if(!onClick) return;

        onClick(e);
    }

}
ContainedButton.defaultProps = {
  children: '',
  disabled: false,
  uppercase: false,
  backgroundColor: '#00AF66',
  tabindex: 0,
  className: undefined,
  onClick: undefined,
}
ContainedButton.propTypes = {
  children: PropTypes.string,
  disabled: PropTypes.bool,
  uppercase: PropTypes.bool,
  backgroundColor: PropTypes.string,
  tabindex: PropTypes.number,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default ContainedButton;