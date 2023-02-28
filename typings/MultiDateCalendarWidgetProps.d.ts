/**
 * This file was generated from MultiDateCalendarWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { EditableValue, ListValue, ListAttributeValue } from "mendix";

export type SelectedColorEnum = "default" | "red" | "green" | "blue" | "purple" | "teal";

export type BgColorEnum = "default" | "dark" | "brown" | "gray";

export interface MultiDateCalendarWidgetContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    daysArray: EditableValue<string>;
    numberOfMonths: number;
    multiSelection: boolean;
    weekendDisabled: boolean;
    mobileVersion: boolean;
    reservedDates?: ListValue;
    day?: ListAttributeValue<string>;
    closeDay?: ListAttributeValue<boolean>;
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
    multiSelection: boolean;
    weekendDisabled: boolean;
    mobileVersion: boolean;
    reservedDates: {} | { type: string } | null;
    day: string;
    closeDay: string;
    selectedColor: SelectedColorEnum;
    bgColor: BgColorEnum;
}
