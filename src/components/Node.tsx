import { ReteComponent, Input, Output } from '../rete/ReteComponent';
import { useEffect } from 'react';

import { useRete } from '../provider/';

export default function ReactRete({
  children,
  onWork,
  name,
}: {
  children: any[];
  onWork: Function;
  name: string;
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
      'ADD_RETE_COMPONENT',
      new ReteComponent(name, inputs, outputs, onWork, component),
    ]);
  }, []);

  return <div></div>;
}
