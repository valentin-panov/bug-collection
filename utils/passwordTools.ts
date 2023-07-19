import bcrypt from "bcryptjs";

const hashPassword = (password: string) => {
  return new Promise((resolve, reject) => {
    // Generate a salt at level 12 strength
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

const verifyPassword = (passwordAttempt: string, hashedPassword: string) => {
  return bcrypt.compare(passwordAttempt, hashedPassword);
};

export { hashPassword, verifyPassword };
