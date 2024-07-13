export const validationRules = {
  mall_id: [{ type: 'required', message: 'Mall Name is required' }],
  img_type: [{ type: 'required', message: 'Banner Type is required' }],
  img_url: [{ type: 'required', message: 'Image/Video is required' }],
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
        // Add more validation rules as needed
      }
    }
  }

  return errors;
};
