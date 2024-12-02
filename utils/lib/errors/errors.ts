import { createFieldErrMsgs } from "./utils";

export const clientErr = {
  name: createFieldErrMsgs({
    field: "Name",
    expectedType: "string",
    required: true,
    minLength: 1,
    maxLength: 100,
  }),
  keys: createFieldErrMsgs({
    field: "Client Key",
    expectedType: "string",
    required: true,
  }),
  logoURL: createFieldErrMsgs({
    field: "Client Logo URL",
    required: false,
    expectedType: "string",
    minLength: 1,
  }),
};
