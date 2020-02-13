import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, contrastColor } from 'halfeind-utils';

import tStyle from './he_t.scss';

class Tag extends Component {

    constructor(){
        super();

        this.onClose = this.onClose.bind(this);
    }

    render() {
        const { value, color, closable, visible } = this.props;
        if(isEmpty(value)) console.warn('[halfeind] WARN : Parameter value should be filled in.');
        
        return (
            visible&&(
                <div className={tStyle.mc} /*style={{borderColor:color, backgroundColor:color}}*/>
                    <div className={tStyle.cc}>
                        <div className={tStyle.t} /*style={{color:contrastColor(color)}}*/>{value}</div>
                        {closable&&(
                        <div className={tStyle.ci} ref={he_t_ci => {this.he_t_ci = he_t_ci;}} onClick={this.onClose}></div>)}
                    </div>
                </div>
            )
            
        );
    }
    onClose(){
        const { onClose } = this.props;
        if(!onClose) return;

        onClose();
    }
}
Tag.defaultProps = {
    value: '',
    color:  '#d9d9d9',
    background: '#f3f3f3',
    closable: false,
    visible: true,
    onClose: undefined,
}
Tag.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]) ,
    color: PropTypes.string,
    closable: PropTypes.bool,
    visible: PropTypes.bool,
    onClose: PropTypes.func,
};
export default Tag;