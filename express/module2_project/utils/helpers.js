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

export function isValidDate(dateString) {
  if (!dateString.match(/\d{4}-\d{2}-\d{2}/)) return false;

  const dateObj = new Date(Date.parse(dateString));

  return dateObj instanceof Date && !isNaN(dateObj.getDate());
}
