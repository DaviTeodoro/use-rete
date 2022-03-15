import React from 'react';
// @ts-ignore
import { Node, Socket, Control } from 'rete-react-render-plugin';
import './index.css';

export class CustomNode extends Node {
  render() {
    // @ts-ignore
    const { node, bindSocket, bindControl } = this.props;
    // @ts-ignore
    const { outputs, controls, inputs, selected } = this.state;
    return (
      <div className={`node ${selected}`}>
        <div className="title">{node.name}</div>

        {inputs.map((input: any) => (
          <div className="input" key={input.key}>
            <Socket
              type="input"
              socket={input.socket}
              io={input}
              innerRef={bindSocket}
            />
            {!input.showControl() && (
              <div className="input-title">{input.name}</div>
            )}
            {input.showControl() && (
              <Control
                // className="input-control"
                control={input.control}
                innerRef={bindControl}
              />
            )}
          </div>
        ))}
        {/* Controls */}
        {controls.map((control: any) => (
          <Control
            className="control"
            key={control.key}
            control={control}
            innerRef={bindControl}
          />
        ))}
        {/* Outputs */}
        {outputs.map((output: any) => (
          <div className="output" key={output.key}>
            <div className="output-title">{output.name}</div>
            <Socket
              type="output"
              socket={output.socket}
              io={output}
              innerRef={bindSocket}
            />
          </div>
        ))}
      </div>
    );
  }
}
