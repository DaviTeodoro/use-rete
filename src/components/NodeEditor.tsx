import React from 'react';
import { useRete } from '../provider/';

export default function NodeEditor() {
  const [{ editorRef }, dispatch] = useRete();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#43465c',
        backgroundColor: 'rgb(23, 31, 49)',
        backgroundImage:
          'linear-gradient(\n      rgba(31, 53, 105, 0.329) 2px,\n      transparent 2px\n    ),\n    linear-gradient(90deg, rgba(31, 53, 105, 0.329) 2px, transparent 2px),\n    linear-gradient(rgba(31, 23, 141, 0.3) 1px, transparent 1px),\n    linear-gradient(90deg, rgba(31, 23, 141, 0.3) 1px, transparent 1px)',
        backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
        backgroundPosition: '-2px -2px, -2px -2px, -1px -1px, -1px -1px',
      }}
      ref={editorRef}
    />
  );
}
