import { useContext, createContext, useReducer, useCallback } from 'react';
import { Map } from 'immutable';

import createEditor from '../rete';

interface StateContext {
  editor: any;
  engine: any;
  editorViewport: any;
  components: any;
  reteComponents: any;
  nodes: any;
  editorRef: any;
}

const INITIAL_STATE: StateContext = {
  editor: null,
  engine: null,
  editorViewport: {},
  components: [],
  nodes: Map(),
  reteComponents: [],
  editorRef: null,
};

const StateContext = createContext(INITIAL_STATE);
const DispatchContext = createContext<React.Dispatch<[string, any]>>(() => {});

function reducer(
  state: StateContext,
  [type, payload]: [string, any]
): StateContext {
  // console.log(type, payload);

  switch (type) {
    case 'SET_EDITOR': {
      return { ...state, editor: payload };
    }
    case 'SET_ENGINE': {
      return { ...state, engine: payload };
    }
    case 'SET_EDITOR_VIEWPORT': {
      return { ...state, editorViewport: payload };
    }
    case 'SET_COMPONENTS': {
      return { ...state, components: payload };
    }
    case 'ADD_RETE_COMPONENT': {
      return { ...state, reteComponents: [...state.reteComponents, payload] };
    }
    case 'SET_NODE': {
      return {
        ...state,
        nodes: state.nodes.set(payload.id, {
          ...state.nodes.get(payload.id),
          ...payload,
        }),
      };
    }
    case 'REMOVE_NODE': {
      return {
        ...state,
        nodes: state.nodes.delete(payload.id),
      };
    }

    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
}

function ReteProvider({ children }: any) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const editorRef = useCallback(
    (node) => {
      if (node !== null) {
        async function asyncCreateEditor() {
          const [editor, engine, components] = await createEditor(
            node,
            state.reteComponents,
            dispatch
          );
          dispatch(['SET_EDITOR', editor]);
          dispatch(['SET_ENGINE', engine]);
          dispatch(['SET_COMPONENTS', components]);
        }
        asyncCreateEditor();
      }
    },
    [state.reteComponents]
  );

  return (
    <StateContext.Provider value={{ ...state, editorRef }}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

function useReteState() {
  const context = useContext(StateContext);

  if (context === undefined) {
    throw new Error('useReteState must be used within a NodeEditorProvider');
  }

  return context;
}

function useReteDispatch() {
  const context = useContext(DispatchContext);

  if (context === undefined) {
    throw new Error('useReteDispatch must be used within a NodeEditorProvider');
  }

  return context;
}

function useRete(): [StateContext, React.Dispatch<[string, any]>] {
  return [useReteState(), useReteDispatch()];
}
export { ReteProvider, useRete };
