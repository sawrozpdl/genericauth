import React from 'react';

const Footer = React.lazy(() => import('./Footer'));
const Topbar = React.lazy(() => import('./Topbar'));
const Sidebar = React.lazy(() => import('./Sidebar'));

export { Sidebar, Footer, Topbar };
