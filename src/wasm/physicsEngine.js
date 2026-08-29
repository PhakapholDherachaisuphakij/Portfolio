// src/wasm/physicsEngine.js
/**
 * High-performance WebAssembly accelerated vector & easing math for 2026 UI animations.
 * Compiles a tiny in-memory WASM module directly in JavaScript with zero external file load overhead!
 */

const wasmCode = new Uint8Array([
  0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00, // WASM binary magic & version
  0x01, 0x07, 0x01, 0x60, 0x03, 0x7d, 0x7d, 0x7d, 0x01, 0x7d, // Type: (f32, f32, f32) -> f32
  0x03, 0x02, 0x01, 0x00, // Function section
  0x07, 0x08, 0x01, 0x04, 0x6c, 0x65, 0x72, 0x70, 0x00, 0x00, // Export "lerp"
  0x0a, 0x11, 0x01, 0x0f, 0x00, // Code section
  0x20, 0x00, // local.get 0 (a)
  0x20, 0x01, // local.get 1 (b)
  0x20, 0x00, // local.get 0 (a)
  0x93,       // f32.sub (b - a)
  0x20, 0x02, // local.get 2 (t)
  0x94,       // f32.mul ((b - a) * t)
  0x92,       // f32.add (a + (b - a) * t)
  0x0b        // end
]);

let wasmInstance = null;

try {
  const wasmModule = new WebAssembly.Module(wasmCode);
  wasmInstance = new WebAssembly.Instance(wasmModule, {});
} catch (e) {
  console.warn("WASM compilation fallback to JS:", e);
}

/**
 * Super-fast WASM lerp function for 120fps smooth particle & cursor tracking
 */
export function fastLerp(start, end, factor) {
  if (wasmInstance && wasmInstance.exports.lerp) {
    return wasmInstance.exports.lerp(start, end, factor);
  }
  return start + (end - start) * factor;
}

/**
 * Spring physics calculation
 */
export function calculateSpring(current, target, velocity, stiffness = 0.1, damping = 0.8) {
  const force = (target - current) * stiffness;
  const newVelocity = (velocity + force) * damping;
  const newPosition = current + newVelocity;
  return { position: newPosition, velocity: newVelocity };
}
