import React, {PropTypes} from "react";
import ReactTelInput from 'react-telephone-input'
import countryData from 'country-telephone-data'
import 'react-telephone-input/lib/withStyles'

const onlyCountries =
  [
    countryData.allCountries[countryData.iso2Lookup.ru],
    countryData.allCountries[countryData.iso2Lookup.by],
    countryData.allCountries[countryData.iso2Lookup.kz],
    countryData.allCountries[countryData.iso2Lookup.am],
  ]

//console.warn('onlyCountries', onlyCountries)
class PhoneInputWidget extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.options !== this.props.options) {
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
    return (
      <ReactTelInput
        value={value}
        defaultCountry={options.country}
        flagsImagePath={`${options.apiRoot}/assets/images/flags.png`}
        onlyCountries={onlyCountries}
        onBlur={onBlur && (value => {
          onBlur(id, event)
        })}
        onFocus={() => formContext.setTouched(id)}
        onChange={(value) => {
          onChange(value)
        }}
      />
    )
  }
}
function PhoneInputWidget({
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
}) {
  console.log('Phone options', options)
  return (
      <ReactTelInput
        value={value}
        defaultCountry={options.country}
        flagsImagePath="/assets/images/flags.png"
        onlyCountries={onlyCountries}
        onBlur={onBlur && (value => {
//          console.log('event', event)
          onBlur(id, event)
        })}
        onFocus={() => formContext.setTouched(id)}
        onChange={(value) => {
//          console.log('PhoneInput onChange', value)
          onChange(value)
        }}
      />
  );
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
