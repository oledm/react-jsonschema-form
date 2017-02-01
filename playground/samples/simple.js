module.exports = {
  schema: {
    title: "A registration form",
    description: "A simple form example.",
    type: "object",
    required: ["firstName", "lastName"],
    properties: {
      firstName: {
        type: "string",
        title: "First name",
      },
      lastName: {
        type: "string",
        title: "Last name",
      },
      firstName: {
        type: "string",
        title: "First name",
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
      }
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
    masked: {
      "ui:widget": "maskedInput",
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
    }
  },
  formData: {
    firstName: "Chuck",
    lastName: "Norris",
    age: 75,
    bio: "Roundhouse kicking asses since 1940",
    password: "noneed"
  }
};
