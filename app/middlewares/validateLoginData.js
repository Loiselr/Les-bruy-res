import Joi from "joi";

// schema Joi pour le login
export function validateLoginData(data) {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .pattern(/^.+@[a-z]+\.[a-z]{2,3}$/),
    password: Joi.string()
      .required()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
  });

  const { error } = schema.validate(data);
  return error ? error.details[0].message : null;
}
