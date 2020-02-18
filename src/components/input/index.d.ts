import * as React from "react";

/**
 * The Input component
 * @public
 */
declare class Input extends React.Component<InputProps, any> {}
/**
 * The NumberInput component
 * @public
 */
declare class NumberInput extends React.Component<NumberInputProps, any> {}


export interface GenericInputProps {
    /** The label of the input. */   
    label: string,

    /** The color of the label. */
    labelColor: string,

    /** A prefix put infront of the input. */   
    prefix: string,

    /** A prefix put behind the input. */   
    suffix: string,

    /** The color of the input. */   
    color: string,

    /** Allow to set autoComplete property */
    autoComplete: string,

    /** The name variable of the input */
    name: string,

    /** The defaultvalue of the input. */  
    defaultValue: string,

    /** The placeholder of the input. */  
    placeHolder: string,

    /** Ability to set an errormessage underneath the input. Will be set if required = true */  
    errorMessage:string,

    /** If this is true the label will be placed in uppercase */  
    uppercase: boolean,

    /** If the user lose focus of the input the user will know the input is required. */  
    required:boolean,

    /**
     * Called if the user changes the value of the input.
    */
    onChange?: () => [React.MouseEvent<HTMLButtonElement>, string|number];

    /**
     * Called after the input loses focus.
    */
    onBlur?: () => [React.MouseEvent<HTMLButtonElement>, string|number];

    /**
     * Called after the input receives focus.
    */
    onFocus?: () => React.MouseEvent<HTMLButtonElement>;
}
export interface InputProps extends GenericInputProps {
    /** Ability to change the type of the input. */   
    type: string,

    /** The value of the input. */ 
    value: string|number,
    
}
export interface NumberInputProps extends GenericInputProps {
    /** The value of the input. */ 
    value: number,
    
}