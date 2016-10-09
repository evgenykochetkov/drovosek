import * as React from "react";
import {assign} from "../../utilities/object";
import {css} from "../../utilities/css";
import {IButtonProps, ButtonType} from "./Button.Props";


export class Button extends React.Component<IButtonProps, {}> {
    public static defaultProps: IButtonProps = {
        buttonType: ButtonType.normal
    }
    
    private _buttonElement: HTMLButtonElement;

    constructor(props: IButtonProps) {
        super(props);
    }

    private renderIconSpan(): JSX.Element {
        const {
            buttonType, 
            icon 
        } = this.props;

        if (!icon || buttonType !== ButtonType.icon) return null;

        return (
            <span className="timber-Button-icon">
                <i className={`timber-Icon timber-Icon--${icon}`} />
            </span>
        )
    }

    public render(): JSX.Element {
        const {
            rootProps,
            children,
            buttonType, 
            href, 
            disabled, 
            onClick
        } = this.props;

        const extraClassNames = this.props.className;

        const className = css((this.props.className), 'timber-Button', {
            'timber-Button-primary': buttonType === ButtonType.primary,
            'timber-Button-icon': buttonType === ButtonType.icon,
            'timber-Button-compound': buttonType === ButtonType.compound
        });

        const renderAsAnchor: boolean = !!href;
        const tag = renderAsAnchor ? 'a' : 'button';

        const mergedProps = assign(
            {},
            rootProps,
            href ? {href} : null,
            {
                'ref': (c: HTMLButtonElement): HTMLButtonElement => this._buttonElement = c
            },
            onClick && { onClick },
            disabled && { disabled },
            { className }
        )

        return React.createElement(
            tag,
            mergedProps,
            this.renderIconSpan(),
            children
        );
    }

    public focus(): void {
        if (this._buttonElement) {
            this._buttonElement.focus();
        }
    }
}