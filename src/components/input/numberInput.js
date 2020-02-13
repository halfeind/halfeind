import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {isEmpty, randomString} from 'halfeind-utils';

import iStyle from './he_i.scss';

class NumberInput extends Component {

    constructor(){
        super();

        this.state=({
            errorMessageRequired: undefined,
            isFocus: false,
        });

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }

    render() {
        const { label, prefix, suffix, color, value, defaultValue, placeHolder, uppercase, required, errorMessage } = this.props;
        const { errorMessageRequired, isFocus } = this.state;

        let inputId = randomString(10);

        let focusStyle = isFocus ? {borderColor: color}: {}
        return (
            <div className={iStyle.mc}>
                {label&&(
                    <div className={iStyle.l_c}>
                        <label htmlFor={inputId} className={iStyle.l}>{uppercase?label.toUpperCase():label}</label>
                        {required&&(
                            <div className={iStyle.r}>*</div>
                        )}
                    </div>
                )}
                <div className={iStyle.i_c}>
                    {prefix&&(
                        <div className={iStyle.p}>{prefix}</div>
                    )}
                    <input id={inputId} style={focusStyle} type='number' className={iStyle.i} onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} placeholder={placeHolder} value={value} defaultValue={defaultValue} />
                    {suffix&&(
                        <div className={iStyle.s}>{suffix}</div>
                    )}
                </div>
                {(errorMessage||errorMessageRequired)&&(
                    <div className={iStyle.e_c}>
                        <div className={iStyle.e}>{errorMessageRequired?errorMessageRequired:errorMessage}</div>
                    </div>
                )}
            </div>
        );
    }
    onChange(e){
        const { required, onChange } = this.props;

        let value = e.target.value;
        let requiredState = this.checkMessageRequired(required, value);

        if(!onChange || requiredState) return;

        onChange(e,value);
    }
    onBlur(e){
        const { required, onBlur } = this.props;
        this.setState({
            isFocus: false,
        })

        let value = e.target.value;
        let requiredState = this.checkMessageRequired(required, value);

        if(!onBlur || requiredState) return;

        onBlur(e,value);
    }
    onFocus(e){
        this.setState({
            isFocus: true,
        })
    }
    checkMessageRequired(state,value){
        if(state){
            if(isEmpty(value)){
                this.changeMessageRequiredState('Required');
                return true;
            }
            else{
                this.changeMessageRequiredState(undefined);
                return false
            }
        }
        return false;
    }
    changeMessageRequiredState(state){
        this.setState({
            errorMessageRequired: state
        });
    }
}
NumberInput.defaultProps = {
    label: undefined,
    prefix: undefined,
    suffix: undefined,
    color: '#00AF66',
    value : undefined,
    defaultValue : undefined,
    placeHolder : undefined,
    errorMessage: undefined,
    uppercase: false,
    required: false,
    onChange: undefined,
    onBlur: undefined,
    onFocus: undefined,
}
NumberInput.propTypes = {
    label: PropTypes.string,
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    color: PropTypes.string,
    value: PropTypes.number,
    defaultValue: PropTypes.string,
    placeHolder: PropTypes.string,
    errorMessage: PropTypes.string,
    uppercase: PropTypes.bool,
    required: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
};

export default NumberInput;