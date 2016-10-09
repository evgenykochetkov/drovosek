import * as React from 'react';
import { Button } from './Button';

export interface IButtonProps {
    /**
     * If provided, this component will be rendered as an anchor.
     * @default ElementType.anchor
     */
    href?: string;

    /**
     * The type of button to render.
     * @defaultvalue ButtonType.normal
     */
    buttonType?: ButtonType;

    /**
     * The button icon shown in command or hero type.
     */
    icon?: string;

    /**
     * Description of the action this button takes.
     * Only used for compound buttons
     */
    description?: string;

    /**
     * Whether the button is disabled
     */
    disabled?: boolean;

    /**
     * If provided, additional class name to provide on the root element.
     */
    className?: string;

    /**
     * Event handler for click event.
     */
    onClick?: React.MouseEventHandler<Button>;

    /**
     * If provided, HTMLProps which will be mixed in onto the root element emitted by this component, before
     * other props are applied. This allows you to extend the root element with additional attributes, such as
     * data-automation-id needed for automation.
     *
     * The root element will either be a button or an anchor, depending on what value is specified for
     * the elementType prop.
     */
    rootProps?: React.HTMLProps<HTMLButtonElement> | React.HTMLProps<HTMLAnchorElement>;
}

export enum ElementType {
    /** <button> element. */
    button,
    /** <a> element. */
    anchor
}

export enum ButtonType {
    normal,
    primary,
    compound,
    icon
}
