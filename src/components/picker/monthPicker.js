import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCurrentYear, getCurrentMonth, randomString } from 'halfeind-utils';

import dpStyle from './he_dp.scss';
import mpStyle from './he_mp.scss';
import gStyle from '../../scss/global/he_g.scss';
import iStyle from '../../scss/global/he_icn.scss';

export const Month = {
    January: {shortName: 'Jan', numb: 0},
    February: {shortName: 'Feb', numb: 1},
    March:  {shortName: 'Mar', numb: 2},
    April: {shortName: 'Apr', numb: 3},
    May: {shortName: 'May', numb: 4},
    June:  {shortName: 'Jun', numb: 5},
    July: {shortName: 'Jul', numb: 6},
    August:  {shortName: 'Aug', numb: 7},
    September: {shortName: 'Sep', numb: 8},
    October: {shortName: 'Oct', numb: 9},
    November:  {shortName: 'Nov', numb: 10},
    December: {shortName: 'Dec', numb: 11},
}

class MonthPicker extends Component {
    
    constructor(){
        super();
        this.state=({
            newYear: getCurrentYear(),
        })
    }

    componentDidMount(){
        this.getChosenDate();
    }

    render() {
        const { newYear } = this.state; 
        return (
            <div className={dpStyle.mc}>
                <div className={dpStyle.h_c}>
                    <div className={dpStyle.h_si_c}>
                        <div className={`${dpStyle.si_a} ${iStyle.si_a_l}`}onClick={()=>{
                            this.setState({
                                newYear: newYear-1
                        })}
                        }><div className={iStyle.a_l}></div></div>
                        <div className={dpStyle.si_i_c}>
                            <div className={dpStyle.si_i}>
                                {newYear}
                            </div>
                        </div>
                        <div className={`${dpStyle.si_a} ${iStyle.si_a_r}`} onClick={()=>{
                            this.setState({
                                newYear: newYear+1
                        })}
                        }><div className={iStyle.a_r}></div></div>
                    </div>
                </div>
                <div className={`${mpStyle.c} ${gStyle.ns}`}>
                    <div>
                        {this.renderMonths()}
                    </div>
                </div>
            </div>
        );
    }
    getChosenDate(){
        const { year } = this.props;

        this.setState({newYear:year});
    }
    renderMonths(){
        const { year, month } = this.props;
        const { newYear } = this.state;

        const monthKeys = Object.keys(Month);

        return(
            <div className={mpStyle.m_c}>
                {monthKeys.map((key)=>
                    <div key={randomString(10)} className={mpStyle.m}>
                        <div key={randomString(10)} className={`${mpStyle.ic}`} onClick={()=>{
                            this.onChange(Month[key]);
                        }}>
                            <div key={randomString(10)} className={`${Month[key]===month&&year===newYear?mpStyle.am:''}`}>
                                {Month[key].shortName}
                            </div>
                            
                        </div>
                    </div>
                )}
            </div>
        )
    }
    onChange(month){
        const { onChange } = this.props;
        const { newYear } = this.state;
        if(!onChange) return;

        onChange(month,newYear);
    }
}
MonthPicker.defaultProps = {
    month: getCurrentMonth(),
    year: getCurrentYear(),
    onChange: undefined,
}
MonthPicker.propTypes = {
    month: PropTypes.object,
    year: PropTypes.number,
    onChange: PropTypes.func,
};

export default MonthPicker;