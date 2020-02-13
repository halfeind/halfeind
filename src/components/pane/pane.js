import React, { Component } from 'react';
import PropTypes from 'prop-types';

import pStyle from './he_p.scss';
import gStyle from '../../scss/global/he_g.scss';


class Pane extends Component {

    constructor(){
        super();

        this.onDismiss = this.onDismiss.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    render() {
        const { title, description, content, visible, isBlocking, closable, footerButtons } = this.props; 

        let paneStyle= `${(isBlocking ? pStyle.o:'')} ${pStyle.mc}`;

        visible && (document.body.classList.add(gStyle.nscrl));

        return (
            visible&&(
                <div className={paneStyle} ref={he_p_o => {this.he_p_o = he_p_o;}} onMouseDown={this.onDismiss}>
                    <div className={pStyle.c} ref={he_p_c => {this.he_p_c = he_p_c;}}>
                        <div className={pStyle.uh_c}></div>
                        <div className={pStyle.h_c}>
                            <div className={pStyle.t}>{title}</div>
                            {closable&&(
                            <div className={pStyle.ci} ref={he_p_ci => {this.he_p_ci = he_p_ci;}} onClick={this.onClose}></div>)}
                        </div>
                        {description&&(
                            <div className={pStyle.d_c}>
                                <div className={pStyle.d}>{description}</div>    
                            </div>
                        )}
                        {content&&(
                            <div className={pStyle.cont_c}>
                                <div className={pStyle.cont}>{content &&
                                    content.map((child)=>
                                    <div>{child}</div>
                                )}</div>    
                            </div>
                        )}
                        {footerButtons&&(
                            <div className={pStyle.f_c}>
                                <div className={pStyle.f_l_c}>
                                </div>
                                <div className={pStyle.f_r_c}>
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
    onDismiss(e){
        const { onDismiss, isBlocking } = this.props;

        if(!onDismiss || (e.target !== this.he_p_o) || !isBlocking ) return;
        document.body.classList.remove(gStyle.nscrl);
        onDismiss();
    }
    onClose(e){
        const { onClose, closable } = this.props;

        if(!onClose || (e.target !== this.he_p_ci) || !closable) return;
        document.body.classList.remove(gStyle.nscrl);
        onClose();
    }
}
Pane.defaultProps = {
    title: '',
    description: '',
    content: undefined,
    visible:false,
    isBlocking: false,
    closable: false,
    footerButtons: undefined,
    onDismiss: undefined,
    onClose: undefined
}
Pane.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    content: PropTypes.array,
    visible: PropTypes.bool,
    isBlocking: PropTypes.bool,
    closable: PropTypes.bool,
    footerButtons: PropTypes.array,
    onDismiss: PropTypes.func,
    onClose: PropTypes.func,
};

export default Pane;