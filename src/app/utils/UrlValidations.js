export const validateUrl = (value) => {
  const urlRegex =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

  if (!value) {
    return true;
  } else if (urlRegex.test(value)) {
    return true;
  } else {
    return false;
  }
};
