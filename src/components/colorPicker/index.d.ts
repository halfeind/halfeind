import * as React from "react";

/**
 * The ColorPicker component
 * @public
 */
declare class ColorPicker extends React.Component<ColorPickerProps, any> {}
export interface ColorPickerProps {
    /** The defaultvalue the colorpicker starts with. ( has to be hex color ) */   
    color?: string,

    /**
     * Called after user's changes color.
     * @returns returns the value of the current color as hex.
     * @returns returns the value of the current color as rgb.
    */
   onColorChange?: () => string & object
}