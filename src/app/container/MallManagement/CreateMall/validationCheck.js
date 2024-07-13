// Define the validation rules
export const validationRules = {
  mallName: [{ type: 'required', message: 'Mall Name is required' }],
  description: [
    { type: 'required', message: 'Store description is required' },

    { type: 'maxLength', value: 300, message: 'Maximum Length should be 300' },
  ],
  location: [{ type: 'required', message: 'Location is required' }],
  address: [{ type: 'required', message: 'Address is required' }],
  contact_number: [
    { type: 'required', message: 'Contact Number is required' },
    {
      type: 'pattern',
      value: /^[0-9]{10}$/,
      message: 'Should be a 10-digit mobile number or a valid landline number',
    },
    {
      type: 'pattern',
      value: /^0[1-9][0-9]{2,3}[-\s]?[0-9]{8}$/,
      message: 'Should be a 10-digit mobile number or a valid landline number',
    },
    {
      type: 'pattern',
      value: /^011-[0-9]{8}$/,
      message: 'Should be a 10-digit mobile number or a valid landline number',
    },
  ],
  opening_time: [{ type: 'required', message: 'Opening time is required' }],
  closing_time: [{ type: 'required', message: 'Closing time is required' }],
  logo: [{ type: 'required', message: 'Logo Image is required' }],
};

// utils/validation.js
export const validate = (values, rules) => {
  const errors = {};

  for (const field in rules) {
    if (rules.hasOwnProperty(field)) {
      const value = values[field];
      const fieldRules = rules[field];

      for (const rule of fieldRules) {
        if (rule.type === 'required' && !value) {
          errors[field] = rule.message || 'This field is required';
          break;
        }
        if (rule.type === 'minLength' && value.length < rule.value) {
          errors[field] = rule.message || `Minimum length is ${rule.value}`;
          break;
        }

        if (rule.type === 'maxLength' && value.length > rule.value) {
          errors[field] = rule.message || `Maximum length is ${rule.value}`;
          break;
        }

        if (rule.type === 'pattern') {
          // Check if any pattern matches
          const isPatternMatched = fieldRules
            .filter((r) => r.type === 'pattern')
            .some((r) => r.value.test(value));

          if (!isPatternMatched) {
            errors[field] = rule.message || 'Invalid format';
            break;
          }
        }
      }
    }
  }

  return errors;
};
