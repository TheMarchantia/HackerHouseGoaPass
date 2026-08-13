import { DomainCategory } from '../types/card';

export const TITLES_BY_DOMAIN: Record<DomainCategory, string[]> = {
  Cybersecurity: [
    'THE PROTOCOL BREAKER',
    'THE PACKET WHISPERER',
    'THE BUG HUNTER',
    'THE THREAT TINKERER',
    'THE ZERO-DAY WIZARD',
    'THE SHELLCODE WEAVER',
    'THE EXPLOIT ALCHEMIST',
    'THE PAYLOAD SHAPER',
  ],
  AI: [
    'THE MODEL WHISPERER',
    'THE INFERENCE ALCHEMIST',
    'THE NEURAL ARCHITECT',
    'THE AGENT TINKERER',
    'THE WEIGHT TUNER',
    'THE PROMPT OPERATOR',
    'THE SYNTAX SYNTHESIZER',
    'THE TENSOR WEAVER',
  ],
  Blockchain: [
    'THE CHAIN ARCHITECT',
    'THE BLOCK BUILDER',
    'THE CONSENSUS TINKERER',
    'THE EVM WHISPERER',
    'THE MEMPOOL RUNNER',
    'THE ZERO-KNOWLEDGE ALCHEMIST',
    'THE BRIDGE CRAFTSMAN',
    'THE STATE WEAVER',
  ],
  Hardware: [
    'THE CIRCUIT BENDER',
    'THE SILICON WIZARD',
    'THE SIGNAL HARVESTER',
    'THE FIRMWARE FORGER',
    'THE SENSOR TINKERER',
    'THE PIN RUNNER',
  ],
  Fullstack: [
    'THE STACK SHAPER',
    'THE CODE CARTOGRAPHER',
    'THE LATENCY KILLER',
    'THE DOM ALCHEMIST',
    'THE RENDERING WIZARD',
    'THE PARALLEL WEAVER',
  ],
  General: [
    'THE CRYPTOGRAPHY TINKERER',
    'THE TERMINAL POET',
    'THE KERNEL HACKER',
    'THE BYTE BENDER',
    'THE ALGORITHM WEAVER',
    'THE PROTOCOL CARTOGRAPHER',
  ],
};

export const ALL_TITLES = Object.values(TITLES_BY_DOMAIN).flat();

export function getRandomTitle(roleInput?: string, currentTitle?: string): string {
  let pool = ALL_TITLES;

  if (roleInput) {
    const lowerRole = roleInput.toLowerCase();
    if (lowerRole.includes('cyber') || lowerRole.includes('sec') || lowerRole.includes('hack') || lowerRole.includes('pentest')) {
      pool = [...TITLES_BY_DOMAIN.Cybersecurity, ...TITLES_BY_DOMAIN.General];
    } else if (lowerRole.includes('ai') || lowerRole.includes('llm') || lowerRole.includes('ml') || lowerRole.includes('agent') || lowerRole.includes('neural')) {
      pool = [...TITLES_BY_DOMAIN.AI, ...TITLES_BY_DOMAIN.General];
    } else if (lowerRole.includes('chain') || lowerRole.includes('crypto') || lowerRole.includes('sol') || lowerRole.includes('web3') || lowerRole.includes('eth')) {
      pool = [...TITLES_BY_DOMAIN.Blockchain, ...TITLES_BY_DOMAIN.General];
    } else if (lowerRole.includes('hard') || lowerRole.includes('iot') || lowerRole.includes('chip') || lowerRole.includes('embed')) {
      pool = [...TITLES_BY_DOMAIN.Hardware, ...TITLES_BY_DOMAIN.General];
    }
  }

  // Filter out current title to ensure rotation on click
  const available = pool.filter((t) => t !== currentTitle);
  if (available.length === 0) return ALL_TITLES[0];
  
  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex];
}
