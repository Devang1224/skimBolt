
export interface GlossaryItem {
    term: string;
    meaning: string;
  }
  
 export interface Metadata {
    word_count: number;
    detected_language: string;
    content_quality: string;
  }

export interface SummaryResponse {
  summary: string;
  glossary: GlossaryItem[];
  metadata: Metadata;
}
  
export type Tone = 'neutral' | 'formal' | 'expert' | 'beginner' | 'casual';

export interface Settings {
  language: string;
  tone: Tone;
  length: string;
}
