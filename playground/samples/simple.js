module.exports = {
  schema: {
    title: "A registration form",
    description: "A simple form example.",
    type: "object",
    required: ["firstName", "lastName", "checkbox"],
    properties: {
      firstName: {
        type: "string",
        title: "First name",
        minLength: 5,
      },
      lastName: {
        type: "string",
        title: "Last name",
      },
      age: {
        type: "integer",
        title: "Age"
      },
      masked: {
        type: "string",
        title: "Masked input",
      },
      bio: {
        type: "string",
        title: "Bio",
      },
      password: {
        type: "string",
        title: "Password",
        minLength: 3
      },
      datetime: {
        type: "string",
        title: "DateTime",
      },
      checkbox: {
        hideLabel: true,
        title: "Check me",
        type: "boolean",
      },
      disclaimer: {
        type: "string",
        title: "Disclaimer",
      },
      button1: {
        type: "string",
        title: "Submit",
      },
      button2: {
        type: "string",
        title: "Reset",
      },
    }
  },
  uiSchema: {
    firstName: {
      "ui:autofocus": true,
      "ui:inputClassNames": "input-lalala"
    },
    age: {
      "ui:widget": "updown"
    },
    datetime: {
      "ui:widget": "dateTime",
    },
    masked: {
      "ui:widget": "maskedInput",
      "ui:mask": "+7(999) 999-99-99",
      "ui:inputClassNames": "masked-lalala"
    },
    bio: {
      "ui:widget": "textarea",
      "ui:inputClassNames": "textarea-lalala"
    },
    password: {
      "ui:widget": "password",
      "ui:help": "Hint: Make it strong!"
    },
    date: {
      "ui:widget": "alt-datetime"
    },
    disclaimer: {
      "ui:widget": "staticText",
      "ui:content": `&laquo;Отправить&raquo;, я&nbsp;даю согласие на&nbsp;обработку моих персональных данных и&nbsp;получение рекламы.
<br>
С&nbsp;условиями обработки персональных данных и&nbsp;получения рекламы, изложенными на&nbsp;сайте LANDROVER-ROLF.RU (<a href="http://www.landrover-rolf.ru/agreement/" target="_blank"><span style="text-decoration:underline;">Согласие на&nbsp;обработку персональных данных и&nbsp;получение рекламы</span></a>)&nbsp;&mdash; ознакомлен и&nbsp;согласен.`,
      "ui:classNames": "disclaimer_class",
    },
    button1: {
      "ui:widget": "button",
      "ui:type": "submit",
    },
    button2: {
      "ui:widget": "button",
      "ui:type": "reset",
    }
  },
  formData: {
  }
//  formData: {
//    firstName: "Chuck",
//    lastName: "Norris",
//    age: 75,
//    bio: "Roundhouse kicking asses since 1940",
//    password: "noneed"
//  }
};
