"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { ChevronDown, Search, User, Menu } from "lucide-react";
import { Input } from "~/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";
import Link from "next/link";

const menuItems = [
  {
    name: "Academics",
    options: [
      { label: "Academics Management", href: "/admin/academics" },
      { label: "Session Management", href: "/admin/academics/annualSession/sessionalDetails" },
      { label: "Class Management", href: "/admin/academics/classwiseDetail" },
      { label: "Reports", href: "/admin/analytics" },
    ],
  },
  {
    name: "Alumni",
    options: [
      { label: "Faculty", href: "/alumni/faculty" },
      { label: "Tasks", href: "/alumni/tasks" },
      { label: "Attendance", href: "/alumni/attendance" },
      { label: "Salary", href: "/alumni/salary" },
    ],
  },
  {
    name: "Registration",
    options: [
      { label: "Online Portal", href: "/registration/portal" },
      { label: "Student", href: "/registration/student/view" },
      { label: "Faculty", href: "/registration/faculty/view" },
      { label: "Case Studies", href: "/registration" },
    ],
  },
  {
    name: "Company",
    options: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/about" },
      { label: "Press", href: "/about" },
      { label: "Contact", href: "/about" },
    ],
  },
];

export default function MainMenu() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRefs = useRef<Array<HTMLDivElement | null>>([]);

  const handleMenuClick = (menuName: string) => {
    setOpenDropdown((prev) => (prev === menuName ? null : menuName));
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (menuRefs.current.some((ref) => ref?.contains(e.target as Node))) {
      return;
    }
    setOpenDropdown(null);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <nav className="z-10 flex items-center justify-between p-4 bg-gradient-to-r from-emerald-400 via-yellow-300 to-green-900 shadow-lg">
      {/* Left section: Logo and menu */}
      <div className="flex items-center space-x-4">
        <Link href="/admin/dashboard" className="text-green-900 text-lg font-bold">
          Dashboard
        </Link>

        <div className="hidden lg:flex space-x-4">
          {menuItems.map((item, index) => (
            <div
              key={item.name}
              className="relative"
              ref={(el) => {
                menuRefs.current[index] = el;
              }}
            >
              <Button
                variant="ghost"
                className="flex items-center text-green-900 hover:bg-white/10"
                onClick={() => handleMenuClick(item.name)}
                aria-expanded={openDropdown === item.name}
                aria-haspopup="menu"
              >
                {item.name}{" "}
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform ${
                    openDropdown === item.name ? "rotate-180" : "rotate-0"
                  }`}
                />
              </Button>

              {openDropdown === item.name && (
                <div
                  className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  role="menu"
                  aria-orientation="vertical"
                >
                  {item.options.map((option) => (
                    <Link
                      key={option.label}
                      href={option.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100"
                      role="menuitem"
                      onClick={() => setOpenDropdown(null)} // Close dropdown on selection
                    >
                      {option.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right section: Search and user */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-green-900" />
          <Input
            className="pl-8 text-gray-900 placeholder-gray-400 bg-white rounded-full shadow-md focus:ring-2 focus:ring-purple-300 focus:outline-none"
            placeholder="Search..."
          />
        </div>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-white/20 text-green-900"
            >
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          >
            <DropdownMenuItem className="hover:bg-purple-100">
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-purple-100">
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-purple-100">
              <Link href="/logout">Logout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Mobile hamburger menu */}
        <Button
          variant="ghost"
          className="lg:hidden text-green-900 hover:bg-white/20"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg p-4">
          {menuItems.map((item) => (
            <div key={item.name}>
              <p className="text-lg font-semibold text-gray-900">{item.name}</p>
              {item.options.map((option) => (
                <Link
                  key={option.label}
                  href={option.href}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  {option.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
