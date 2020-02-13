import * as React from "react";

/**
 * The Pane component
 * @public
 */
declare class Pane extends React.Component<PaneProps, any> {}
export interface PaneProps {
    /** Title of the pane. */   
    title?: string,

    /** Description of the pane. */   
    description?: string,

    /** Flag for when the pane is visible. */   
    visible?: boolean,

    /** If true the pane will show a cross which allows the user to close the pane.
     * onClose will catch this click.
     * */   
    closable?: boolean,

    /** If it's set to true the user will not be able to dismiss the pane by pressing on the overlay.*/   
    isBlocking?: boolean,

    /** 
     * An array of elements which will be presented in the bottom part of the pane .
     *  */   
    footerButtons?: Array<string>,

    /** 
     * An array of elements which will be presented in the pane. 
     *  */  
    content: Array<string>,



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
