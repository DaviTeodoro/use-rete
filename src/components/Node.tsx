import { ReteComponent, Input, Output } from '../rete/ReteComponent';
import React, { useEffect } from 'react';

import { useRete } from '../provider/';

export default function Node({
  children,
  onWork,
  name,
  path,
}: {
  children: any[];
  onWork: Function;
  name: string;
  path: string[];
}) {
  const [_, dispatch] = useRete();

  const inputs: Input[] = children
    .filter((c) => typeof c === 'object' && c.props.direction === 'in')
    .map((c) => c.props);

  const outputs: Output[] = children
    .filter((c) => typeof c === 'object' && c.props.direction === 'out')
    .map((c) => c.props);

  const component = children.filter((c) => typeof c === 'function')[0];

  useEffect(() => {
    dispatch([
      'SET_COMPONENTS',
      [new ReteComponent(name, inputs, outputs, onWork, component, path)],
    ]);
  }, []);

  return <div></div>;
}
