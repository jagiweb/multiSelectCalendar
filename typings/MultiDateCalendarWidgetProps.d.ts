/**
 * This file was generated from MultiDateCalendarWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { EditableValue } from "mendix";

export type SelectedColorEnum = "default" | "red" | "green" | "blue" | "purple" | "teal";

export type BgColorEnum = "default" | "dark" | "brown" | "gray";

export interface MultiDateCalendarWidgetContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    daysArray: EditableValue<string>;
    numberOfMonths: number;
    startingDay: number;
    lastDay: number;
    multiSelection: boolean;
    weekendDisabled: boolean;
    mobileVersion: boolean;
    reservedDates?: EditableValue<string>;
    closeDay?: EditableValue<string>;
    selectedColor: SelectedColorEnum;
    bgColor: BgColorEnum;
}

export interface MultiDateCalendarWidgetPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    daysArray: string;
    numberOfMonths: number | null;
    startingDay: number | null;
    lastDay: number | null;
    multiSelection: boolean;
    weekendDisabled: boolean;
    mobileVersion: boolean;
    reservedDates: string;
    closeDay: string;
    selectedColor: SelectedColorEnum;
    bgColor: BgColorEnum;
}
