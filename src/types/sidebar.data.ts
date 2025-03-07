import React, { ReactNode } from "react"; // Ensure React is imported for JSX elements
import * as FaIcons from "react-icons/fa";
// import * as SiIcons from "react-icons/si";
// import * as BiIcons from "react-icons/bi";
// import * as PiIcons from "react-icons/pi";
// import * as RiIcons from "react-icons/ri";
// import * as MdIcons from "react-icons/md";

// Define the type for navigation items
// sidebar.data.ts
export interface NavItem {
  label: string;
  icon: ReactNode;
  link?: string;
  subItems?: NavItem[]; // Add subItems property
}

// Generic function to get an icon component dynamically
const getIcon = (
  iconName: string,
  iconsList: Record<string, React.ComponentType>
): ReactNode => {
  try {
    // Dynamically import the icon component from react-icons/fa
    const IconComponent = iconsList[iconName];
    if (!IconComponent) {
      console.error(`Icon "${iconName}" not found in react-icons/fa.`);
      return null; // Return null if the icon is not found
    }
    // Create and return the React element for the icon
    return React.createElement(IconComponent);
  } catch (error) {
    console.error(`Icon "${iconName}" not found.`);
    return null; // Return null if the icon is not found
  }
};

export const adminNavItems: NavItem[] = [
  {
    label: "Employees",
    icon: getIcon("FaUserCircle", FaIcons),
    link: "/employees",
  },
  {
    label: "User Management",
    icon: getIcon("FaUser", FaIcons),
    subItems: [
      {
        label: "Customer",
        icon: getIcon("FaUserCircle", FaIcons),
        link: "/customers",
      },
      {
        label: "Driver",
        icon: getIcon("FaCar", FaIcons),
        link: "/drivers",
      },
    ],
  },
  {
    label: "Services",
    icon: getIcon("FaCarSide", FaIcons),
    link: "/services",
  },
];
