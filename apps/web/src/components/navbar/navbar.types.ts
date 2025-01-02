import React from 'react';

export interface NavbarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  icon: string;
}
