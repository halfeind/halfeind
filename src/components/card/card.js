import React, { Component } from 'react';
import Icon from '@mdi/react'
import { mdiDotsVertical } from '@mdi/js';
import {randomString} from 'halfeind-utils';

import crdStyle from './he_crd.scss'

class Card extends Component {
    constructor(){
        super();

        this.state=({
            menuVisible: false
        });

        this.changeMenuVisibleState = this.changeMenuVisibleState.bind(this);
        this.onDocumentClick = this.onDocumentClick.bind(this);
    }
    componentDidMount(){
        document.addEventListener('click',this.onDocumentClick);
    }

    componentWillUnmount(){
        document.removeEventListener('click',this.onDocumentClick);
    }

    render() {
        const { title, menuItems, description, footer, className, menuIconClassName, menuClassName, width, height } = this.props;
        const { menuVisible } = this.state;

        const cardStyle = `${crdStyle.mc} ${(className?className:'')}`;
        const menuIconStyle = `${crdStyle.i} ${(menuIconClassName?menuIconClassName:'')}`;
        const menuStyle = `${crdStyle.dc} ${(menuClassName?menuClassName:'')}`;

        return (
            <div className={cardStyle} style={{width:width, height: height}}>
                <div className={crdStyle.hc}>
                        <div className={crdStyle.t}>{title}</div>
                        {menuItems&&(
                            <div className={crdStyle.mnc} ref={he_crd_mnc => this.he_crd_mnc = he_crd_mnc}>
                                <div className={crdStyle.ic}>
                                    <Icon path={mdiDotsVertical} size={0.9} className={menuIconStyle} onClick={()=>this.changeMenuVisibleState(!menuVisible)} />
                                </div>
                                {menuVisible&&(
                                    <div className={menuStyle}>
                                        {menuItems.map((menuItem, index)=>
                                            <div className={crdStyle.do} key={randomString(5)} onClick={()=>{this.onMenuItemClick(index)}}>
                                                {menuItem}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                </div>
                <div className={crdStyle.cc}>
                    <div className={crdStyle.d}>
                        {description}
                    </div>    
                </div>
                {footer&&(
                    <div className={crdStyle.fc}>
                        <div className={crdStyle.flc}>
                        </div>
                        <div className={crdStyle.frc}>
                            {footer.map((component)=>
                                component
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }
    changeMenuVisibleState(state){
        this.setState({
            menuVisible: state
        })
    }
    onMenuItemClick(index){
        const { onMenuItemClick } = this.props;
        if(!onMenuItemClick) return;

        onMenuItemClick(index);
    }
    onDocumentClick(e){
        const {menuVisible} = this.state;
        if(!menuVisible) return
        if (this.he_crd_mnc && !this.he_crd_mnc.contains(e.target)) {
            this.changeMenuVisibleState(false);
        }
    }
}

export default Card;