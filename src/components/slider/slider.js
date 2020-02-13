import React, { Component } from 'react';
import PropTypes from 'prop-types';

import sldStyle from './he_sld.scss';

class Slider extends Component {

    constructor(){
        super();

        this.state = ({
            active: false,
            sliderLeft: 0,
            width: 0,
            value: 0
        })

        this.setSliderState = this.setSliderState.bind(this);
        
        this.onMouseMove = this.onMouseMove.bind(this);
        this.reset = this.reset.bind(this);
    }
    componentDidMount(){
        document.addEventListener('mousemove',this.onMouseMove);
        document.addEventListener('mouseup', this.reset);
    }

    componentWillUnmount(){
        document.removeEventListener('mousemove',this.onMouseMove);
        document.removeEventListener('mouseup',this.reset);
    }
    render() {
        const { sliderLeft, width, value } = this.state;

        return (
            <div className={sldStyle.mc}>
                <div ref={he_sld_s_t => this.he_sld_s_t = he_sld_s_t} className={sldStyle.s_t}></div>
                <div ref={he_sld_s_c => this.he_sld_s_c = he_sld_s_c} style={{width:width}} className={`${sldStyle.s_c} ${sldStyle.s_g}`} onClick={(e)=>console.log("setValue")} > 
                    <div className={sldStyle.s} style={{left:sliderLeft/*, backgroundColor: currentBaseColor*/}} onMouseDown={(e)=>this.setSliderState(true)}></div>
                </div>
                <div>{value}</div>
            </div>
        );
    }
    getValue(e){
        const { max, step } = this.props;
        const { value } = this.state;

        let bounding = this.he_sld_s_t.getBoundingClientRect();
        let pos = this.getPosition(e);
        let newValue = Math.round((pos/bounding.width)*max);
        console.log(newValue);
        return newValue%step===0?newValue:value;

    }
    getPosition(e){
        const { max, step } = this.props;
        const { sliderLeft } = this.state;

        let bounding = this.he_sld_s_t.getBoundingClientRect();
        let newPos = e.clientX-bounding.left;
        let amountOfSteps = max/step;
        if(e.clientX-bounding.x<0){
            newPos = 0
        }
        else{
            newPos = e.clientX-bounding.left>bounding.width ? bounding.width : e.clientX-bounding.left;
        }
        let test = Math.round(newPos)%amountOfSteps===0?newPos:sliderLeft;
        return test;
    }

    setSliderState(state){
        this.setState({
            active: state
        })
    }
    onMouseMove(e){
        const { active } = this.state;
        
        if(active){
            let value = this.getValue(e);
            let pos = this.getPosition(e);
            console.log(pos);
            this.setState({
                sliderLeft: pos,
                width: pos +5,
                value: value
            })
        }
    }
    reset(){
        this.setSliderState(false);
    }
}
Slider.defaultProps = {
    max: 100,
    step:10,
}
Slider.propTypes = {
    max: PropTypes.number,
    step: PropTypes.number,
};


export default Slider;