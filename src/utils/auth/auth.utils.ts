const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const validateSignIn = (email: string, password: string) => {
  if (!email || !password) {
    return "Please fill out all fields";
  }
  if (email.length < 6 || !regexEmail.test(email)) {
    return "Invalid email";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }
};

export const validateSignUp = (
  email: string,
  password: string,
  confirmPassword: string,
  username: string
) => {
  if (!email || !password || !confirmPassword || !username) {
    return "Please fill out all fields";
  }
  if (email.length < 6 || !regexEmail.test(email)) {
    return "Invalid email";
  }
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }
  if (username.length <= 3) {
    return "Username must be at least 4 characters";
  }
};
