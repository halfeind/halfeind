import React, { Component } from 'react';
import PropTypes from 'prop-types';

import chkStyle from './he_chk.scss'

class Checkbox extends Component {

    constructor(){
        super();

        this.state=({
            isChecked: false,
        });

        this.changeChecked = this.changeChecked.bind(this);
    }

    componentDidMount(){
        const { checked } = this.props;

        this.changeChecked(checked, true);
    }

    render() {
        const { label, disabled } = this.props;
        const { isChecked } = this.state;

        const checkboxStyle = `${chkStyle.chk} ${(disabled ? chkStyle.d:'')} ${(isChecked?chkStyle.chck:chkStyle.uchck)}`;

        return (
            <div className={chkStyle.mc}>
                <div className={chkStyle.c}>
                    <div className={checkboxStyle} onClick={()=>this.changeChecked(!isChecked,false)}></div>
                </div>
                {label&&(
                    <div className={chkStyle.l_c}>
                        <div className={chkStyle.l} onClick={()=>this.changeChecked(!isChecked,false)}>{label}</div>
                    </div>
                )}
               
                
            </div>
        );
    }
    changeChecked(state, init){
        const{ disabled } = this.props;

        if(disabled&&!init) return;

        this.setState({
            isChecked: state
        },()=>this.onChange(state))
    }
    onChange(state){
        const { onChange } = this.props;

        if(!onChange) return;

        onChange(state);
    }
}
Checkbox.defaultProps = {
    label:undefined,
    disabled: undefined,
    checked: false,
    onChange: undefined,
}
Checkbox.propTypes = {
    label: PropTypes.string,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Checkbox;