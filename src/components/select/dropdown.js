import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {randomString} from 'halfeind-utils';

import ddStyle from './he_dd.scss';
import icnStyle from '../../scss/global/he_icn.scss';

class Dropdown extends Component {

    constructor(){
        super();

        this.state=({
            collapsed: true,
            minOptionsWidth: 0,
        })

        this.changeCollapsed = this.changeCollapsed.bind(this);
    }

    componentDidMount() {
        this.getMinimalWidthOptions();
    }

    render() {
        const { defaultValue, defaultSelectedKey, options, placeHolder, underline } = this.props;
        const { collapsed, minOptionsWidth } = this.state;

        let displayValue = this.getDisplayValue(placeHolder, options, defaultSelectedKey, defaultValue);

        let hcStyle = `${ddStyle.h_c} ${underline?ddStyle.ul:''}`

        return (
            <div ref={he_misc_dd_mc => {this.he_misc_dd_mc = he_misc_dd_mc;}} className={ddStyle.mc} tabIndex="0" onBlur={()=>this.changeCollapsed(true)}>
                <div className={hcStyle} onClick={()=>this.changeCollapsed(!collapsed)}>
                    <div className={ddStyle.h_l}>
                        <div>{displayValue}</div>
                    </div>
                    <div className={ddStyle.h_r}>
                        <div className={icnStyle.a_d}></div>  
                    </div>
                </div>
                {!collapsed && (
                    <div className={ddStyle.o_c} style={{minWidth:minOptionsWidth}} >
                        {options.map(option=>(
                            <div key={randomString(5)} className={`${ddStyle.o} ${(defaultSelectedKey===option.key ? ddStyle.o_a:'')}`} onClick={(e)=>{
                                this.onKeySelected(e, option.key);
                            }}>{option.value}</div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    getMinimalWidthOptions(){
        let minOptionsWidth = this.he_misc_dd_mc.getBoundingClientRect().width;
        this.setState({minOptionsWidth: minOptionsWidth});
    }

    getDisplayValue(placeHolder, options, defaultSelectedKey, defaultValue){
        return placeHolder!==undefined ? placeHolder : (defaultSelectedKey!==undefined ? ( options.find((option)=>option.key===defaultSelectedKey)).value : defaultValue);
    }

    changeCollapsed(state){
        this.setState({
            collapsed: state
        })
    }
    onKeySelected(e,key){
        const {onKeySelected, defaultSelectedKey} = this.props;
        
        this.changeCollapsed(true)
        if(!onKeySelected || key===defaultSelectedKey)return;

        onKeySelected(key);
    }
}
Dropdown.defaultProps = {
    defaultValue : '',
    defaultKey : undefined,
    options: [],
    placeHolder: undefined,
    onKeySelected:undefined,
    underline: false,
}
Dropdown.propTypes = {
    defaultValue: PropTypes.string,
    defaultKey: PropTypes.number,
    options: PropTypes.array,
    placeHolder: PropTypes.string,
    onKeySelected: PropTypes.func,
    underline: PropTypes.false,
};

export default Dropdown;