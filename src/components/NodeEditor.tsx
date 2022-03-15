import React, { useEffect } from 'react';
import { useRete } from '../provider/';

export default function NodeEditor({ children, nodeComponents, style }: any) {
  const [{ editorRef }, dispatch] = useRete();

  useEffect(() => dispatch(['SET_COMPONENTS', nodeComponents]), []);

  return (
    <div ref={editorRef} style={style}>
      {children}
    </div>
  );
}
