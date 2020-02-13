import * as React from "react";

/**
 * The Tag component
 * @public
 */
declare class Tag extends React.Component<TagProps, any> {}

export interface TagProps {
    /** Ability to set a text of the tag. */
    value: string|number,
    

    //color: string,

    /** If true the dialog will show a cross which allows the user to close the dialog  
     * onClose will catch this click.
     * */ 
    closable: boolean,

    /** Flag for when the dialog is visible */
    visible: boolean,

    /**
     * Called after user clicks on close button.
     * Depending if closable is true.
    */
    onClose?: () => void;
}
