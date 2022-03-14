import * as Rete from 'rete';

// import { MyNode } from '../nodes/MyNode';

export interface Input {
  direction: 'in';
  id: string;
  socket: Rete.Socket;
  title: string;
}

export interface Output {
  direction: 'out';
  id: string;
  socket: Rete.Socket;
  title: string;
}

export class ReteComponent extends Rete.Component {
  inputs: Input[];
  outputs: Output[];
  onWork: Function;
  component: Function;
  path: string[];
  description: string;

  constructor(
    title: string,
    inputs: Input[],
    outputs: Output[],
    onWork: Function,
    component: Function
  ) {
    super(title);

    this.inputs = inputs;
    this.outputs = outputs;
    this.onWork = onWork;

    // this.data.component = MyNode;
    this.component = component;
    this.path = ['Measure'];
    this.description =
      'Takes a set of features, calculates the bbox of all input features, and returns a bounding box.';
  }

  builder(node: any) {
    if (!this.editor) return;
    const ctrl = new Control(this.editor, 'control', node, this.component);

    this.outputs.forEach(({ id, socket, title }) => {
      //   const { id, socket, title } = element;
      const out = new Rete.Output(id, title, socket);

      node.addOutput(out);
    });

    this.inputs.forEach(({ id, socket, title }) => {
      const inp = new Rete.Input(id, title, socket);

      node.addInput(inp);
    });

    return node.addControl(ctrl);
  }

  worker(node: Rete.Component['data'], inputs: any, outputs: any) {
    this.onWork(node, inputs, outputs);
  }
}

class Control extends Rete.Control {
  emitter: any;
  component: any;
  props: { value: string; setValue: (v: any) => void };
  update: any;

  constructor(
    emitter: Rete.NodeEditor,
    key: string,
    node: Rete.Node,
    component: Function
  ) {
    super(key);
    this.emitter = emitter;
    this.key = key;
    this.component = component;

    const initial = node.data['controlData'];

    node.data['controlData'] = initial;

    this.props = {
      value: 'lol?',
      setValue: (v) => {
        this.setValue(v);
        this.emitter.trigger('process');
      },
    };
  }

  setValue(val: string) {
    this.props.value = val;
    this.putData('controlData', val);
    this.update();
  }
}
