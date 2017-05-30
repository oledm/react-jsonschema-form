import React, {PropTypes} from "react";
import ReactTelInput from '@oledm/react-telephone-input'
import '@oledm/react-telephone-input/lib/withStyles'
//import countryData from 'country-telephone-data'

//const onlyCountries =
//  [
//    countryData.allCountries[countryData.iso2Lookup.ru],
//    countryData.allCountries[countryData.iso2Lookup.by],
//    countryData.allCountries[countryData.iso2Lookup.kz],
//    countryData.allCountries[countryData.iso2Lookup.am],
//  ]
//
//console.warn('countries available 1:', onlyCountries)
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
//function PhoneInputWidget({
//  schema,
//  id,
//  options,
//  value,
//  required,
//  disabled,
//  readonly,
//  multiple,
//  autofocus,
//  onChange,
//  onBlur,
//  placeholder,
//  formContext,
//}) {
//  console.log('Phone options', options)
//  return (
//      <ReactTelInput
//        value={value}
//        defaultCountry={options.country}
//        flagsImagePath="/assets/images/flags.png"
//        onlyCountries={onlyCountries}
//        onBlur={onBlur && (value => {
////          console.log('event', event)
//          onBlur(id, event)
//        })}
//        onFocus={() => formContext.setTouched(id)}
//        onChange={(value) => {
////          console.log('PhoneInput onChange', value)
//          onChange(value)
//        }}
//      />
//  );
//}

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
