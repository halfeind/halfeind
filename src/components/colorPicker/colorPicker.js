import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, hsvToRgb, hsvToHsl, rgbToHsv, hexToRgb, rgbToHex, hslToRgb} from 'halfeind-utils';

import { Input } from '../input/index';

import cpStyle from './he_cp.scss';
import gStyle from '../../scss/global/he_g.scss';

class ColorPicker extends Component {

    constructor(){
        super();

        this.state=({
            currentBaseColor: 'hsl(0,100%,50%)',
            activeColorPicker: false,
            activeHueSlider: false,
            colorPickerHandleTop: -12,
            colorPickerHandleLeft: '95%',
            hueSliderHandleLeft: -6,
            currentHSL: {h:0,s:100,l:50},
            currentRGB: {r:255,g:0,b:0},
            currentHex: 'FF0000',
        });
        this.setColorPickerState = this.setColorPickerState.bind(this);
        this.getHueColor = this.getHueColor.bind(this);
        this.setHueSliderState = this.setHueSliderState.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount(){
        const {color}=this.props;

        this.setPositionByColor(color);
        

        document.addEventListener('mousemove',this.onMouseMove);
        document.addEventListener('mouseup', this.reset);
    }

    componentWillUnmount(){
        document.removeEventListener('mousemove',this.onMouseMove);
        document.removeEventListener('mouseup',this.reset);
    }

    componentDidUpdate(prevProps, prevState) {
        const {color}=this.props;
        if(prevProps.color!==color&&color!==undefined){
            this.setPositionByColor(color);
        }
    }
    render() {
        const {currentBaseColor, currentRGB, currentHex, colorPickerHandleTop, colorPickerHandleLeft, hueSliderHandleLeft, activeColorPicker, activeHueSlider} = this.state;

        let currentColor = 'rgb('+currentRGB.r+','+currentRGB.g+','+currentRGB.b+')';
        let inputContainerStyle = (activeColorPicker || activeHueSlider) ? `${cpStyle.i_c} ${gStyle.ns} `  : cpStyle.i_c;

        return (
            <div className={cpStyle.mc}>
                <div ref={he_cp_c => this.he_cp_c = he_cp_c} className={cpStyle.c} style={{background: currentBaseColor}} onMouseDown={(e)=> {this.setColorPickerState(true); this.getColor(e,true);} }>
                    <div className={`${gStyle.ns} ${cpStyle.cp_h}`} style={{top: colorPickerHandleTop, left: colorPickerHandleLeft, backgroundColor:currentColor}} onMouseDown={(e)=>this.setColorPickerState(true)}></div>
                    <div className={`${cpStyle.cp_g} ${cpStyle.cp_lg}`}></div>
                    <div className={`${cpStyle.cp_g} ${cpStyle.cp_dg}`}></div>
                </div>
                <div ref={he_cp_hs_c => this.he_cp_hs_c = he_cp_hs_c} className={`${cpStyle.hs_c} ${cpStyle.hs_g}`} onClick={(e)=>this.getHueColor(e, true)} > 
                    <div className={cpStyle.hs_h} style={{left:hueSliderHandleLeft, backgroundColor: currentBaseColor}} onMouseDown={(e)=>this.setHueSliderState(true)}></div>
                </div>
                <div className={inputContainerStyle}>
                    <div className={cpStyle.h_c}>
                        <Input label='Hex' color={"#"+currentHex} prefix="#" value={currentHex} onChange={(e,value)=>this.setPositionByColor(value)}/>
                    </div>
                    <div className={cpStyle.rgb_c}>
                        <Input label='R' color={'rgb(255,0,0)'} value={currentRGB.r} onChange={(e,value)=>this.onChangeRgbColor('r',value)}/>
                        <Input label='G' color={'rgb(0,128,0)'} value={currentRGB.g} onChange={(e,value)=>this.onChangeRgbColor('g',value)}/>
                        <Input label='B' color={'rgb(0,0,255)'} value={currentRGB.b} onChange={(e,value)=>this.onChangeRgbColor('b',value)}/>
                    </div>
                </div>
            </div>
        );
    }
    setPositionByColor(color){
        let rgbResult = hexToRgb(color);
        if(rgbResult!==null){
            let hsvColor = rgbToHsv(rgbResult.r, rgbResult.g, rgbResult.b);

            let colorPickerBounding = this.he_cp_c.getBoundingClientRect();
            let hueSliderBounding = this.he_cp_hs_c.getBoundingClientRect();
    
            let hslResult=hsvToHsl(hsvColor.h,hsvColor.s,hsvColor.v);
    
            let left =  hsvColor.s ===0 ? 0 :  hsvColor.s*colorPickerBounding.width;
            let top = hsvColor.v===1 ? 0 : (1-hsvColor.v)*colorPickerBounding.height;
    
            let pos = (hsvColor.h/360)*hueSliderBounding.width;
    
            let hsl = 'hsl('+ hsvColor.h +',100%,50%)';
            this.setState({
                colorPickerHandleTop: top-12,
                colorPickerHandleLeft: left-12,
                hueSliderHandleLeft: pos-6,
                currentBaseColor: hsl,
                currentHSL: {
                    h:hslResult.h,
                    s:hslResult.s*100,
                    l:hslResult.l*100},
                
                currentRGB: {
                    r:Math.round(rgbResult.r),
                    g: Math.round(rgbResult.g),
                    b:Math.round(rgbResult.b)},
                currentHex: color.toUpperCase().replace('#',''),
            },()=>this.onColorChange());
        }  
        else{
            this.setState({
                currentHex: color.toUpperCase()
            })
        }
    }
    getColor(e, onClick){
        const { currentHSL, activeColorPicker } = this.state;
        
        if(activeColorPicker||onClick){
            let bounding = this.he_cp_c.getBoundingClientRect();
            
            let x = e.clientX-bounding.left;
            let percentX = (x / bounding.width);
            let y = e.clientY-bounding.top;
            let percentY =(1 -(y/ bounding.height));

            let rgbResult = hsvToRgb(currentHSL.h/360,percentX, percentY);
            let hslResult = hsvToHsl(currentHSL.h/360,percentX,percentY);
            let hexResult = rgbToHex(Math.round(rgbResult.r),Math.round(rgbResult.g),Math.round(rgbResult.b));

            if(e.clientX-bounding.left<0) x=0;
            else x = e.clientX-bounding.left>bounding.width ? bounding.width : e.clientX-bounding.left;
            if(e.clientY-bounding.top<0) y=0;
            else y = e.clientY-bounding.top>bounding.height ? bounding.height : e.clientY-bounding.top;

            this.setState({
                colorPickerHandleTop: y-12,
                colorPickerHandleLeft: x-12,
                currentHSL: {
                    h:currentHSL.h,
                    s:hslResult.s*100,
                    l:hslResult.l*100},
                currentRGB: {
                    r:Math.round(rgbResult.r),
                    g: Math.round(rgbResult.g),
                    b:Math.round(rgbResult.b)},
                currentHex: hexResult.toUpperCase(),
            },()=>this.onColorChange());
        }
    }
    getHueColor(e,onClick){
        const { activeHueSlider, currentHSL } = this.state;

        if(activeHueSlider||onClick){
            let bounding = this.he_cp_hs_c.getBoundingClientRect();
            let pos = e.clientX-bounding.left;
            if(e.clientX-bounding.x<0){
                pos = 0
            }
            else{
                pos = e.clientX-bounding.left>bounding.width ? bounding.width : e.clientX-bounding.left;
            }
            let angle = (pos/bounding.width)*360;

            let rgbResult = hslToRgb(angle,currentHSL.s/100, currentHSL.l/100);
            let hslBaseColor = "hsl("+ angle + ", 100%, 50%)";
            let hexResult = rgbToHex(Math.round(rgbResult.r),Math.round(rgbResult.g),Math.round(rgbResult.b));

            this.setState({
                currentBaseColor: hslBaseColor,
                hueSliderHandleLeft: pos-6,
                currentHSL: {
                    h:angle,
                    s:currentHSL.s,
                    l:currentHSL.l},
                currentRGB: {
                    r:Math.round(rgbResult.r),
                    g: Math.round(rgbResult.g),
                    b:Math.round(rgbResult.b)},
                currentHex: hexResult.toUpperCase(),
            },()=>this.onColorChange());
        }
    }
    onChangeRgbColor(type,value){
        const{ currentRGB } = this.state;

        value = parseInt((isEmpty(value)||value<0)?0:value>255?255:value);

        switch(type){
            case 'r': this.setState({
                currentRGB: {
                    ...currentRGB,
                    r: Math.round(value)
                }
            },()=>{
                this.onRgbChanged()
            });
            break;
            case 'g': this.setState({
                currentRGB: {
                    ...currentRGB,
                    g:Math.round(value)
                }
            },()=>{
                this.onRgbChanged()
            });
            break;
            case 'b': this.setState({
                currentRGB: {
                    ...currentRGB,
                    b:Math.round(value)
                }
            },()=>{
                this.onRgbChanged()
            });
            break;

        }
    }
    onRgbChanged(){
        const{ currentRGB } = this.state;
        let hex = rgbToHex(currentRGB.r,currentRGB.g,currentRGB.b);

        this.setPositionByColor(hex);
    }
    setColorPickerState(state){
        this.setState({
            activeColorPicker: state
        })
    }
    setHueSliderState(state){
        this.setState({
            activeHueSlider: state
        })
    }
    onMouseMove(e){
        this.getColor(e);
        this.getHueColor(e);
    }
    reset(){
        this.setState({ 
            activeColorPicker: false,
            activeHueSlider: false
        })
    }
    onColorChange(){
        const { onColorChange } = this.props;
        const { currentHex, currentRGB } = this.state;

        if(!onColorChange) return;

        onColorChange(currentHex, currentRGB);
    }

}
ColorPicker.defaultProps = {
    color: undefined,
    onColorChange: undefined
}
ColorPicker.propTypes = {
    color: PropTypes.string,
    onColorChange: PropTypes.func
};

export default ColorPicker;