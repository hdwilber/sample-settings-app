export function createAction(name) {
  return {
    INIT: `${name}`,
    SUCCESS: `${name}_SUCCESS`,
    FAILED: `${name}_FAILED`,
  }
}

