import React, { type ReactNode } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface AdminDashboardLayoutProps {
  children: ReactNode;
}
const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({ children }) => {
  return (
    <ScrollArea className="rounded-lg shadow-md">
      {children}
    </ScrollArea>
  );
};
export default AdminDashboardLayout;