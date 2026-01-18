"use client";

import Image from "next/image";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";

import { profileQueryOptions } from "@/domains/profile/queries";
import { useUserId } from "@/shared/store/user";

/**
 * 전역 헤더 컴포넌트
 * 로그인 상태와 프로필 정보를 표시
 */
export default function Header() {
  const userId = useUserId();

  // 로그인한 유저의 프로필 데이터 조회
  const { data: profile } = useQuery({
    ...profileQueryOptions(userId!, true),
    enabled: !!userId, // userId가 null이 아닐 때만 조회
  });

  return (
    <header className="h-15 border-b">
      <div className="m-auto flex h-full w-full max-w-175 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="ripple sns의 로고, 물결을 타는 ripple 아이콘"
            className="h-8 rounded-full"
            width={32}
            height={32}
          />
          <div className="font-bold">ripple sns</div>
        </Link>
        <div className="flex items-center gap-2">
          {userId ? (
            <Link href={`/profile/${userId}`}>
              <div className="relative h-8 w-8 rounded-full border">
                <Image
                  src={profile?.avatar_url || "/default-avatar.jpg"}
                  alt={`${profile?.nickname || "프로필"}의 프로필 이미지`}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            </Link>
          ) : (
            <Link href="/sign-in">로그인</Link>
          )}
        </div>
      </div>
    </header>
  );
}
