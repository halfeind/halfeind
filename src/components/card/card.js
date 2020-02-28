import React, { Component } from 'react';
import Icon from '@mdi/react'
import { mdiDotsVertical } from '@mdi/js';
import {randomString} from 'halfeind-utils';

import crdStyle from './he_crd.scss'


class Card extends Component {
    render() {
        const { title, menuVisible, footer, width, height } = this.props;
        return (
            <div className={crdStyle.mc} style={{minWidth:width, minHeight: height}}>
                <div className={crdStyle.hc}>
                        <div className={crdStyle.t}>{title}</div>
                        {menuVisible&&(
                            <>
                                <div className={crdStyle.ic}>
                                    <Icon path={mdiDotsVertical} size={0.9} className={crdStyle.i} />
                                </div>
                                <div className={crdStyle.dc}>
                                    <div className={crdStyle.do} title="Activate">
                                        TEST
                                    </div>
                                    <div className={crdStyle.do} title="Activate">
                                        TEST
                                    </div>
                                </div>
                            </>
                        )}
                </div>
                <div className={crdStyle.cc}>

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
}

export default Card;