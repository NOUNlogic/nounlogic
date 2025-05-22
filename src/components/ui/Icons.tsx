'use client';

import React from 'react';

interface IconProps {
  className?: string;
}

export const HomeIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

export const BookIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

export const BuildingIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01" />
    <path d="M16 6h.01" />
    <path d="M8 10h.01" />
    <path d="M16 10h.01" />
    <path d="M8 14h.01" />
    <path d="M16 14h.01" />
  </svg>
);

export const UsersIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const ChartBarIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

export const PuzzleIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925-.198-.526-.54-.997-1.033-1.26-.284-.15-.63-.257-1.05-.241-.868.039-1.511.732-1.642 1.593-.058.382-.013.791.154 1.139.467.967 1.649 1.352 2.655 1.004.367-.127.654-.378.921-.658.241-.25.582-.324.881-.206.431.171.616.657.428 1.062-.131.28-.272.494-.442.689-.407.465-.89.827-1.467 1.026-.463.16-.962.227-1.476.177-1.828-.177-3.347-1.683-3.51-3.509-.048-.532.047-1.045.209-1.536.488-1.48 1.817-2.393 3.33-2.499 1.531-.108 2.835.728 3.527 1.827.05.08.134.151.203.105.095-.064.104-.179.068-.271-.106-.27-.234-.528-.386-.775-.444-.723-1.1-1.256-1.91-1.532-.418-.142-.852-.219-1.296-.223-1.842-.016-3.493 1.183-4.03 2.916-.296.952-.244 1.908.055 2.843.332 1.05.997 1.895 1.929 2.524.941.635 2.042.902 3.193.775 1.096-.121 2.057-.566 2.83-1.321.436-.427.789-.925 1.083-1.476.277-.523.413-1.088.407-1.69-.013-1.126-.641-2.215-1.688-2.733a1.33 1.33 0 0 0-1.083-.083c-.312.094-.549.307-.712.564-1.181 1.857-3.705 2.2-5.39.63-.36-.336-.651-.723-.854-1.164-.203-.441-.272-.91-.261-1.39.022-.888.334-1.678.879-2.358.545-.679 1.304-1.164 2.196-1.363.273-.061.554-.1.838-.117" />
  </svg>
);

export const BrainIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.04Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24A2.5 2.5 0 0 0 14.5 2Z" />
  </svg>
);

export const CubeIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m21 16-8 4-8-4" />
    <path d="m21 12-8 4-8-4" />
    <path d="M3 12V8l8-4 8 4v4" />
  </svg>
);

export const CogIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
    <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <path d="M12 2v2" />
    <path d="M12 22v-2" />
    <path d="m17 20.66-1-1.73" />
    <path d="M11 10.27 7 3.34" />
    <path d="m20.66 17-1.73-1" />
    <path d="m3.34 7 1.73 1" />
    <path d="M14 12h8" />
    <path d="M2 12h2" />
    <path d="m20.66 7-1.73 1" />
    <path d="m3.34 17 1.73-1" />
    <path d="m17 3.34-1 1.73" />
    <path d="m11 13.73-4 6.93" />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const BellIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

export const LogoutIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);