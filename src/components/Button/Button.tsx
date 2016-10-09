import * as React from "react";
import {assign} from '../../utilities/object';
import {css} from '../../utilities/css';
import {IButtonProps, ButtonType} from "./Button.Props";

export class Button extends React.Component<IButtonProps, {}> {
    public static defaultProps: IButtonProps = {
        buttonType: ButtonType.normal
    };
    private _buttonElement: HTMLButtonElement;

    constructor(props: IButtonProps) {
        super(props);
    }

    public render(): JSX.Element {
        let {buttonType, children, icon, description, ariaLabel, ariaDescription, href, disabled, onClick} = this.props;

        const renderAsAnchor: boolean = !!href;
        const tag = renderAsAnchor ? 'a' : 'button';

        const className = css((this.props.className), 'timber-Button', {
            'timber-Button--primary': buttonType === ButtonType.primary,
            'timber-Button--icon': buttonType === ButtonType.icon,
            'timber-Button--compound': buttonType === ButtonType.compound
        });

        const iconSpan = icon && (buttonType === ButtonType.icon) ?
            <span className="timber-Button-icon"><i className={`timber-Icon timber-Icon--${icon}`}></i></span> : null;

        const labelId = "some_unique_id" //TODO: костыль

        return React.createElement(
            tag,
            assign(
                {},
                this.props.rootProps,
                href ? {href} : null,
                {
                    'ref': (c: HTMLButtonElement): HTMLButtonElement => this._buttonElement = c
                },
                onClick && {'onClick': onClick},
                disabled && {'disabled': disabled},
                {className}
                ),
            iconSpan,
            <span className='ms-Button-label' id={ labelId } >{ children }</span>
        );
    }

    public focus(): void {
        if (this._buttonElement) {
            this._buttonElement.focus();
        }
    }
}