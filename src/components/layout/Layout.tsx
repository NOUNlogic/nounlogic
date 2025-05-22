import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-background">
      {/* Content will be added by the MainLayout or other specialized layouts */}
      {children}
    </div>
  );
};

export default Layout;