import * as React from "react";

/**
 * The ContainedButton component
 * @public
 */
declare class ContainedButton extends React.Component<ContainedButtonProps, any> {}
/**
 * The OutlineButton component
 * @public
 */
declare class OutlineButton extends React.Component<OutlineButtonProps, any> {}
/**
 * The TextButton component
 * @public
 */
declare class TextButton extends React.Component<TextButtonProps, any> {}

export interface ButtonProps {
    /** Ability to disable the component. */
    disabled?: boolean,

    /** Uppercases the button text. */
    uppercase?: boolean,

    /** Ability to set the tabindex */
    tabindex?: number,

    /**
     * Called after user's click.
     * @returns event - React's original SyntheticEvent.
    */
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => React.MouseEvent<HTMLButtonElement>
}

export interface ContainedButtonProps extends ButtonProps{
    /** Changes the background color of the button. */
    backgroundColor?: string
}
export interface OutlineButtonProps extends ButtonProps{
    /** Changes the border color of the button. */
    borderColor?: string
}
export interface TextButtonProps extends ButtonProps{
     /** Changes the color of the text of the button. */
    textColor?: string,
}