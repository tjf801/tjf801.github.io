/* tslint:disable */
/* eslint-disable */
/**
* @returns {number}
*/
export function getFPS(): number;
/**
*/
export class PhysicsClient {
  free(): void;
/**
*/
  constructor();
/**
* @param {number} elapsed_time_milliseconds
*/
  update(elapsed_time_milliseconds: number): void;
/**
* @param {number} canvas_width_pixels
* @param {number} canvas_height_pixels
*/
  render(canvas_width_pixels: number, canvas_height_pixels: number): void;
/**
* @param {number} x
* @param {number} y
* @param {number} canvas_width_pixels
* @param {number} canvas_height_pixels
*/
  on_mouse_down(x: number, y: number, canvas_width_pixels: number, canvas_height_pixels: number): void;
/**
* @param {number} x
* @param {number} y
* @param {number} canvas_width_pixels
* @param {number} canvas_height_pixels
*/
  on_mouse_move(x: number, y: number, canvas_width_pixels: number, canvas_height_pixels: number): void;
/**
*/
  on_mouse_up(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly getFPS: () => number;
  readonly __wbg_physicsclient_free: (a: number) => void;
  readonly physicsclient_new: () => number;
  readonly physicsclient_update: (a: number, b: number, c: number) => void;
  readonly physicsclient_render: (a: number, b: number, c: number, d: number) => void;
  readonly physicsclient_on_mouse_down: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly physicsclient_on_mouse_move: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly physicsclient_on_mouse_up: (a: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
