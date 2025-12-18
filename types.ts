export interface FrameworkComponent {
  label: string;
  description: string;
}

export interface Framework {
  id: string;
  name: string; // The Acronym (e.g., R-T-F)
  fullName: string; // Spelled out (Role - Task - Format)
  description: string;
  components: FrameworkComponent[];
  color: string; // Tailwind color name base (e.g., "cyan", "purple")
  gradient: string; // CSS gradient string
}

export interface OptimizedPromptResponse {
  markdownText: string;
  frameworkUsed: string;
}