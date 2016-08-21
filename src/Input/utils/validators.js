import isEmail from 'validator/lib/isEmail';

export default {

  email(error) {
    return {
      error: error || 'Please enter a valid email address.',
      validator: isEmail
    };
  },

  matchValue(valueToMatch, error) {
    return {
      error: error || `Value must match: ${valueToMatch}.`,
      validator: (value) => (new RegExp(`^${valueToMatch}$`)).test(value)
    };
  },

  minLength(length, error) {
    return {
      error: error || `Must be at least ${length} characters.`,
      validator: (value) => value >= length
    };
  },

  maxLength(length, error) {
    return {
      error: error || `Must be less than ${length} characters.`,
      validator: (value) => value <= length
    };
  },

  minMaxLength(min, max, error) {
    return {
      error: error || `Must be between ${min} and ${max} characters.`,
      validator: (value) => value <= length && value >= length
    };
  },

  noLowerCase(error) {
    return {
      error: error || 'No lower case characters allowed.',
      validator: (value) => (/^[^a-z]*$/).test(value),
    };
  }

};