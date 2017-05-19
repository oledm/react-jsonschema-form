import React, {PropTypes} from "react";
import Datetime from 'react-datetime'
import moment from 'moment'
import 'moment/locale/ru'
import 'react-datetime/css/react-datetime.css'

export const formatDateCustom = (format) => (date) => date
  ? moment(date).format(format)
  : undefined
export const formatDate = formatDateCustom('DD.MM.YYYY HH:mm')

function isValid(current) {
  const yesterday = Datetime.moment().subtract( 1, 'day' )
  return current.isAfter(yesterday)
}

function DateTimeInputWidget(props) {
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

//      value={value ? value : moment()}
//      onChange={(event) => {
//        onChange(formatDate(event))
//      }}
//      value={value ? value : moment()}

//    <Datetime
//      locale="ru"
//      dateFormat='DD.MM.YYYY'
//      timeFormat='HH:mm'
//      placeholder='Выберите дату'
//      timeConstraints={{
//        minutes: {
//          step: 5,
//        }
//      }}
//      inputProps={
//        formContext && formContext.preview ?
//        {
//          className: 'ant-input ant-input-lg',
//        }
//        : null
//      }
//      viewMode='days'
//      value={value}
//      onChange={(event) => {
//        const res = formatDate(event)
//        console.log('res', res)
//        onChange(res)
//      }}

//      value={value}
//      onChange={(value) => {
//        const res = formatDate(value)
//        console.log('res', res)
//
//        onChange(value)
//      }}
//      isValidDate={isValid}
//      value={moment(value, 'DD.MM.YYYY HH:mm')}
//      value={value}
  return (
    <Datetime
      dateFormat='DD.MM.YYYY'
      timeFormat='HH:mm'
      closeOnSelect
      onChange={(value) => {
//        console.log('value', value)
        const res = formatDate(value)
//        console.log('res', res)
        onChange(res)
      }}
    />
  )
}

export default DateTimeInputWidget
