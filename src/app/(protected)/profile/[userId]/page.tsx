import ProfileInfo from "@/domains/profile/components/info";
import SignOutButton from "@/domains/profile/components/sign-out-button";
import { getServerUserId } from "@/shared/utils/supabase/auth";

/**
 * 프로필 페이지(본인 프로필 또는 다른 유저 프로필)
 * @param params - 프로필 페이지에 전달된 userId
 * @returns 프로필 페이지 컴포넌트
 */
export default async function ProfilePage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;

  const currentUserId = await getServerUserId();

  // 본인 프로필인지 판단
  const isMine = currentUserId === userId;

  return (
    <>
      <ProfileInfo userId={userId} isMine={isMine} />
      {isMine && (
        <div className="mt-2 flex justify-center">
          <SignOutButton />
        </div>
      )}
    </>
  );
}
