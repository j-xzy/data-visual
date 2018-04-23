import * as React from 'react';

import './style.styl';

interface IItemProps {
  name: string;
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
}

export default function Item(props: IItemProps) {
  return (
    <div style={props.style} className={`setting-item ${props.className}`}>
      <span className='setting-item-name'>
        {props.name}
      </span>
      <div className='setting-item-container'>
        {props.children}
      </div>
    </div>
  );
}