import { ReactElement, createElement } from "react";
import { MultiDateCalendarWidgetPreviewProps } from "../typings/MultiDateCalendarWidgetProps";

export function preview({  }: MultiDateCalendarWidgetPreviewProps): ReactElement {
    return <div></div>;
}

export function getPreviewCss(): string {
    return require("./ui/MultiDateCalendarWidget.css");
}
