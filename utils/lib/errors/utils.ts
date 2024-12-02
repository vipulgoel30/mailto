// Third party imports
import { z } from "zod";

export interface CreateFieldErrMsgsOptions {
  field: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  expectedType?: string;
  enums?: z.EnumLike;
  format?: string;
}

export interface FieldErrMsgs {
  required?: string;
  minLength?: { length: number; msg: string };
  maxLength?: { length: number; msg: string };
  type?: string;
  format?: string;
}

export const createFieldErrMsgs = ({
  field,
  required = true,
  minLength,
  maxLength,
  expectedType,
  enums,
  format,
}: CreateFieldErrMsgsOptions): FieldErrMsgs => {
  if (enums) {
    const fields: string[] = Object.values(enums).filter((value: string | number) => typeof value === "string");
    format = `Invalid ${field}. Expected : ${fields.slice(0, fields.length - 1).join(", ")} or ${fields.at(-1)}`;
  }

  return {
    ...(required && { required: `Missing required field : ${field}` }),
    ...(expectedType && { required: `${field}' must be a valid ${expectedType}.` }),
    ...(minLength && { length: minLength, msg: `${field} too short, min ${minLength} chars` }),
    ...(maxLength && { length: maxLength, msg: `${field} too long, max ${maxLength} chars` }),
    ...(format && { format }),
  };
};
