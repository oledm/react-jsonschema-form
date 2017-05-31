import React, {PropTypes} from "react";
import ReactTelInput from '@oledm/react-telephone-input'
import '@oledm/react-telephone-input/lib/withStyles'

class PhoneInputWidget extends React.Component {
  shouldComponentUpdate(nextProps) {
    // This is required only when widget is in constructor-mode (opposite preview-mode).
    if (nextProps.options.country !== this.props.options.country) {
      setTimeout(() => {
        this.forceUpdate()
      }, 0)
    }
    return true
  }

  render() {
    const {
      schema,
      id,
      options,
      value,
      required,
      disabled,
      readonly,
      multiple,
      autofocus,
      onChange,
      onBlur,
      placeholder,
      formContext,
    } = this.props
//    console.log('Phone options', options)
//    console.log('countries available 2:', options.onlyCountries)
//        flagsImagePath={`${options.apiRoot}/assets/images/flags.png`}
    return (
      <ReactTelInput
        value={value}
        defaultCountry={options.country}
        flagsImagePath={`${options.apiRoot}/assets/images/flags.png`}
        onlyCountries={options.onlyCountries}
        onBlur={onBlur && (value => onBlur(id, event))}
        onFocus={() => formContext.setTouched(id)}
        onChange={onChange}
      />
    )
  }
}

//PhoneInputWidget.defaultProps = {
//  autofocus: false,
//};
//
//if (process.env.NODE_ENV !== "production") {
//  PhoneInputWidget.propTypes = {
//    schema: PropTypes.object.isRequired,
//    id: PropTypes.string.isRequired,
//    options: PropTypes.shape({
//      enumOptions: PropTypes.array,
//    }).isRequired,
//    value: PropTypes.any,
//    required: PropTypes.bool,
//    multiple: PropTypes.bool,
//    autofocus: PropTypes.bool,
//    onChange: PropTypes.func,
//    onBlur: PropTypes.func,
//  };
//}

export default PhoneInputWidget;
