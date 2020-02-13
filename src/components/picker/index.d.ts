import * as React from "react";

// /**
//  * The DayOfWeek type
//  * @public
//  */
// declare type DayOfWeek =((shortName: string, numb: number)=> void);

/**
 * The DatePicker component
 * @public
 */
declare class DatePicker extends React.Component<DatePickerProps, any> {}
/**
 * The MonthPicker component
 * @public
 */
declare class MonthPicker extends React.Component<MonthPickerProps, any> {}

export interface DatePickerProps {
    //startDay: DayOfWeek,


    /** Ability to show a circle around the current date. */
    showToday?: boolean,

    /**
     * Called after user changes the date.
    */
   onChange?: () => [object,number,number];
}

export interface MonthPickerProps {
    /**
     * Show the chosen month.
    */
    month?: object,

    /**
     * Show the chosen year.
    */
    year?: number,

    /**
     * Called after user changes the month.
    */
   onChange?: () => [object,number];
}
