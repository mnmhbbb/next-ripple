import { Database } from "@/shared/utils/supabase/database.types";

/**
 * 프로필 엔티티 타입
 */
export type ProfileEntity = Database["public"]["Tables"]["profile"]["Row"];
