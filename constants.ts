import { Framework } from './types';

export const FRAMEWORKS: Framework[] = [
  {
    id: 'rtf',
    name: 'R-T-F',
    fullName: 'Role • Task • Format',
    description: 'Best for generating specific deliverables like content, code, or emails.',
    components: [
      { label: 'Role', description: 'Act as a...' },
      { label: 'Task', description: 'Create a...' },
      { label: 'Format', description: 'Show as...' },
    ],
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'tag',
    name: 'T-A-G',
    fullName: 'Task • Action • Goal',
    description: 'Perfect for optimizing performance, feedback, or process improvement.',
    components: [
      { label: 'Task', description: 'Define the task' },
      { label: 'Action', description: 'State the action' },
      { label: 'Goal', description: 'Clarify the goal' },
    ],
    color: 'amber',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    id: 'bab',
    name: 'B-A-B',
    fullName: 'Before • After • Bridge',
    description: 'Ideal for marketing copy, storytelling, and problem-solution narratives.',
    components: [
      { label: 'Before', description: 'Explain problem' },
      { label: 'After', description: 'State outcome' },
      { label: 'Bridge', description: 'Ask for the bridge' },
    ],
    color: 'emerald',
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    id: 'care',
    name: 'C-A-R-E',
    fullName: 'Context • Action • Result • Example',
    description: 'Great for complex requests requiring nuance and specific examples.',
    components: [
      { label: 'Context', description: 'Give context' },
      { label: 'Action', description: 'Describe action' },
      { label: 'Result', description: 'Clarify result' },
      { label: 'Example', description: 'Give example' },
    ],
    color: 'purple',
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    id: 'rise',
    name: 'R-I-S-E',
    fullName: 'Role • Input • Steps • Expectation',
    description: 'The heavyweight champion for complex strategy and multi-step plans.',
    components: [
      { label: 'Role', description: 'Specify role' },
      { label: 'Input', description: 'Describe input' },
      { label: 'Steps', description: 'Ask for steps' },
      { label: 'Expectation', description: 'Describe expectation' },
    ],
    color: 'rose',
    gradient: 'from-rose-500 to-pink-600',
  },
];

export const MOCK_LOADING_STEPS = [
  "Analyzing raw intent...",
  "Deconstructing semantic meaning...",
  "Aligning with selected framework...",
  "Optimizing token density...",
  "Finalizing output..."
];