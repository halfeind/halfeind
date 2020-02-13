import * as React from "react";

/**
 * The Checkbox component
 * @public
 */
declare class Checkbox extends React.Component<CheckboxProps, any> {}
export interface CheckboxProps {
    /** The label that will be shown behind the checkbox. */   
    label?: string,

    /** Either sets or unsets the base state of the checkbox. */
    checked?: boolean,

    /** Ability to disable the component. */
    disabled?: boolean,

    /**
     * Called after user's click.
     * @returns returns the state of the checkbox as a boolean.
    */
   onChange?: (event: React.MouseEvent<HTMLButtonElement>) => boolean
}