import toPath from "lodash.topath";
import R from 'ramda'
import {validate as jsonValidate} from "jsonschema";

import {isObject, mergeObjects} from "./utils";

function toErrorSchema(errors) {
  // Transforms a jsonschema validation errors list:
  // [
  //   {property: "instance.level1.level2[2].level3", message: "err a"},
  //   {property: "instance.level1.level2[2].level3", message: "err b"},
  //   {property: "instance.level1.level2[4].level3", message: "err b"},
  // ]
  // Into an error tree:
  // {
  //   level1: {
  //     level2: {
  //       2: {level3: {errors: ["err a", "err b"]}},
  //       4: {level3: {errors: ["err b"]}},
  //     }
  //   }
  // };
  if (!errors.length) {
    return {};
  }
//  console.log('toErrorSchema', errors)
  const res = errors.reduce((errorSchema, error) => {
//    console.log('current error', error)
    const {property, message, argument} = error;
    const path = toPath(property);
    let parent = errorSchema;
//    console.log('path', path)
    for (const segment of path.slice(1)) {
//      console.log('segment', segment)
      if (!(segment in parent)) {
        parent[segment] = {};
      }
      parent = parent[segment];
    }

    if (path.length === 1 && argument) {
      if (!(argument in parent)) {
        parent[argument] = {};
      }
      parent = parent[argument];
    }

    if (Array.isArray(parent.__errors)) {
      // We store the list of errors for this node in a property named __errors
      // to avoid name collision with a possible sub schema field named
      // "errors" (see `validate.createErrorHandler`).
      parent.__errors = parent.__errors.concat(message);
    } else {
      parent.__errors = [message];
    }
//    console.log('errors', errors, 'parent', parent)
    return errorSchema;
  }, {});
//  console.warn('result', res)
  return res
}

export function toErrorList(errorSchema, fieldName = "root") {
  // XXX: We should transform fieldName as a full field path string.
//  console.log('toErrorList field', fieldName, 'errorSchema', errorSchema)
  let errorList = [];
  if ("__errors" in errorSchema) {
    errorList = errorList.concat(errorSchema.__errors.map(stack => {
      return {
        stack: `${fieldName}: ${stack}`
      };
    }));
  }
  return Object.keys(errorSchema).reduce((acc, key) => {
    if (key !== "__errors") {
      acc = acc.concat(toErrorList(errorSchema[key], key));
    }
    return acc;
  }, errorList);
}

function createErrorHandler(formData) {
  const handler = {
    // We store the list of errors for this node in a property named __errors
    // to avoid name collision with a possible sub schema field named
    // "errors" (see `utils.toErrorSchema`).
    __errors: [],
    addError(message) {
      this.__errors.push(message);
    },
  };
  if (isObject(formData)) {
    return Object.keys(formData).reduce((acc, key) => {
      return {...acc, [key]: createErrorHandler(formData[key])};
    }, handler);
  }
  return handler;
}

function unwrapErrorHandler(errorHandler) {
  return Object.keys(errorHandler).reduce((acc, key) => {
    if (key === "addError") {
      return acc;
    } else if (key === "__errors") {
      return {...acc, [key]: errorHandler[key]};
    }
    return {...acc, [key]: unwrapErrorHandler(errorHandler[key])};
  }, {});
}

/**
 * This function processes the formData with a user `validate` contributed
 * function, which receives the form data and an `errorHandler` object that
 * will be used to add custom validation errors for each field.
 */


export function validateFormDataOnSubmit(formData, schema, customValidate, transformErrors) {
  let {errors} = jsonValidate(formData, schema);
//  console.log('validate 1', formData, 'errors', errors)
  if (typeof transformErrors === "function") {
    errors = transformErrors(errors);
  }
//  console.log('validate 2', formData, 'errors', errors)
  const errorSchema = toErrorSchema(errors);
//  console.log('validate 2 errorSchema', errorSchema)

  if (typeof customValidate !== "function") {
//    console.log('return errors', {errors, errorSchema})
    return {errors, errorSchema};
  }

  const errorHandler = customValidate(formData, createErrorHandler(formData));
  const userErrorSchema = unwrapErrorHandler(errorHandler);
  const newErrorSchema = mergeObjects(errorSchema, userErrorSchema, true);
  // XXX: The errors list produced is not fully compliant with the format
  // exposed by the jsonschema lib, which contains full field paths and other
  // properties.
  const newErrors = toErrorList(newErrorSchema);

//  console.log('return errors', {errors: newErrors, errorSchema: newErrorSchema})
  return {errors: newErrors, errorSchema: newErrorSchema};
}


export default function validateFormData(formData, schema, customValidate, transformErrors, context) {
  let needValidateFields = []
  Object.keys(context.formControlState).forEach((key) => {
    console.log('key', key, 'value', )
    const value = context.formControlState[key]
    if (value) {
      needValidateFields = needValidateFields.concat(key)
    }
  })
  console.log('needValidateFields', needValidateFields)

//  const filteredFormData = {}
//  needValidateFields.forEach((field) => {
//    filteredFormData[field] = formData[field]
//  })
  let filteredSchema = R.evolve({
//    required: R.always(needValidateFields),
    required: R.intersection(needValidateFields),
  })(schema)
  console.warn('filteredSchema', filteredSchema)
  let {errors} = jsonValidate(formData, filteredSchema);
  console.log('validate 1', formData, 'schema', schema, 'errors', errors, 'context', context)

  if (typeof transformErrors === "function") {
    errors = transformErrors(errors);
  }
//  console.log('validate 2', formData, 'errors', errors)
  const errorSchema = toErrorSchema(errors);
//  console.log('validate 2 errorSchema', errorSchema)

  if (typeof customValidate !== "function") {
//    console.log('return errors', {errors, errorSchema})
    return {errors, errorSchema};
  }

  const errorHandler = customValidate(formData, createErrorHandler(formData));
  const userErrorSchema = unwrapErrorHandler(errorHandler);
  const newErrorSchema = mergeObjects(errorSchema, userErrorSchema, true);
  // XXX: The errors list produced is not fully compliant with the format
  // exposed by the jsonschema lib, which contains full field paths and other
  // properties.
  const newErrors = toErrorList(newErrorSchema);

//  console.log('return errors', {errors: newErrors, errorSchema: newErrorSchema})
  return {errors: newErrors, errorSchema: newErrorSchema};
}
