import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const PageHeader = ({ title, breadcrumb, hasBackButton }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-[30px] pb-7 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <nav
          aria-label="Breadcrumb"
          className="mb-4">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 lg:max-w-7xl">
            {breadcrumb.map((crumb, index) => (
              <li key={index}>
                <div className="flex items-center">
                  <a
                    href={crumb.link}
                    className="mr-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                    {crumb.text}
                  </a>
                  {index < breadcrumb.length - 1 && (
                    <svg
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300">
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </nav>

        {hasBackButton && (
          <button
            type="button"
            onClick={() => navigate(-1)}>
            <BiArrowBack className="size-6" />
          </button>
        )}
      </div>

      <h2 className="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight">
        {title}
      </h2>
    </div>
  );
};

export default PageHeader;
