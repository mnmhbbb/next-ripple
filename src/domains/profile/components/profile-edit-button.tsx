"use client";

import { Button } from "@/shared/components/ui/button";

export default function EditProfileButton() {
  // TODO: 프로필 수정 모달 추가
  //   const open = useOpenProfileEditorModal();

  return (
    <Button variant={"secondary"} className="cursor-pointer">
      프로필 수정
    </Button>
  );
}
