import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'halfeind-utils';

import {Input} from '../input/index';
import { ContainedButton, OutlineButton } from '../button/index';

import tpStyle from './he_tp.scss';
import iStyle  from '../../scss/global/he_icn.scss';

export const TimeFormat = {
    Hour:{numb:0},
    HourMinute: {numb:1},
    HourMinuteSecond : {numb:2},
}

class TimePicker extends Component {

    constructor(){
        super();
        
        this.state=({
            collapsed: false,
            isAM: true,
            hour: 12,
            minutes: 35,
            seconds: 55,
        })

        this.change12HourPeriod = this.change12HourPeriod.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }

    componentDidMount(){
        const { defaultValue } = this.props;
        this.stringToTime(defaultValue);
    }

    render() {
        const { is12Hour, timeFormat } = this.props;
        const { collapsed, hour, minutes, seconds, isAM } = this.state;
        return (
            <div className={tpStyle.mc}>
                <div className={tpStyle.hc}>

                </div>
                <div className={tpStyle.cc}>
                    <Input placeHolder='Select Time' onBlur={this.onBlur} onFocus={this.onFocus}/>
                </div>
                {!collapsed&&(
                    <div className={tpStyle.omc}>
                        <div className={tpStyle.oc}>
                            <div className={tpStyle.o}>
                                <div className={`${iStyle.a_u} ${tpStyle.a}`} onClick={()=>{this.changeHour(0)}}></div>
                                <div className={tpStyle.ti}>
                                    <Input value={hour} onChange={(e,value)=>this.changeHour(null,value)} />
                                </div>
                                <div className={`${iStyle.a_d} ${tpStyle.a} ${tpStyle.a_d}`} onClick={()=>{this.changeHour(1)}}></div>
                            </div>
                            {timeFormat.numb>=1&&(
                                <>
                                    <div className={tpStyle.s}>
                                        <div>:</div>
                                    </div>
                                    <div className={tpStyle.o}>
                                        <div className={`${iStyle.a_u} ${tpStyle.a}`} onClick={()=>{this.changeMinutes(0)}}></div>
                                        <div className={tpStyle.ti}>
                                            <Input value={minutes} onChange={(e,value)=>this.changeMinutes(null,value)}/>
                                        </div>
                                        <div className={`${iStyle.a_d} ${tpStyle.a} ${tpStyle.a_d}`} onClick={()=>{this.changeMinutes(1)}}></div>
                                    </div>
                                    {timeFormat.numb===2&&(
                                        <>
                                            <div className={tpStyle.s}>
                                                <div>:</div>
                                            </div>
                                            <div className={tpStyle.o}>
                                                <div className={`${iStyle.a_u} ${tpStyle.a}`} onClick={()=>{this.changeSeconds(0)}}></div>
                                                <div className={tpStyle.ti}>
                                                    <Input value={seconds} onChange={(e,value)=>this.changeSeconds(null,value)}/>
                                                </div>
                                                <div className={`${iStyle.a_d} ${tpStyle.a} ${tpStyle.a_d}`} onClick={()=>{this.changeSeconds(1)}}></div>
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                            {is12Hour&&(
                                <div className={tpStyle.o}>
                                    {isAM?(
                                        <div className={tpStyle.bc}>
                                            <div className={tpStyle.b}>
                                                <ContainedButton>AM</ContainedButton>
                                            </div>
                                            <div className={tpStyle.b}>
                                                <OutlineButton borderColor={'#0E0E0E'} onClick={this.change12HourPeriod}>PM</OutlineButton>
                                            </div>
                                        </div>
                                    ):(                                
                                        <div className={tpStyle.bc}>
                                            <div className={tpStyle.b}>
                                                <OutlineButton borderColor={'#0E0E0E'} onClick={this.change12HourPeriod}>AM</OutlineButton>
                                            </div>
                                            <div className={tpStyle.b}>
                                                <ContainedButton>PM</ContainedButton>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }
    changeHour(state, value){
        const { is12Hour } = this.props;
        const { hour } = this.state;
        let newHour = hour;
        if(state!==null){
            switch (state){
                case 0: newHour=parseInt(hour)+1
                break;
                case 1: newHour=hour-1
                break;
            }
        }
        else{
            newHour=value===''?0:value;
        }
        
        if(newHour<0||(is12Hour&&newHour<1)){
            if(is12Hour){
                newHour = 12 ;
            }
            else{
                newHour=23;
            }       
        }
        else{
            if(newHour>12&&is12Hour){
                newHour=1
            }
            else if(newHour>23){
                newHour=0
            }
        }

        this.setState({
            hour: parseInt(newHour)
        })
    }
    changeMinutes(state, value){
        const { minutes } = this.state;
        let newMinutes =minutes;
        if(state!==null){
            switch (state){
                case 0: newMinutes=parseInt(minutes)+1
                break;
                case 1: newMinutes=minutes-1
                break;
            }
        }
        else{
            newMinutes=value===''?0:value;
        }
        newMinutes = newMinutes<0?59:newMinutes>59?'00':parseInt(newMinutes);
        this.setState({
            minutes: newMinutes
        })
    }
    changeSeconds(state,value){
        const { seconds } = this.state;
        let newSeconds = seconds;
        if(state!==null){
            switch (state){
                case 0: newSeconds=(parseInt(seconds)+1).toString();
                break;
                case 1: newSeconds=seconds-1
                break;
            }
        }
        else{
            newSeconds = value===''?0:value;
        }
        newSeconds = newSeconds<0?59:newSeconds>59?'00':newSeconds;
        newSeconds = newSeconds.length>2?newSeconds.slice(1):newSeconds.length<2?'0'+newSeconds:newSeconds;
        console.log(newSeconds.length);
        this.setState({
            seconds: newSeconds
        })
    }
    change12HourPeriod(){
        const { isAM } = this.state;
        this.setState({
            isAM: !isAM
        });
    }
    stringToTime(string){
        let timeSplit =string.split(':');
        
        timeSplit = timeSplit.map((time)=>{return isEmpty(time)?time='00':time })

        while(timeSplit.length<3){
            timeSplit.push('00');
        }

        let hour = timeSplit[0].length>2?timeSplit[0].slice(1):timeSplit[0].length<2?'0'+timeSplit[0]:timeSplit[0];
        let minutes = timeSplit[1].length>2?timeSplit[1].slice(1):timeSplit[1].length<2?'0'+timeSplit[1]:timeSplit[1];
        let seconds = timeSplit[2].length>2?timeSplit[2].slice(1):timeSplit[2].length<2?'0'+timeSplit[2]:timeSplit[2];

        this.setState({
            hour: hour,
            minutes: minutes,
            seconds: seconds
        })
    }
    changeCollapseState(state){
        this.setState({
            collapsed: state
        })
    }

    onBlur(){
        this.changeCollapseState(true);
    }

    onFocus(){
        this.changeCollapseState(false);
    }
}
TimePicker.defaultProps = {
    is12Hour: false,
    timeFormat: TimeFormat.HourMinuteSecond,
    defaultValue: '12:00:00',
}
TimePicker.propTypes = {
    is12Hour: PropTypes.bool,
    timeFormat: PropTypes.object,
    defaultValue: PropTypes.string,
};

export default TimePicker;