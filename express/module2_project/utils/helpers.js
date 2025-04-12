import AuthService from '../service/auth.service.js';

export async function addDefaultAdmin() {
  await AuthService.register(0, 'admin', 'admin@gmail.com', 'adminpassword', 'admin');
}
