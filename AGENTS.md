<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Pairing Admin Frontend 작업 규칙

이 문서는 Pairing 관리자 프론트엔드에서 AI 도구가 작업할 때 따르는 진입 규칙입니다.

## 작업 전 확인 순서

파일을 수정하거나 구현 방향을 제안하기 전에 다음을 순서대로 확인합니다.

1. `AGENTS.md`
2. `README.md`
3. `package.json`
4. `docs/ai/admin-guide.md` 전체
5. 작업과 관련된 기존 코드와 폴더 구조
6. Next.js 작업이라면 위 자동 생성 규칙에 따라 `node_modules/next/dist/docs/`의 관련 문서

문서와 실제 코드가 다르면 현재 코드와 `package.json`을 우선합니다.

## 프로젝트 기준

- 프로젝트: Pairing Admin Frontend
- 목적: Pairing 서비스 운영을 위한 관리자 웹
- 기술: Next.js App Router, React, TypeScript, Tailwind CSS
- 패키지 관리자: npm
- 상세 개발 규칙: `docs/ai/admin-guide.md`

## 기본 원칙

- 수정 전에 관련 구현과 폴더 구조를 확인합니다.
- 기존 컴포넌트, 타입, 훅, API 호출 패턴을 우선 재사용합니다.
- 요청 범위 밖의 파일을 수정하지 않습니다.
- 기능 개발과 대규모 리팩터링을 한 작업에 섞지 않습니다.
- 새로운 라이브러리나 구조를 팀 합의 없이 도입하지 않습니다.
- 확인하지 않은 API 계약, 권한명, 요청·응답 구조를 추측하지 않습니다.
- 확인하지 못한 내용은 `확인 필요` 또는 `미검증`으로 명시합니다.
- 실행하지 않은 검증을 성공으로 보고하지 않습니다.

## Git 작업 제한

사용자의 명시적인 요청 없이 Issue 또는 PR 생성·종료, 브랜치 생성·삭제, commit, push, merge, release, tag 생성을 수행하지 않습니다.

## 검증

현재 제공되는 검증 명령은 `npm run lint`와 `npm run build`입니다. 테스트 도구와 `test` 스크립트는 아직 없습니다.

작업 완료 시 변경 내용과 파일, 실행한 검증과 결과, 실행하지 못한 검증, 실제 화면·API 미검증 사항, 남은 주의사항을 구분해 보고합니다.
