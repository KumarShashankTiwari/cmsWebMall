export const validationRules = {
  storeName: [{ type: 'required', message: 'Store Name is required' }],
  description: [
    { type: 'required', message: 'Store description is required' },

    { type: 'maxLength', value: 300, message: 'Maximum Length should be 300' },
  ],
  location: [{ type: 'required', message: 'Location is required' }],
  contactNumber: [
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
  mallId: [{ type: 'required', message: 'Mall is required' }],
  categoryId: [{ type: 'required', message: 'Category is required' }],
  subCategoryId: [{ type: 'required', message: 'Sub Category is required' }],
  partOfReward: [{ type: 'required', message: 'Part Of Reward is required' }],
  managerDetailsName: [
    { type: 'required', message: 'Manager Details Name is required' },
  ],
  managerPhoneNumber: [
    { type: 'required', message: 'Manager Phone Number is required' },
    { type: 'pattern', value: /^[0-9]{10}$/, message: 'Invalid Phone Number' },
  ],
  coverImage: [{ type: 'required', message: 'Cover Image is required' }],
  logo: [{ type: 'required', message: 'Logo Image is required' }],
  managerEmail: [
    { type: 'required', message: 'Email is required' },
    {
      type: 'pattern',
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Email is invalid',
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

        // Add more validation rules as needed
      }
    }
  }

  return errors;
};
