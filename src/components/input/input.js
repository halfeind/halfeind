import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {isEmpty, randomString} from 'halfeind-utils';

import NumberInput from './numberInput';

import iStyle from './he_i.scss';
import gStyle from '../../scss/global/he_g.scss';

class Input extends Component {

    constructor(){
        super();

        this.state=({
            errorMessageRequired: undefined,
            isFocus: false
        });

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }

    render() {
        const { type } = this.props;

        if(type==='number'){
            return this.renderNumberInput();
        }
        else{
            return this.renderInput();
        }
    }
    renderNumberInput(){
        const { label, prefix, suffix, color, value, defaultValue, placeHolder, uppercase, required, errorMessage } = this.props;
        return <NumberInput 
            label={label}
            prefix={prefix}
            suffix={suffix}
            color={color}
            value={value}
            defaultValue={defaultValue}
            placeHolder={placeHolder}
            uppercase={uppercase}
            required={required}
            errorMessage={errorMessage}        
        />
    }

    renderInput(){
        const { label, labelColor, prefix, suffix, color, autoComplete, name, value, defaultValue, placeHolder, uppercase, required, className, errorMessage, type } = this.props;
        const { errorMessageRequired, isFocus } = this.state;

        let inputId = randomString(10);

        let inputStyle = `${iStyle.i} ${className?className:''}`

        let focusStyle = isFocus ? {borderColor: color}: {}
        return (
            <div className={iStyle.mc}>
                {label&&(
                    <div className={`${iStyle.l_c} ${gStyle.ns}`}>
                        <label htmlFor={inputId} className={iStyle.l} style={{color:labelColor}}>{uppercase?label.toUpperCase():label}</label>
                        {required&&(
                            <div className={iStyle.r}>*</div>
                        )}
                    </div>
                )}
                <div className={iStyle.i_c}>
                    {prefix&&(
                        <div className={iStyle.p}>{prefix}</div>
                    )}
                    <input id={inputId} autoComplete={autoComplete} name={name} style={focusStyle} type={type} className={inputStyle} onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} placeholder={placeHolder} value={value} defaultValue={defaultValue} />
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
        const { onFocus } = this.props;

        this.setState({
            isFocus: true,
        })

        if(!onFocus) return;

        onFocus(e);
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
Input.defaultProps = {
    label: undefined,
    labelColor: '#0a244d',
    prefix: undefined,
    suffix: undefined,
    color: '#00AF66',
    autoComplete: undefined,
    name: undefined,
    type: 'text',
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
Input.propTypes = {
    label: PropTypes.string,
    labelColor: PropTypes.string,
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    color: PropTypes.string,
    autoComplete: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
    defaultValue: PropTypes.string,
    placeHolder: PropTypes.string,
    errorMessage: PropTypes.string,
    uppercase: PropTypes.bool,
    required: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
};

export default Input;