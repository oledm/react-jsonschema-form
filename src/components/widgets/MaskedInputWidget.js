import React, {PropTypes} from "react";
import InputElement from 'react-input-mask'


function MaskedInputWidget(props) {
  const {
    value,
    readonly,
    autofocus,
    onChange,
    options,  // eslint-disable-line
    schema,   // eslint-disable-line
    formContext,  // eslint-disable-line
    registry, // eslint-disable-line
    ...inputProps
  } = props;

  const classNames = [
    "form-control",
    options.inputClassNames,
  ].join(" ").trim();
  const mask = options.mask || ''

  return (
      <InputElement
          mask={mask}
          className={classNames}
          readOnly={readonly}
          autoFocus={autofocus}
          value={typeof value === "undefined" ? "" : value}
          onChange={(event) => onChange(event.target.value)}
      />
  )
}

export default MaskedInputWidget;
