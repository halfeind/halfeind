import * as React from "react";

/**
 * The Dropdown component
 * @public
 */
declare class Dropdown extends React.Component<DropdownProps, any> {}

export interface DropdownProps {

    /** The default selected key, the value will be put as the placeholder. */
    defaultKey: number,

    /** The options a user can choose from. */
    options: Array<object>,

    /** Shows a placeholder text. */
    placeHolder: string,

    /** Ability to put a line underneath the selected value. */
    underline: boolean,

    /**
     * Called after user chooses another option.
    */
    onKeySelected?: () => number;
}
