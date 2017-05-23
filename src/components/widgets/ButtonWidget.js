import React, {PropTypes} from "react";

function ButtonWidget(props) {
  const {
    value,
    label,
    readonly,
    autofocus,
    onChange,
    options,  // eslint-disable-line
    schema,   // eslint-disable-line
    formContext,  // eslint-disable-line
    registry, // eslint-disable-line
    ...inputProps
  } = props;

  console.log('props', props)
  const mask = options.mask || ''
  const classNames = [
    formContext.preview ? "ant-btn" : "",
    options.classNames,
  ].join(" ").trim();
  return (
    <button
      className={classNames || undefined}
      onClick={options.type === 'reset' ? props.registry.resetForm : undefined}
      type={options.type}
    >
      {label || 'Button'}
    </button>
  )
}

export default ButtonWidget;
