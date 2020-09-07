import AccessControl from 'role-acl';

let grantList = [
  { role: 'staff', resource: 'notUser', action: 'all', attributes: ['*'] },
  { role: 'user', resource: 'book,borrow', action: 'list', attributes: ['*'] },
  { role: 'manage', resource: 'user', action: 'all', attributes: ['*'] }
]
export const ac = new AccessControl(grantList);