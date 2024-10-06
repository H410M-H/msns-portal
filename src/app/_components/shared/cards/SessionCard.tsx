  import { Boxes, CalendarCog, UserPlusIcon } from "lucide-react";
  import Link from "next/link";
  
  export const SessionCards = () => {
    const services = [
      {
        title: "Session Management",
        description:
          "Easily enroll new students and manage their financial records.",
        icon: <CalendarCog className="mb-4 h-12 w-12 text-green-500" />,
        href: "/admin/academics/annualSession/sessionalDetails",
      },
      {
        title: "Classes Allottment",
        description:
          "Easily enroll new Employees and manage their financial records.",
        icon: <UserPlusIcon className="mb-4 h-12 w-12 text-green-500" />,
        href: "/admin/academics/classwiseDetail",
      },
      {
        title: "Section & Class Management",
        description:
          "Easily enroll new students and manage their financial records.",
        icon: <Boxes className="mb-4 h-12 w-12 text-green-500" />,
        href: "/student/academics",
      },
    ];
  
    return (
      <div className="relative grid grid-col gap-10 pt-12 sm:grid-cols-3 max-w-6xl animate-slide-in-up">
      {services.map((service, index) => (
        <Link
        href={service.href}
        key={index}
        className="relative group gap-10 p-2 transform transition-all duration-500 ease-in-out hover:scale-105 hover:z-10"
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        {/* Background Card Decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-700 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl opacity-80 transition-transform duration-700 ease-in-out group-hover:rotate-0 group-hover:skew-y-0 group-hover:scale-105"></div>

        {/* Card Content */}
        <div className="relative z-10 px-6 py-8 bg-yellow-100 backdrop-blur-lg shadow-xl rounded-3xl transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:rotate-1">
          <div className="flex flex-col items-center text-center">
            {service.icon}
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-700 transition-colors duration-300">
              {service.title}
            </h3>
            <p className="mt-2 text-gray-700 group-hover:text-green-600 transition-colors duration-300">
              {service.description}
            </p>
          </div>
        </div>
      </Link>
      ))}
    </div>
    );
  };
  