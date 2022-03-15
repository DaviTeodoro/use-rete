import * as Rete from 'rete';
// @ts-ignore
import ReactRenderPlugin from 'rete-react-render-plugin';

import ConnectionPlugin from 'rete-connection-plugin';
// @ts-ignore

import ContextMenuPlugin from 'rete-context-menu-plugin';

// @ts-ignore
import AreaPlugin from 'rete-area-plugin';

export default async function createEditor(
  container: HTMLElement,
  components: Rete.Component[],
  dispatch: React.Dispatch<any>
) {
  const editor = new Rete.NodeEditor('demo@0.1.0', container);

  editor.use(ConnectionPlugin);
  editor.use(ContextMenuPlugin, {
    delay: 100,
    allocate(component: { path: any }) {
      return component.path;
    },
  });
  editor.use(ReactRenderPlugin);

  editor.use(AreaPlugin);

  const engine = new Rete.Engine('demo@0.1.0');

  Object.values(components).map((c) => {
    editor.register(c);
    engine.register(c);
  });

  editor.view.resize();
  editor.trigger('process');

  AreaPlugin.zoomAt(editor, editor.nodes);

  editor.on(['process', 'connectioncreated', 'connectionremoved'], async () => {
    await engine.abort();
    await engine.process(editor.toJSON(), null);
    await dispatch(['SET_EDITOR_VIEWPORT', editor.toJSON()]);
  });

  editor.on('nodecreated', async (node) => {
    await engine.abort();
    await engine.process(editor.toJSON(), null);
    await dispatch(['SET_NODE', node]);
  });

  editor.on('noderemoved', async (node) => {
    await engine.abort();
    await engine.process(editor.toJSON(), null);
    await dispatch(['REMOVE_NODE', node]);
  });

  return [editor, engine];
}
