import AuthService from '../service/auth.service.js';

export async function addDefaultAdmin() {
  await AuthService.register('admin', 'admin', 'adminpassword', 'admin');
}
