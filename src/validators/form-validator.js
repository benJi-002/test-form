import { z } from "zod";

const PHONE_REGEX = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
const NAME_REGEX = new RegExp(
  /^([a-zA-Z]|\s|^)+$/
);
const ACCEPTED_FILE_TYPES = ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/pdf", "image/png"];

export const FormSchema = z.object({
  name: z.string().min(3, {message: 'The name must contain at least 3 letters'}).max(15, {message: 'The name must contain less than 15 letters'}).regex(NAME_REGEX, 'Enter a correct name'),
  phone: z.string().regex(PHONE_REGEX, 'Enter a correct number'),
  email: z.string().email({message: 'Enter a correct e-mail'}),
  skill: z.string({ required_error: "Select the appropriate option" }),
  files: z.any()
    .refine((files) => files?.length > 0, "File is required.")
    .refine(
      (files) => files?.every((file) => ACCEPTED_FILE_TYPES.includes(file.type)),
      "Unsupported file format"),
  checkbox: z.any()
    .refine((checked) => checked == true, "Is required")
});
