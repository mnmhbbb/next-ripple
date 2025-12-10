# Copilot / AI 에이전트 지침 — next-ripple

목적: 이 저장소에서 AI 코딩 에이전트가 바로 생산적으로 작업할 수 있도록, 핵심적이고 실무적인 정보를 간결하게 제공합니다.

**전체 개요**

- 본 프로젝트는 `create-next-app`로 생성된 Next.js(앱 라우터) 템플릿입니다. 애플리케이션 소스는 `src/app` 아래에 위치하며 파일 기반 라우팅, `layout.tsx`를 통한 레이아웃, 서버/클라이언트 컴포넌트 관행을 따릅니다.
- 사용 버전: `next` 16.x, `react` 19.x (`package.json` 참조). `next.config.ts`에서 `reactCompiler: true` 설정이 활성화되어 있습니다.

**핵심 파일(먼저 볼 것)**

- `package.json` — 실행/빌드/린트/포맷 스크립트와 주요 의존성.
- `next.config.ts` — 런타임 플래그 (예: `reactCompiler`, `logging.fetches.fullUrl`).
- `tsconfig.json` — `@/*` -> `src/*` 경로 별칭 사용.
- `src/app/layout.tsx` — 전역 레이아웃, 폰트 로드(`next/font/google`) 참고.
- `src/app/page.tsx` — 시작 페이지 예제.
- `src/app/globals.css` — 전역 스타일 (Tailwind 사용 가능성).
- `README.md` — 빠른 시작 및 배포 지침.

**아키텍처 / 코드 패턴**

- App Router (`src/app`) 사용 — 새로운 라우트는 `src/app/<name>/page.tsx`로 추가.
- 폰트는 `next/font/google` 패턴을 따릅니다 (`layout.tsx` 참고).
- TypeScript `@/` 경로 별칭을 적극 활용하세요 (`import X from '@/components/X'`).
- `next.config.ts`의 `logging.fetches.fullUrl`는 fetch 로깅 디버깅에 영향이 있으니 네트워크 관련 변경 시 참고하세요.

**개발 워크플로우(자주 쓰는 명령)**

- 개발 서버: `pnpm dev`
- 빌드: `pnpm build`
- 프로덕션 시작: `pnpm start`
- 린트: `pnpm lint .` (프로젝트 루트에서 실행)
- 포맷: `pnpm format` (Prettier + Tailwind 플러그인), 체크 전용: `pnpm format:check`

**프로젝트 규약(특유 관행)**

- UI 및 페이지는 `src/app` 하위에 위치시킵니다(앱 라우터 관행).
- 파일/모듈 임포트 시 `@/` 별칭을 사용해 상대경로 난독화를 피합니다.
- 전역 스타일은 `src/app/globals.css`에 유지하고, 컴포넌트별 스타일은 컴포넌트와 함께 둡니다.
- 폰트 추가나 최적화는 `next/font` 패턴을 따릅니다.

**파일 추가/수정 시 참고 예시**

- 라우트 추가: `src/app/<route>/page.tsx` (+선택: `layout.tsx`).
- 재사용 컴포넌트: `src/components/...` (현재 폴더 없을 수 있음) — `@/components/MyComponent`로 임포트.
- TS 경로나 별칭 변경: `tsconfig.json` 수정 후 임포트 경로 정리.

**배포/통합 관련**

- Vercel 배포와 호환됩니다(커스텀 서버 없음). `README.md` 참조.
- 현재 자동화된 테스트 구성은 포함되어 있지 않습니다. 테스트 프레임워크가 필요한 변경은 별도로 추가하세요.

**가정하지 말아야 할 것들**

- 데이터베이스, 외부 API 서버, E2E 테스트 인프라 등은 포함되어 있지 않습니다. 추가가 필요하면 파일을 직접 추가하세요.

**AI 에이전트에게 바람직한 편의 지침**

- 변경은 최소한으로, 목적이 분명한 커밋 단위로 만드세요. 변경 파일과 경로를 PR 설명에 명확히 기재합니다.
- 코드 변경 후 로컬에서 `pnpm lint .` 및 `pnpm format` 실행을 권장합니다.
- 새 파일/컴포넌트를 만들 때는 `@/` 별칭을 사용하세요.

---

---

description: Git 커밋 규칙
globs:
alwaysApply: false

---

# 커밋 메시지 작성 규칙

## 커밋 메시지 형식

```bash
commit type: 타이틀

- 내용
```

## 커밋 타입 가이드

- `Feat`: 변경 사항과 함께 새로운 기능이 도입되었습니다.
- `Fix`: 버그 수정이 발생했습니다.
- `Chore`: 수정 또는 기능과 관련이 없고 src 또는 테스트 파일을 수정하지 않는 변경(예: 종속성 업데이트)
- `Refactor`: 버그를 수정하거나 기능을 추가하지 않는 리팩토링된 코드
- `Docs`: README 또는 기타 마크다운 파일과 같은 문서 업데이트
- `Style`: 공백, 세미콜론 누락 등과 같은 코드 서식과 관련되어 코드의 의미에 영향을 미치지 않는 변경 사항입니다.
- `Test`: 새 테스트 또는 이전 테스트 수정 포함
- `Perf`: 성능 향상
- `Ci`: 지속적 통합 관련
- `Build`: 빌드 시스템 또는 외부 종속성에 영향을 미치는 변경 사항
- `Revert`: 이전 커밋을 되돌립니다.

## 변경사항 분석 방법

1. 현재 브랜치명 확인: `.git/HEAD` 파일에서 `refs/heads/` 이후 부분 추출
2. 변경된 파일들 분석:

- Page/Route: 페이지 추가·수정, 라우팅/동적 세그먼트/메타데이터 변경
- Component(UI): 재사용 컴포넌트·디자인 시스템 변경(Props, 상태, 이벤트 계약 포함)
- State/Query: Zustand/Redux 상태 구조 변경, TanStack Query(쿼리키, 캐시/스테일타임, enabled) 수정
- Service/API: API 클라이언트/요청 래퍼, 에러 처리/리트라이/캐싱 전략 변경
- Types: TS 타입/Interface/DTO(프런트 기준 뷰모델) 추가·수정
- Styles: Tailwind 유틸/전역 스타일/Theme, 반응형·다크모드·CSS 변수 변경
- Layout/Navigation: 레이아웃, 헤더/사이드바/탭, 네비게이션 흐름 변경
- SEO/Meta: Head/metadata, OG/Twitter 카드, sitemap/robots, 구조화 데이터
- A11y: 시맨틱 태그, ARIA, 포커스 트랩, 키보드 내비게이션 개선
- Perf: 코드 스플리팅, 이미지 최적화, 메모이제이션, 렌더/페인트 최적화
- i18n: 번역 키 추가/삭제, 로캘 로딩, 플러럴/포맷 변경
- Analytics/Logging: 이벤트 스키마, 추적 ID, 페이지뷰/전환 포인트 변경
- Test: 단위/통합/스토리북/E2E(Cypress/Playwright) 추가·수정
- Assets: public 이미지/아이콘/폰트, 스프라이트/스프라이트맵 변경
- Build/Config: `next.config.*`, `tsconfig`, `tailwind.config`, ESLint/Prettier, 환경변수 노출 정책

## 타이틀 작성 규칙

- 브랜치명의 주요 기능을 간결하게 표현
- 예: `search-filter-ui` → `검색 필터 UI 개선`

## 내용 작성 규칙

- 주요 변경사항을 불릿 포인트로 나열
- Page/Component → State/Query → Service/API → Types → Styles 순서로 정리
- 구체적인 기능 설명 포함
- 반응형, 접근성, 성능, 문서화 등 부가 작업도 포함

## 예시

```bash
feat: 사용자 프로필 설정 기능 구현

- /profile 페이지 UI 및 라우팅 추가
- <ProfileForm /> 생성 및 입력 검증 추가
- useProfileStore를 통해 사용자 입력 상태 관리
- 프로필 수정 요청 API 호출 로직 작성
- Tailwind 기반 레이아웃 적용 및 반응형 대응
```

```bash
fix: 다국어 텍스트 레이아웃 깨짐 현상 수정

- 긴 텍스트에 줄바꿈 처리 및 단어 중단 방지 설정 적용
- <TranslationText />에 word-break: keep-all 적용
- min-width 제거 및 flex-shrink 설정 수정
```

## 주의사항

- 커밋 타입은 변경사항의 성격에 맞게 선택
- 타이틀은 기능의 핵심을 간결하게 표현
- 내용은 구체적이고 이해하기 쉽게 작성
- 반드시 한국어로 작성할 것.
