import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

type State = {
  userId: string | null;
};

const initialState: State = {
  userId: null,
};

/**
 * 유저 상태 스토어(유저 ID를 관리)
 */
const useUserStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        setUserId: (userId: string | null) => set({ userId }, false, "setUserId"),
      },
    })),
    {
      name: "UserStore",
    },
  ),
);

/**
 * 유저 ID를 반환하는 훅
 * @returns 사용자 ID (null이면 로그아웃 상태)
 */
export const useUserId = () => {
  const userId = useUserStore((state) => state.userId);
  return userId;
};

/**
 * 유저 ID를 설정하는 액션을 반환하는 훅
 */
export const useSetUserId = () => {
  const setUserId = useUserStore((state) => state.actions.setUserId);
  return setUserId;
};
