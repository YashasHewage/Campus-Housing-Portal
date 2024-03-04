const roles = {
    admin: ['read', 'write', 'delete'],
    student: ['read'],
    warden: ['read'],
    propertyOwner: ['read', 'write', 'delete'],

    guest: [],
  };
  
export default roles;