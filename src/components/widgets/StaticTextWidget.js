import React, {PropTypes} from "react";

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

  const mask = options.mask || ''
  return (
    <div
      className={options.classNames}
      dangerouslySetInnerHTML={{ __html: options.content }}
    />
  )
}

export default MaskedInputWidget;
