"use client";

import Image from "next/image";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";

import { profileQueryOptions } from "@/domains/profile/queries";
import { Button } from "@/shared/components/ui/button";

export default function ProfileInfo({ userId, isMine }: { userId: string; isMine: boolean }) {
  const { data: profileData, isLoading, isError } = useQuery(profileQueryOptions(userId, isMine));

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError || !profileData) {
    return <div>프로필을 불러올 수 없습니다.</div>;
  }

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
        <div className="text-xl font-bold">{profileData?.nickname || ""}</div>
        <div className="text-muted-foreground">{profileData?.bio || ""}</div>
      </div>
      {isMine && (
        <div className="flex flex-col gap-2">
          <Link href="/profile/edit">
            <Button variant={"secondary"} className="cursor-pointer">
              프로필 수정
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
