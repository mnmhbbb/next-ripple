import { redirect } from "next/navigation";

import ProfileEditorModal from "@/domains/profile/components/editor-modal";
import ProfileInfo from "@/domains/profile/components/info";
import { getServerUserId } from "@/shared/utils/supabase/auth";

/**
 * 프로필 수정 페이지
 * (새로고침, 최초 렌더링 시에 실행됨)
 */
export default async function ProfileEditPage() {
  const userId = await getServerUserId();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <>
      <ProfileInfo userId={userId} isMine={true} />
      <ProfileEditorModal userId={userId} />
    </>
  );
}
