import { z } from "zod";

const requiredMessage = "This field is required";

const planSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
});

const addOnSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
});

export const formSchema = z.object({
  name: z.string().min(1, {
    message: requiredMessage,
  }),
  email: z
    .string()
    .min(1, {
      message: requiredMessage,
    })
    .email({ message: "Please enter valid email address" }),
  phone: z
    .string()
    .min(1, {
      message: requiredMessage,
    })
    .refine(
      (value) => {
        const sanitizedValue = value.replace(/\s+/g, ""); // Remove all spaces
        return /^\+1\d{9}$/.test(sanitizedValue);
      },
      {
        message: '"Please enter valid US phone number""',
      },
    ),

  plan: planSchema,
  planPeriod: z.enum(["monthly", "yearly"]),
  addOns: z.array(addOnSchema).optional(),
});
