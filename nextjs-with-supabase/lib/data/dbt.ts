// lib/data/dbt.ts
import { createClient } from '@/utils/supabase/server';
import { Database } from '@/types/supabase'; 
import type {
  DBTSkillClient,
  DiaryEntryCardData,
  DiaryEntryClient,
  DBTEmotionClient, // Import added types
  DBTUrgeClient, 
  CustomFieldDefinitionClient
} from "@/types/dbt";

// --- RawDBTSkill Interface ---
interface RawDBTSkill {
  id: string;
  user_id: string | null;
  name: string;
  category: string;
  description: string | null;
  practice: string | null;
  examples: string | null;
  benefits: string | null;
  icon: string | null;
  is_custom: boolean;
}

// --- transformRawSkillToClient Function ---
function transformRawSkillToClient(skill: RawDBTSkill): DBTSkillClient {
  return {
    id: skill.id,
    name: skill.name,
    category: skill.category,
    description: skill.description,
    practice: skill.practice,
    examples: skill.examples,
    benefits: skill.benefits,
    icon: skill.icon,
    isCustom: skill.is_custom,
    userId: skill.user_id,
  };
}

// --- getDBTSkills Function ---
export async function getDBTSkills(userId?: string): Promise<DBTSkillClient[]> {
  const supabase = createClient(); 

  const selectFields = `
    id, user_id, name, category, description,
    practice, examples, benefits, icon, is_custom
  `;

  const { data: systemSkillsData, error: systemSkillsError } = await supabase
    .from("dbt_skills")
    .select(selectFields)
    .eq("is_custom", false)
    .is("user_id", null)
    .order("category", { ascending: true })
    .order("name", { ascending: true });

  if (systemSkillsError) {
    console.error("Error fetching system DBT skills:", JSON.stringify(systemSkillsError, null, 2));
  }

  let userSkillsData: RawDBTSkill[] = [];
  if (userId) {
    const { data: customSkills, error: customSkillsError } = await supabase
      .from("dbt_skills")
      .select(selectFields)
      .eq("user_id", userId)
      .eq("is_custom", true)
      .order("category", { ascending: true })
      .order("name", { ascending: true });

    if (customSkillsError) {
      console.error("Error fetching user-custom DBT skills:", JSON.stringify(customSkillsError, null, 2));
    }
    userSkillsData = (customSkills as RawDBTSkill[] | null) || [];
  }

  const allSkillsRaw: RawDBTSkill[] = [
    ...((systemSkillsData as RawDBTSkill[] | null) || []),
    ...userSkillsData
  ];
  
  const uniqueSkillsMap = new Map<string, RawDBTSkill>();
  allSkillsRaw.forEach(skill => {
    if (!uniqueSkillsMap.has(skill.id)) {
        uniqueSkillsMap.set(skill.id, skill);
    }
  });
  
  const sortedUniqueSkills = Array.from(uniqueSkillsMap.values())
    .sort((a, b) => {
      if (a.category < b.category) return -1;
      if (a.category > b.category) return 1;
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

  return sortedUniqueSkills.map(transformRawSkillToClient);
}

// --- RawDiaryEntryFromRPC Type (for List View) ---
type RawDiaryEntryFromRPC = {
  id: string;
  date: string; 
  wellness_rating: number | null;
  notes: string | null;
  crisis: boolean | null; 
  emotions: { id: string; name: string; color: string }[];
  skills: { id: string; name: string }[];
};

// --- getDiaryEntriesList Function ---
export async function getDiaryEntriesList(
  userId: string
): Promise<DiaryEntryCardData[] | null> {
  if (!userId) {
    console.error('User ID is required to fetch diary entries.');
    return null;
  }
  const supabase = createClient(); 

  const { data, error } = await supabase.rpc(
    'get_diary_entries_list_for_user', 
    { p_user_id: userId } 
  );

  if (error) {
    console.error('Error fetching diary entries list from RPC:', error);
    return null;
  }

  if (!data) {
    return []; 
  }

  const rawEntries = data as any[]; 

  const transformedEntries: DiaryEntryCardData[] = rawEntries.map((entry: RawDiaryEntryFromRPC) => ({
    id: entry.id,
    entryDate: entry.date, 
    wellnessRating: entry.wellness_rating,
    notes: entry.notes,
    crisis: entry.crisis, 
    emotions: entry.emotions || [],
    skills: entry.skills || [],
  }));

  return transformedEntries;
}


// --- RawDiaryEntryDetails Type (for Detail View) ---
type RawDiaryEntryDetails = {
    id: string;
    user_id: string;
    date: string;
    wellness_rating: number | null;
    notes: string | null;
    crisis: boolean | null;
    created_at: string;
    updated_at: string;
    logged_emotions: any[] | null; 
    logged_skills: any[] | null;
    logged_urges: any[] | null;
    logged_custom_fields: any[] | null;
};

// --- getDiaryEntryById Function ---
export async function getDiaryEntryById(
  entryId: string,
  userId: string
): Promise<DiaryEntryClient | null> {
  if (!entryId || !userId) {
    console.error('Entry ID and User ID are required.');
    return null;
  }
  const supabase = createClient(); 

  const { data, error } = await supabase.rpc('get_diary_entry_details', {
    p_entry_id: entryId,
    p_user_id: userId,
  });

  if (error) {
    console.error(`Error fetching diary entry details for entry ${entryId}:`, error);
    return null;
  }

  if (!data || data.length === 0) {
    console.warn(`Diary entry not found for id: ${entryId} and user: ${userId}`);
    return null; 
  }

  const rawEntry = data[0] as RawDiaryEntryDetails; 

  const entry: DiaryEntryClient = {
    id: rawEntry.id,
    userId: rawEntry.user_id,
    date: rawEntry.date, 
    wellnessRating: rawEntry.wellness_rating ?? 0, 
    notes: rawEntry.notes,
    crisis: rawEntry.crisis ?? false, 
    emotions: (rawEntry.logged_emotions || []).map(e => ({
        emotionId: e.emotionId, 
        name: e.name,           
        color: e.color,         
        intensity: e.intensity ?? 0 
    })),
    skills: (rawEntry.logged_skills || []).map(s => ({
        skillId: s.skillId,     
        name: s.name,           
        category: s.category    
    })),
    urges: (rawEntry.logged_urges || []).map(u => ({
        urgeId: u.urgeId,       
        name: u.name,           
        rating: u.rating ?? 0   
    })),
    customFields: (rawEntry.logged_custom_fields || []).map(cf => ({
        fieldId: cf.fieldId,    
        name: cf.name,          
        type: cf.type,          
        value: cf.value         
    })),
    createdAt: rawEntry.created_at, 
    updatedAt: rawEntry.updated_at, 
  };

   if (rawEntry.wellness_rating === null) {
      console.warn(`Wellness rating is null for entry ${rawEntry.id}. Defaulted to 0.`);
   }
   if (rawEntry.crisis === null) {
       console.warn(`Crisis is null for entry ${rawEntry.id}. Defaulted to false.`);
   }

  return entry;
}

// --- Placeholders with EXPORT added ---

export async function getDBTEmotions(userId?: string): Promise<DBTEmotionClient[]> { // Added export
  console.log("TODO: Implement getDBTEmotions data fetching", { userId });
  return [
    { id: '3d1d421a-cb4a-42de-aaa7-f576b92b19bd', name: 'Fear', color: '#FF0000', isCustom: false },
    { id: 'c1e2bbf7-7e6e-4a8d-9b3d-7e7570f3f1a0', name: 'Sadness', color: '#0000FF', isCustom: false },
    { id: 'd2f8a1c3-9d5c-4f2a-8e9a-1b3186d7e0b1', name: 'Joy', color: '#FFC300', isCustom: false },
  ]; 
}

export async function getDBTUrges(userId?: string): Promise<DBTUrgeClient[]> { // Added export
  console.log("TODO: Implement getDBTUrges data fetching", { userId });
   return [
     { id: 'c1295fd1-0809-42d7-b706-c541e3ce002b', name: 'Nail Biting', isCustom: true, userId: userId } 
   ]; 
}

export async function getCustomFieldDefinitions(userId: string): Promise<CustomFieldDefinitionClient[]> { // Added export
  console.log("TODO: Implement getCustomFieldDefinitions data fetching", { userId });
   return [
     { id: 'e2459ab6-157b-4e1a-8842-a67bdbf7c107', userId: userId, name: 'Custom field row', type: 'Text', sortOrder: 1 }
   ]; 
}