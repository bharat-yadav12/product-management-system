import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Username is required",
    "string.min": "Username must be at least 3 characters",
    "string.max": "Username can be at most 30 characters"
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address"
  }),
  fullName: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Full Name is required",
    "string.min": "Full Name must be at least 3 characters",
    "string.max": "Full Name can be at most 50 characters"
  }),
  password: Joi.string().min(8).max(16).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
    "string.max": "Password can be at most 16 characters"
  })
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be valid"
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required"
  })
});
