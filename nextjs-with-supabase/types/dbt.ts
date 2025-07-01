// types/dbt.ts

// Ensure 'TEXTAREA' is present
export type CustomFieldType = 'TEXT' | 'NUMBER' | 'BOOLEAN' | 'DATE' | 'SELECT' | 'Text' | 'TEXTAREA';

export interface DBTEmotionClient {
  id: string; name: string; color: string; isCustom: boolean; userId?: string | null;
}
export interface DBTSkillClient {
  id: string; name: string; category: string; description?: string | null; practice?: string | null;
  examples?: string | null; benefits?: string | null; icon?: string | null; isCustom: boolean; userId?: string | null;
}
export interface DBTUrgeClient {
  id: string; name: string; isCustom: boolean; userId?: string | null;
}
export interface LoggedEmotion {
  emotionId: string; name: string; color: string; intensity: number;
}
export interface LoggedSkill {
  skillId: string; name: string; category: string;
}
export interface LoggedUrge {
  urgeId: string; name: string; rating: number;
}
export interface LoggedCustomField {
  fieldId: string; name: string; type: CustomFieldType; value: any; placeholder?: string | null;
  description?: string | null; options?: string[] | null; sortOrder?: number;
}
export interface DiaryEntryClient {
  id: string; userId: string; date: string; wellnessRating: number; notes?: string | null;
  crisis: boolean; emotions: LoggedEmotion[]; skills: LoggedSkill[]; urges: LoggedUrge[];
  customFields: LoggedCustomField[]; createdAt: string; updatedAt: string;
}
export interface UserPreferencesClient {
  userId: string; notificationsEnabled: boolean; reminderTime?: string | null;
}
export interface CustomFieldDefinitionClient {
    id: string; userId?: string | null; name: string; fieldType: CustomFieldType;
    options?: string[] | null; sortOrder: number; placeholder?: string | null; description?: string | null;
}
export interface DiaryEntryCardData {
  id: string; entryDate: string; wellnessRating: number | null; notes: string | null;
  crisis: boolean | null; emotions: Array<{ id: string; name: string; color: string; }>; skills: Array<{ id: string; name: string; }>;
}