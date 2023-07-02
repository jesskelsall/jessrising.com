// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

import Joi from "joi";

interface JestTestResponse {
  message: () => string;
  pass: boolean;
}

// Provides Jest expect support for Joi.validate
const toMatchJoiSchema = (
  data: any, // eslint-disable-line
  schema: Joi.AnySchema,
  options: Joi.ValidationOptions
): JestTestResponse => {
  try {
    Joi.assert(data, schema, { abortEarly: false, ...options });

    return {
      message: () => "Success",
      pass: true,
    };
  } catch (error) {
    return {
      message: () => {
        const { details } = error as Joi.ValidationError;
        const message = details.map((errorItem) => ({
          message: errorItem.message,
          path: errorItem.path,
          validationFailed: errorItem.type.split(".").reverse()[0],
        }));

        return JSON.stringify(message);
      },
      pass: false,
    };
  }
};

expect.extend({ toMatchJoiSchema });
