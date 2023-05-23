import passwordValidator from "password-validator";

// Create a schema
const schema = new passwordValidator();

// Add properties to it
schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits() // Must have digits
  .has()
  .not()
  .spaces(); // Should not have spaces
// .is()
// .not()
// .oneOf(['Passw0rd', 'Password123']);

function passwordRules(password: string) {
  const pwValidationMessages = schema.validate(password, { details: true });

  if (Array.isArray(pwValidationMessages) && pwValidationMessages.length) {
    return {
      error: "insufficient-password" as const,
      pwValidationMessages: pwValidationMessages.map((result) =>
        result.message.replace("The string", "The password")
      ) as string[],
    };
  }
}

export default passwordRules;
