"use client";
import React from "react";
import { IoArrowForward } from "react-icons/io5";

interface BreadcrumbProps {
  items: { label: string; href: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-600">
      {items.map((item, index) => (
        <span key={index} className="flex items-center">
          <a href={item.href} className="hover:text-gray-900 hover:underline">
            {item.label}
          </a>
          {index < items.length - 1 && (
            <span className="mx-1 text-gray-400"><IoArrowForward size={12} className="mt-1" /></span>
          )}
        </span>
      ))}
    </nav>
  );
};

interface HeaderProps {
  title: string;
  breadcrumbItems: { label: string; href: string }[];
}

const Header: React.FC<HeaderProps> = ({ title, breadcrumbItems }) => {
  return (
    <header className="bg-transparent p-4 flex items-center justify-between">
      <div>
        <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>
    </header>
  );
};

export default Header;
