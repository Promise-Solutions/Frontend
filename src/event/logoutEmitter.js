import mitt from "mitt";

let emitter;

if (!globalThis.__logout_emitter__) {
  globalThis.__logout_emitter__ = mitt();
}

emitter = globalThis.__logout_emitter__;

export const logoutEmitter = emitter;
