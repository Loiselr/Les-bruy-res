import Joi from "joi";

// schema de validation des données d'un user lors de la création
export function validateUserData(userData) {
  const schema = Joi.object({
    name: Joi.string().min(1),
    email: Joi.string().email().required().pattern(/^.+@[a-z]+\.[a-z]{2,3}$/),
    password: Joi.string()
      .required()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    passwordConfirm: Joi.ref("password"), // Utilisation de Joi.ref pour référencer le champ 'password'
    address: Joi.string(),
    zip_code: Joi.string()
      .pattern(
        /^0[1-9]\d{3}$|^[1-8]\d{4}$|^9[0-59]\d{3}$|^97[1-8]\d{2}$|^98[046-9]\d{2}$|^00000$/
      ),
    city: Joi.string(),
    phone_number: Joi.string().pattern(/^(.33|0)\d{9}$/)
  });

  const { error } = schema.validate(userData);
  return error ? error.details[0].message : null;
}
