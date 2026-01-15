export type TONE = 'neutral' | 'formal' | 'expert' | 'beginner' | 'casual';
export type SUMMARY_LENGTH = 'short' | 'medium' | 'detailed';
export interface UserSettings {
 tone:TONE,
 length:SUMMARY_LENGTH,
 language:string
}