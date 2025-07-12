import React, { createContext, useContext, useState, useEffect } from 'react';

const RoleContext = createContext();

export const ROLE_ADMIN = 'admin';
export const ROLE_USER = 'user';
export const ROLE_GUEST = 'guest';

export function RoleProvider({ children }) {
  const [role, setRole] = useState(() => localStorage.getItem('rewear-role') || null);

  useEffect(() => {
    if (role) {
      localStorage.setItem('rewear-role', role);
    }
  }, [role]);

  const setRoleAndPersist = (newRole) => {
    setRole(newRole);
    localStorage.setItem('rewear-role', newRole);
  };

  const clearRole = () => {
    setRole(null);
    localStorage.removeItem('rewear-role');
  };

  return (
    <RoleContext.Provider value={{ role, setRole: setRoleAndPersist, clearRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
} 