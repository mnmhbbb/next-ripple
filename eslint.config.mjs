import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // 1) Next 기본 권장 규칙
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 2) 전역 ignore
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "dist/**",
      "coverage/**",
      ".cursor/**",
      "pnpm-lock.yaml",
      "yarn.lock",
      "package-lock.json",
    ],
  },

  // 3) 추가 규칙
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
    },

    plugins: {
      import: importPlugin,
      "unused-imports": unusedImports,
    },
    settings: {
      // TypeScript 경로/alias 해석 (@/* 등)
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
    },
    rules: {
      // Import 정렬
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling", "index"], "type"],
          pathGroups: [
            // 외부 라이브러리 우선 정렬
            {
              pattern: "{react*,react*/**}",
              group: "external",
              position: "before",
            },
            {
              pattern: "{next*,next*/**}",
              group: "external",
              position: "before",
            },
            { pattern: "{zustand}", group: "external", position: "before" },
            {
              pattern: "{redux*,redux*/**,@redux*/,@redux*/**}",
              group: "external",
              position: "before",
            },

            // 내부(alias) — Next 관용 디렉터리 우선 정렬
            { pattern: "@/app/**", group: "internal", position: "before" },
            // TODO: FSD 패턴 도입 후 조정 필요
            {
              pattern: "@/components/**",
              group: "internal",
              position: "before",
            },
            { pattern: "@/hooks/**", group: "internal", position: "before" },
            { pattern: "@/lib/**", group: "internal", position: "before" },
            { pattern: "@/store/**", group: "internal", position: "before" },

            { pattern: "{./*,../*}", group: "internal", position: "before" },
          ],
          pathGroupsExcludedImportTypes: ["react", "next"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      // 불필요 코드 방지
      // (기본 unused-vars는 끄고, unused-imports 플러그인으로 일원화)
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],

      // any 남발 방지 (강도는 경고로 시작)
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];

export default eslintConfig;
