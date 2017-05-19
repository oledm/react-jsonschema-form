import React, {PropTypes} from "react";
import Datetime from 'react-datetime'
import moment from 'moment'
import 'moment/locale/ru'
import 'react-datetime/css/react-datetime.css'

export const formatDateCustom = (format) => (date) => date
  ? moment(date).format(format)
  : undefined
export const formatDate = formatDateCustom('DD.MM.YYYY HH:mm')

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
      placeholder='Выберите дату'
      value={value ? value : moment()}
      inputProps={
        formContext && formContext.preview ?
        {
          className: 'ant-input ant-input-lg',
        }
        : null
      }
      onChange={(event) => {
        onChange(formatDate(event))
      }}
    />
  )
}

export default DateTimeInputWidget;
