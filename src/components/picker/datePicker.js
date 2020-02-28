import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCurrentDay, getCurrentMonth, getCurrentYear, getDayByDate, daysInMonth, getMonthName, randomString } from 'halfeind-utils';

import MonthPicker, { Month } from './monthPicker';

import dpStyle from './he_dp.scss';
import gStyle from '../../scss/global/he_g.scss';
import iStyle from '../../scss/global/he_icn.scss';

export const DayOfWeek = {
    Monday: {shortName: 'Mo', numb: 0},
    Tuesday: {shortName: 'Tu', numb: 1},
    Wednesday:  {shortName: 'We', numb: 2},
    Thursday: {shortName: 'Th', numb: 3},
    Friday: {shortName: 'Fr', numb: 4},
    Saturday:  {shortName: 'Sa', numb: 5},
    Sunday: {shortName: 'Su', numb: 6},
}
const NumbToMonthPicker = {
    0: Month.January,
    1: Month.February,
    2: Month.March,
    3: Month.April,
    4: Month.May,
    5: Month.June,
    6: Month.July,
    7: Month.August,
    8: Month.September,
    9: Month.October,
    10: Month.November,
    11: Month.December,
}

class DatePicker extends Component {

    constructor(){
        super();

        this.state=({
            today: {
                d: getCurrentDay(),
                m: getCurrentMonth(),
                y: getCurrentYear(),
            },
            month : getCurrentMonth(),
            year: getCurrentYear(),
            shownPicker: 0,
        });

        this.monthPickerChange = this.monthPickerChange.bind(this);
    }

    render() {
        return (
            this.renderPicker()
        );
    }
    renderPicker(){
        const { year, month, shownPicker } = this.state;
        switch(shownPicker){
            case 0: return this.renderDatePicker();
            case 1: return <MonthPicker month={NumbToMonthPicker[month.numb]} year={year} onChange={this.monthPickerChange}/>;
        }
    }
    renderDatePicker(){
        const { month, year } = this.state; 
    
        return (
            <div className={dpStyle.mc}>
                <div className={dpStyle.h_c}>
                    <div className={dpStyle.h_si_c}>
                        <div className={`${dpStyle.si_a}`}onClick={()=>{
                            this.setState({
                                month: getMonthName(month.numb===0?11:month.numb-1),
                                year: month.numb===0?year-1:year
                        })}
                        }><div className={iStyle.a_l}></div></div>
                        <div className={dpStyle.si_i_c}>
                            <div className={dpStyle.si_i} onClick={()=>this.setState({
                                shownPicker:1
                            })}>
                                {month.name + ' ' + year}
                            </div>
                        </div>

                        <div className={`${dpStyle.si_a}`} onClick={()=>{
                            this.setState({
                                month: getMonthName(month.numb===11?0:month.numb+1),
                                year: month.numb===11?year+1:year
                        })}
                        }><div className={iStyle.a_r}></div></div>
                    </div>
                    {this.renderDateHeader()}
                </div>
                <div className={`${dpStyle.c} ${gStyle.ns}`}>
                    <div>
                        {this.renderDateBody()}
                    </div>
                </div>
            </div>
        );
    }
    renderDateHeader(){
        const { startDay } = this.props;

        const dayOfWeekValues = Object.values(DayOfWeek);
        let orderedValues = this.orderHeaderDays(dayOfWeekValues,startDay.numb)
        return(
            <div className={dpStyle.h_d_c}>
                {orderedValues.map((dayOfWeek)=>
                    <div key={randomString(10)} className={dpStyle.h_d}>{dayOfWeek.shortName}</div>
                )}
            </div>
        )
    }
    renderDateBody(){
        const { month, year } = this.state; 

        let body = [];
        let previousLast = 1;
        let isRenderingDays=true;
        let isRenderingPre=false;

        while(isRenderingDays){
            let result = this.renderDays(previousLast,month.numb,year);
            previousLast = result.lastDay;
            isRenderingDays = result.isRenderingDays;
            isRenderingPre=result.renderingPre;
            body.push(<div key={randomString(10)} className={dpStyle.c_w}>{result.days}</div>)
        }

        return body;
    }
    renderDays(previousLast, month, year){
        const { startDay,showToday } = this.props;
        const { today } = this.state;

        let days = [];
        let isRenderingDays= true;
        let firstDayOfMonth =  previousLast===1 ? getDayByDate(month,previousLast,year).numb-startDay.numb : 0;

        let previousMonth = month===0?11:month-1;
        let nextMonth = month===11?0:month+1;
        let maximumDaysPreviousMonth = daysInMonth(previousMonth,year);
        let maximumDays = daysInMonth(month,year);

        let d_naStyle = `${dpStyle.d} ${dpStyle.d_na}`;

        let daysMonthBefore = firstDayOfMonth-1;

        //renderingPre=firstDayOfMonth<0&&!renderingPre;
        //firstDayOfMonth = -firstDayOfMonth>0?6-firstDayOfMonth:firstDayOfMonth;
        //let daysMonthBefore = firstDayOfMonth<0?renderingPre?(firstDayOfMonth+1+7):firstDayOfMonth+1:firstDayOfMonth-1;

        
        for(daysMonthBefore; daysMonthBefore>-1; daysMonthBefore--){
            let day = maximumDaysPreviousMonth-daysMonthBefore;
            days.push(<div key={randomString(10)} className={d_naStyle} onClick={()=>{
                this.onChange(previousMonth,day,month===0?year-1:year)
            }}>{day}</div>)
        }

        let amount = maximumDays-(previousLast);
        for(let daysCurrentMonth = previousLast; daysCurrentMonth < previousLast+7-firstDayOfMonth; daysCurrentMonth++){
            if(daysCurrentMonth>=maximumDays+1){
                break;
            }
            let isToday = showToday&&today.d.date===daysCurrentMonth&&today.m.numb===month&&today.y===year;
            let tdStyle = `${isToday?dpStyle.d_td:''}`;
            days.push(<div key={randomString(10)} className={dpStyle.d} onClick={()=>this.onChange(month,daysCurrentMonth,year)}><div className={tdStyle}>{daysCurrentMonth}</div></div>)
        }
        if(7-amount>0){
            for(let daysMonthAfter = 1; daysMonthAfter<7-amount; daysMonthAfter++){
                days.push(<div key={randomString(10)} className={d_naStyle} onClick={()=>{
                    this.onChange(nextMonth,daysMonthAfter,month===11?year+1:year)
                    //this.changeDate(nextMonth,year);
                }
                
                }>{daysMonthAfter}</div>)
            }
            isRenderingDays= false;
        }


        return {lastDay: previousLast+7-firstDayOfMonth, days: days, isRenderingDays: isRenderingDays};
    }
    orderHeaderDays(days,startIndex){
        let indexOrder = [];
        indexOrder.push(startIndex);
        let i = startIndex===6?0:startIndex+1;
        while(i!=startIndex){
            indexOrder.push(i);
            i = i===6?0:i+1;
        }
        const ordered = indexOrder.map(index => days[index]);

        return ordered;
    }
    changeDate(month,year){
        // this.setState({
        //     month: getMonthName(month),
        //     year: month===-1?year-1:year
        // });
    }
    monthPickerChange(month,year){
        this.setState({
            month : getMonthName(month.numb),
            year: year,
            shownPicker:0
        })
    }
    onChange(month,day,year){
        const { onChange } = this.props;
        if(!onChange) return;
        onChange(getMonthName(month),day,year);
        
    }
}
DatePicker.defaultProps = {
    startDay: DayOfWeek.Monday,
    showToday: false,
    onChange: undefined,
}
DatePicker.propTypes = {
    startDay: PropTypes.object,
    showToday: PropTypes.bool,
    onChange: PropTypes.func,
};

export default DatePicker; 