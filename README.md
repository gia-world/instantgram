# Instantgram

Instantgram은 Instagram을 모티브로 한 어플리케이션입니다.

1. **Headless CMS 활용**
    - Sanity를 이용한 Headless CMS로 쉬운 컨텐츠 관리를 구현했습니다.
2. **API 구현**
    - Next.js의 route handler를 활용하여 간결하고 효율적인 API를 구현했습니다.
3. **네트워크 상태 관리**
    - SWR을 활용하여 효율적으로 네트워크 상태를 관리했습니다.
4. **인증 및 구글 로그인**
    - Next-auth를 활용하여 간편한 구글 로그인 기능을 구현했습니다.

## 작업기간

2023.12.13 ~ 2024.1.16

## 핵심 기능

- **인증 및 사용자 관리**
    - 구글 로그인
    - 내 포스트 및 좋아요, 저장한 포스트 확인
    - 팔로우, 언팔로우 기능
    - 유저 검색 기능
- **게시물 관리**
    - 포스트 작성 (파일 업로드 드래그앤드랍 구현)
    - 좋아요, 저장, 댓글 기능

## 사용 스택 및 라이브러리

- Next.js 13
- Typescript
- Tailwind
- Sanity(CMS)
- SWR
- Next-auth
- Vercel(deployment)
