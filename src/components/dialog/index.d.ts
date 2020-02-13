import * as React from "react";

/**
 * The ConfirmDialog component
 * @public
 */
declare class ConfirmDialog extends React.Component<ConfirmDialogProps, any> {}
export interface DialogProps {
    /** Title of the dialog */   
    title?: string,

    /** Description of the dialog */   
    description?: string,

    /** Flag for when the dialog is visible */   
    visible?: boolean,

    /** If true the dialog will show a cross which allows the user to close the dialog  
     * onClose will catch this click.
     * */   
    closable?: boolean,

    /** If it's set to true the user will not be able to dismiss the dialog by pressing on the overlay */   
    isBlocking?: boolean,

    /** The ability to move the dialog around */   
    movable?: boolean,

    /**
     * Called after user clicks on the overlay.
     * Depending if isBlocking is false.
    */
   onDismiss?: () => void;

    /**
     * Called after user clicks on close button.
     * Depending if closable is true.
    */
   onClose?: () => void;
}
export interface ConfirmDialogProps extends DialogProps {
    /** 
     * An array of elements which will be presented in the bottom part of the dialog 
     *  */   
    footerButtons?: Array<string>,
}