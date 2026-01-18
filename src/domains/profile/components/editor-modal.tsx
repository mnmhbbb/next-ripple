"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { useQuery } from "@tanstack/react-query";

import { profileQueryOptions } from "@/domains/profile/queries";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

type Image = {
  file: File;
  previewUrl: string;
};

export default function ProfileEditorModal({ userId }: { userId: string }) {
  const isMine = true;

  const { data: profileData } = useQuery(profileQueryOptions(userId, isMine));

  const [avatarImage, setAvatarImage] = useState<Image | null>(null);
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 페이지 떠날 때 이미지 URL 제거(메모리 누수 방지)
  useEffect(() => {
    return () => {
      if (avatarImage) {
        URL.revokeObjectURL(avatarImage.previewUrl);
      }
    };
  }, []);

  const handleAvatarImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    // 기존 이미지 URL 제거(메모리 누수 방지)
    if (avatarImage) {
      URL.revokeObjectURL(avatarImage.previewUrl);
    }

    setAvatarImage({
      file,
      previewUrl: URL.createObjectURL(file),
    });
  };

  const handleUpdateClick = () => {
    if (nickname.trim() === "") return;
    // updateProfile({
    //   userId: session!.user.id, // 타입 단언
    //   bio,
    //   nickname,
    //   avatarImageFile: avatarImage?.file,
    // });
  };

  return (
    <AlertDialog open={true}>
      <AlertDialogContent className="flex flex-col gap-5">
        <AlertDialogHeader>
          <AlertDialogTitle>프로필 수정하기</AlertDialogTitle>
          {/* {fetchProfileError && <Fallback />} */}
          {/* {isFetchProfilePending && <Loader />} */}
          <>
            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground">프로필 이미지</div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleAvatarImage}
              />
              <div className="relative h-50 w-50 cursor-pointer rounded-full object-cover">
                <Image
                  src={avatarImage?.previewUrl || profileData.avatar_url || "/default-avatar.jpg"}
                  alt={`${profileData.nickname}의 프로필 이미지`}
                  fill
                  onClick={() => {
                    if (fileInputRef.current) fileInputRef.current?.click();
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground">닉네임</div>
              <Input value={nickname} onChange={(e) => setNickname(e.target.value)} />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground">소개</div>
              <Input value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>

            <Button className="cursor-pointer" onClick={handleUpdateClick}>
              수정하기
            </Button>
          </>
        </AlertDialogHeader>
        <AlertDialogDescription></AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
}
