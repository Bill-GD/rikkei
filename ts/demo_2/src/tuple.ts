const roles: [string, string, string] = ['admin', 'mod', 'user'];//, 'dev'];

// roles.push('dev'); // can use (tuple = array) but shouldn't

for (const r of roles) {
  console.log(r);
}

console.table(roles);
