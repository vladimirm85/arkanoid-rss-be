import * as bcryptjs from 'bcryptjs';

export const generateHash = async (password: string): Promise<string> => {
  const hash = await bcryptjs.hash(password, await bcryptjs.genSalt(10));
  return hash;
};
