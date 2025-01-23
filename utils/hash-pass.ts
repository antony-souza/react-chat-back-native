import * as bcrypt from 'bcrypt';

export const createHash = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(7);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};
