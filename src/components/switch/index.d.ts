import * as React from "react";

/**
 * The Switch component
 * @public
 */
declare class Switch extends React.Component<SwitchProps, any> {}

export interface SwitchProps {
    /** Ability to set a suffix whenever the switch is on. */
    activeSuffix?: string,

    /** Ability to set a suffix whenever the switch is off. */
    inactiveSuffix?: string,

    /** Ability to set the switch default on. */
    checked: boolean,
    //uppercase: boolean,

    /** Ability to set the color whenever the switch is on. */
    activeColor?: string,

    /** Ability to set the color whenever the switch is off. */
    inactiveColor?: string,

    /** Ability to set the style of the switch. */
    switchStyle?: object,

    /**
     * Called after user changed the state.
    */
    onChange?: () => boolean;
}
