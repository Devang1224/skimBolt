
interface GlossaryItem {
    term: string;
    meaning: string;
  }
  
 interface Metadata {
    word_count: number;
    detected_language: string;
    content_quality: string;
  }

export interface SummaryResponse {
  summary: string;
  glossary: GlossaryItem[];
  metadata: Metadata;
}
  