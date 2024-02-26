import Joi from "joi";

// schema Joi pour la mise à jour des infos d'un user
export function validateUpdateDataUser(userData) {
  const schema = Joi.object({
    newName: Joi.string().min(1),
    newEmail: Joi.string()
      .email()
      .pattern(/^.+@[a-z]+\.[a-z]{2,3}$/),
    newPassword: Joi.string().pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ),
    newPasswordConfirm: Joi.ref("newPassword"),
    oldPassword: Joi.string().pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ),
    newAddress: Joi.string(),
    newZip_code: Joi.string().pattern(
      /^0[1-9]\d{3}$|^[1-8]\d{4}$|^9[0-59]\d{3}$|^97[1-8]\d{2}$|^98[046-9]\d{2}$|^00000$/
    ),
    newCity: Joi.string(),
    newPhone_number: Joi.string().pattern(/^(.33.|0)\d{9}$/),
  });

  const { error } = schema.validate(userData);

  return error ? error.details[0].message : null;
}
