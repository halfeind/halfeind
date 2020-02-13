import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { randomString } from 'halfeind-utils';

import { Style } from '../style/index';

import swtStyle from './he_swt.scss';
import gStyle from '../../scss/global/he_g.scss';

class Switch extends Component {

    constructor(){
        super();

        this.state=({
            active: false
        })
    }

    componentDidMount(){
        const { defaultChecked } = this.props;
        this.toggleSwitch(defaultChecked);
    }

    render() {
        const { label, uppercase, switchStyle, activeColor, inactiveColor, activeSuffix,inactiveSuffix } = this.props;
        const { active } = this.state;

        let switchId = randomString(10);

        let scStyle = `${swtStyle.sc} ${switchStyle.numb?swtStyle.sc_b:swtStyle.sc_he} ${active?swtStyle.sc_on:''}`;
        let sStyle = `${swtStyle.s} ${switchStyle.numb?swtStyle.s_b:swtStyle.s_he} ${active?swtStyle.s_on:''}`;

        let suffixLabel = active?activeSuffix:inactiveSuffix;

        return (
            <div className={swtStyle.mc}>
                {/* {label&&(
                    <div className={swtStyle.lc}>
                        <label htmlFor={switchId} className={swtStyle.l}>{uppercase?label.toUpperCase():label}</label>
                    </div>
                )} */}
                <div className={swtStyle.cc} onClick={()=>this.toggleSwitch(!active)}>
                    <div className={scStyle} style={{backgroundColor:active?activeColor:inactiveColor}}>
                        {/* <div className={`${swtStyle.s_t} ${swtStyle.s_t_on} ${gStyle.ns}`}>0</div> */}
                        <div className={sStyle}></div>
                        {/* <div className={`${swtStyle.s_t} ${swtStyle.s_t_off} ${gStyle.ns}`}>1</div> */}
                    </div>
                </div>
                {(activeSuffix||inactiveSuffix)&&(
                    <div className={swtStyle.suffc}>
                        <div className={`${swtStyle.suff} ${gStyle.ns}`} onClick={()=>this.toggleSwitch(!active)}>{suffixLabel}</div>
                    </div>
                )}
            </div>
        );
    }
    toggleSwitch(state){
        this.setState({
            active: state
        },this.onChange)
    }
    onChange(){
        const { onChange } = this.props;
        const { active } = this.state;

        if(!onChange) return;

        onChange(active);
    }
}
Switch.defaultProps = {
    label: undefined,
    activeSuffix:undefined,
    inactiveSuffix:undefined,
    defaultChecked : false,
    uppercase: false,
    activeColor: '#00AF66',
    inactiveColor: 'rgb(171, 171, 173)',
    switchStyle: Style.Default,
    onChange: undefined,
}
Switch.propTypes = {
    label: PropTypes.string,
    activeSuffix: PropTypes.string,
    inactiveSuffix: PropTypes.string,
    defaultChecked: PropTypes.bool,
    uppercase: PropTypes.bool,
    activeColor: PropTypes.string,
    inactiveColor: PropTypes.string,
    switchStyle: PropTypes.object,
    onChange: PropTypes.func,
};

export default Switch;