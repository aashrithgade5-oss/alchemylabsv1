export type PerformanceTier = 'high' | 'medium' | 'low';

interface DeviceProfile {
  cores: number;
  memory: number; // GB
  gpu: string;
  pixelRatio: number;
  connectionType: string;
}

const CACHE_KEY = 'alchemy-device-profile';

function detectGPU(): string {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl || !(gl instanceof WebGLRenderingContext)) return 'unknown';
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    if (!ext) return 'unknown';
    const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) as string;
    // Clean up
    const loseCtx = gl.getExtension('WEBGL_lose_context');
    loseCtx?.loseContext();
    return renderer || 'unknown';
  } catch {
    return 'unknown';
  }
}

function isDedicatedGPU(gpu: string): boolean {
  const dominated = gpu.toLowerCase();
  return (
    dominated.includes('nvidia') ||
    dominated.includes('geforce') ||
    dominated.includes('rtx') ||
    dominated.includes('gtx') ||
    dominated.includes('radeon') ||
    dominated.includes('rx ') ||
    dominated.includes('arc a')
  );
}

function getConnectionType(): string {
  const nav = navigator as any;
  return nav.connection?.effectiveType || '4g';
}

export function profileDevice(): DeviceProfile {
  // Check cache
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch { /* fall through */ }
  }

  const profile: DeviceProfile = {
    cores: navigator.hardwareConcurrency || 4,
    memory: (navigator as any).deviceMemory || 4,
    gpu: detectGPU(),
    pixelRatio: window.devicePixelRatio || 1,
    connectionType: getConnectionType(),
  };

  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(profile));
  } catch { /* quota exceeded */ }

  return profile;
}

export function classifyTier(profile: DeviceProfile): PerformanceTier {
  const { cores, memory, gpu, connectionType } = profile;
  const dedicated = isDedicatedGPU(gpu);
  const slowConnection = connectionType === '2g' || connectionType === 'slow-2g';
  const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced || slowConnection) return 'low';

  // Low tier
  if (cores <= 3 || memory < 4) return 'low';

  // High tier
  if (cores >= 8 && memory >= 8 && dedicated && !slowConnection) return 'high';

  // Medium (everything else)
  return 'medium';
}
