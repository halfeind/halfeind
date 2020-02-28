import React, { Component } from 'react';
import PropTypes from 'prop-types';

import dStyle from './he_d.scss'
import gStyle from '../../scss/global/he_g.scss';

class ConfirmDialog extends Component {
    constructor(){
        super();

        this.state=({
            top:undefined,
            left:undefined,
            activeModalMove: false,
        })

        this.handleDocumentMouseMove = this.handleDocumentMouseMove.bind(this);
        this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    componentDidMount(){
        document.addEventListener('mousemove',this.handleDocumentMouseMove);
        document.addEventListener('mouseup', this.onDocumentMouseUp);
    }
    componentWillUnmount(){
        document.removeEventListener('mousemove',this.handleDocumentMouseMove);
        document.removeEventListener('mouseup',this.onDocumentMouseUp);
    }

    render() {
        const { title, description, visible, closable, movable, className, closeButtonClassName, footerButtons } = this.props;
        const { top, left } = this.state;

        visible && (document.body.classList.add(gStyle.nscrl));

        let dialogStyle = `${dStyle.mc} ${className?className:''}`;
        let iconStyle = `${dStyle.ci} ${closeButtonClassName?closeButtonClassName:''}`

        return (
            visible &&(
                <div className={dStyle.o} ref={he_d_o => {this.he_d_o = he_d_o;}} onClick={this.onDismiss}>
                    <div className={dialogStyle} ref={he_d_mc => {this.he_d_mc = he_d_mc;}} style={{top:top, left:left, position:movable &&'absolute'}} 
                    onMouseDown={()=>movable&&this.changeDialogMove(true)}>
                        <div className={dStyle.uh_c} style={{cursor:movable&&'pointer'}}></div>
                        <div className={dStyle.h_c}>
                            <div className={dStyle.t}>{title}</div>
                            {closable&&(
                            <div className={iconStyle} ref={he_d_ci => {this.he_d_ci = he_d_ci;}} onClick={this.onClose}></div>)}
                        </div>
                        <div className={dStyle.c_c}>
                            <div className={dStyle.d}>{description}</div>
                        </div>
                        {footerButtons&&(
                            <div className={dStyle.f_c}>
                                <div className={dStyle.f_l_c}>
                                </div>
                                <div className={dStyle.f_r_c}>
                                    {footerButtons.map((footerButton)=>
                                        footerButton
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )
           
        );
    }

    changeDialogMove(state){
        this.setState({
            activeModalMove:state
        })
    }

    handleDocumentMouseMove(e){
        const { activeModalMove } = this.state;

        if(activeModalMove){
            let dialogWidth = this.he_d_mc.getBoundingClientRect().width;

            let top = e.pageY;
            let left = e.pageX-(dialogWidth/2)
    
            this.setState({
                top: top,
                left: left
            })
        }
    }

    onDocumentMouseUp(){
        this.setState({ 
            activeModalMove: false,
         })
    }
    onDismiss(e){
        const { onDismiss, isBlocking } = this.props;

        if(!onDismiss || (e.target !== this.he_d_o) || isBlocking ) return;
        document.body.classList.remove(gStyle.nscrl);
        onDismiss();
    }
    onClose(e){
        const { onClose, closable } = this.props;

        if(!onClose || (e.target !== this.he_d_ci) || !closable) return;
        document.body.classList.remove(gStyle.nscrl);
        onClose();
    }
}

ConfirmDialog.defaultProps = {
    title: '',
    description: '',
    footerButtons: [],
    visible: false,
    closable: false,
    isBlocking: false,
    movable: false,
    onDismiss:undefined,
    onClose:undefined,
}
ConfirmDialog.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    footerButtons: PropTypes.array,
    visible: PropTypes.bool,
    closable: PropTypes.bool,
    isBlocking: PropTypes.bool,
    movable: PropTypes.bool,
    onDismiss: PropTypes.func,
    onClose: PropTypes.func,
};

export default ConfirmDialog;