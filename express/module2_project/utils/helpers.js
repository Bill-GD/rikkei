import fs from 'node:fs';
import AuthService from '../service/auth.service.js';
import UserService from '../service/user.service.js';

export async function addDefaultAdmin() {
  if (!(await UserService.hasUser({ id: 0, email: 'admin@gmail.com' }))) {
    await AuthService.register(0, 'admin', 'admin@gmail.com', 'adminpassword', 'admin');
  }
}

export function deleteUploadedImage(imagePath) {
  const path = `${process.cwd()}/public${imagePath}`;
  if (fs.existsSync(path)) fs.rmSync(path);
}
