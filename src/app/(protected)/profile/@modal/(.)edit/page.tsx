import { redirect } from "next/navigation";

import ProfileEditorModal from "@/domains/profile/components/editor-modal";
import { getServerUserId } from "@/shared/utils/supabase/auth";

/**
 * 프로필 수정 모달 페이지
 * 프로필 페이지에서 병렬로 렌더링 됨
 */
export default async function ProfileEditPage() {
  const userId = await getServerUserId();

  if (!userId) {
    redirect("/sign-in");
  }

  return <ProfileEditorModal userId={userId} />;
}
