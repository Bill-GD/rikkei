// enum Role {admin = 'admin', user, dev} // requires init
enum Role {admin = 10, user, dev} // will be iteratively assigned

for (const r of Object.keys(Role)) {
  console.log(`${r}`);
}
