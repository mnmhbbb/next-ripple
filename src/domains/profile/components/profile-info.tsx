"use client";

import Image from "next/image";

import EditProfileButton from "@/domains/profile/components/profile-edit-button";
import useProfileData from "@/domains/profile/hooks/queries/use-profile-data";

export default function ProfileInfo({ userId, isMine }: { userId: string; isMine: boolean }) {
  const { data: profileData, isLoading, isError } = useProfileData(userId, isMine);

  //   if (fetchProfileError) return <Fallback />;
  //   if (isFetchingProfilePending) return <Loader />;

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="relative h-30 w-30">
        <Image
          src={profileData?.avatar_url || "/default-avatar.jpg"}
          alt={`${profileData?.nickname}의 프로필 이미지`}
          fill
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="text-xl font-bold">{profileData.nickname}</div>
        <div className="text-muted-foreground">{profileData.bio}</div>
      </div>
      {isMine && <EditProfileButton />}
    </div>
  );
}
