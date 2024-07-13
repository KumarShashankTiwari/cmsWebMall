export const validationRules = {
  mallId: [{ type: 'required', message: 'Mall Name is required' }],
  serviceId: [{ type: 'required', message: 'Eminities is required' }],
  // contactPersonName: [{ type: 'required', message: 'Person is required' }],
  contactNumber: [
    { type: 'required', message: 'Contact Number is required' },
    {
      type: 'pattern',
      value: /^[0-9]{10}$/,
      message: 'Length should be 10',
    },
  ],
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

        if (rule.type === 'pattern' && !rule.value.test(value)) {
          errors[field] = rule.message || 'Invalid format';
          break;
        }
      }
    }
  }

  return errors;
};
