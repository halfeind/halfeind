import * as React from "react";

/**
 * The AccountBubble component
 * @public
 */
declare class AccountBubble extends React.Component<AccountBubbleProps, any> {}
export interface AccountBubbleProps {
    /** 
     * Ability to change the radius of the avatar.
     * */
    radius?: number,

    /** Change the fill color of the avatar. */
    fill?: string,

    /** Change the image of the avatar. */
    img? : string,

    /** The label that will be shown behind the avatar. */   
    label?: [object,string],

    /** The label color. */
    labelColor?: string,

    /** Used to fill in the acronym in the avatar. */
    name?: string
}