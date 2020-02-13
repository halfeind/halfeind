import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {isEmpty, randomString} from 'halfeind-utils';

import iStyle from './he_i.scss';

class MaskedInput extends Component {

    constructor(){
        super();

        this.state=({
            errorMessageRequired: undefined
        });

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    render() {
        const { label, value, defaultValue, placeHolder, uppercase, required, errorMessage, type, mask } = this.props;
        const { errorMessageRequired } = this.state;

        let inputId = randomString(10);

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
                    <input id={inputId} type={type} className={iStyle.i} onChange={this.onChange} onBlur={this.onBlur} placeholder={placeHolder} value={value} defaultValue={defaultValue} />
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

        let value = e.target.value;
        let requiredState = this.checkMessageRequired(required, value);

        if(!onBlur || requiredState) return;

        onBlur(e,value);
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
MaskedInput.defaultProps = {
    label: undefined,
    type: 'text',
    value : undefined,
    defaultValue : undefined,
    placeHolder : undefined,
    errorMessage: undefined,
    uppercase: false,
    required: false,
    mask: undefined
}
MaskedInput.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    placeHolder: PropTypes.string,
    errorMessage: PropTypes.string,
    uppercase: PropTypes.bool,
    required: PropTypes.bool,
    mask: PropTypes.string,
};

export default MaskedInput;