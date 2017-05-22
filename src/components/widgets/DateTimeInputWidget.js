import React, {PropTypes} from "react";
import Datetime from 'react-datetime'
import moment from 'moment'
import 'moment/locale/ru'
import 'react-datetime/css/react-datetime.css'

export const formatDateCustom = (format) => (date) => date
  ? moment(new Date(date)).format(format)
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

  return (
    <Datetime
      locale="ru"
      dateFormat='DD.MM.YYYY'
      timeFormat='HH:mm'
      timeConstraints={{
        minutes: {
          step: 5,
        }
      }}
      inputProps={
        {
          className: formContext && formContext.preview ? 'ant-input ant-input-lg' : 'form-control',
          placeholder: 'ДД.ММ.ГГГГ чч:мм'
        }
      }
      isValidDate={isValid}
      onChange={(value) => {
        onChange(formatDate(value))
      }}
    />
  )
}

export default DateTimeInputWidget
