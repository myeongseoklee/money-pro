# Project Name

간단한 소개 및 개요 1~2줄(메인 페이지 이미지 1장)

- 배포링크 :

<br>

## 목차 :clipboard:

- [프로젝트 소개](#프로젝트-소개)
- [사용 기술](#사용-기술)
- [API 문서](#api-문서)
- [주요 기능 소개](##주요-기능-소개)
- [문제 해결](#문제-해결)
- [프로젝트 진행 및 이슈 관리](#프로젝트-진행-및-이슈-관리)
- [팀원](#팀원)
- [참고자료](#참고자료)
- [프로젝트 실행](#프로젝트-실행)

## 프로젝트 소개

-

<br/>

## 사용 기술

<div align="left">
<br/>

언어 및 프레임워크

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

<br/>

데이터 베이스

![MySQL](https://img.shields.io/badge/MySQL-316192?style=for-the-badge&logo=mysql&logoColor=white)

<br/>

문서화

![Swagger](https://img.shields.io/badge/swagger-%23Clojure.svg?style=for-the-badge&logo=swagger&logoColor=white)

</div>

<br/>

## API 문서

- swagger 링크 :

<br/>

## 주요 기능 소개

- 기능별로 구현 과정(설계 및 의도)에 대해 설명한다. 복잡한 기능의 경우 이미지를 넣어 설명한다.

<details>
<summary>인증/사용자 정보(예시)</summary>

- **사용자 인증 방식으로 JWT 채택**

  1.  토큰을 클라이언트에서 관리하기 때문에 서버 자원의 오버헤드가 적음
  2.  세션 방식보다 API 서버 확장(scale out)에 용이한 점을 고려

- **DTO를 활용한 회원가입 데이터 유효성 검사**

  1.  데이터 유효성 검사에 대한 책임을 DTO로 분리(AOP)
  2.  class-validator 패키지를 활용한 데이터 검증
      - 이메일은 올바른 이메일 구조를 가져야 하고 gmail, naver, daum, kakao 등의 도메인만 허용하는 white list 설정
      - 패스워드는 8자 이상으로 알파벳 대문자와 특수문자, 숫자를 각각 최소 1개 이상 포함하는 조건으로 제한
      - 패스워드는 db 저장 시, 암호화하여 저장

- **AuthGuard를 활용한 엑세스 토큰 검증**

  1.  대부분의 기능에서 사용하는 유저 검증 로직을 AuthGuard로 분리(AOP)하여 재사용성 향상
  2.  컨트롤러의 함수 인자에서 인증된 유저 정보에 접근할 수 있도록 @UserId 데코레이터 제작

- **Unit Test 작성**

  1.  구현 의도에 맞게 동작하는지 검증하기 위한 Unit test 작성
  2.  행위 검증보다 상태 검증을 위해 Mocking 대신 Stubbing 사용
  3.  Mocking은 테스트 대상의 구현에 강하게 결합되어 구현부 변경에 취약한 반면, Stub은 변경에 유연하게 설계 가능

</details>

<br>

## 문제 해결

- [Custom Validator](https://zamoca42.github.io/blog/js-ts/nest-js/custom-validator.html)
- [맛집 목록 가져와서 지도에 표시하기](https://zamoca42.github.io/blog/js-ts/nest-js/query-range.html)

<br/>

## 프로젝트 진행 및 이슈 관리

- 깃헙 Project Page 또는 Notion 링크

<br/>

## 팀원

<div align="center">

<br/>

![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)<br>
<a href="https://github.com/msleeffice">이명석</a>

</div>

<br/>

## 참고자료

<details>
<summary>Unit Test</summary>

- [효율적인 테스트를 위한 stub 객체 활용법](https://medium.com/daangn/%ED%9A%A8%EC%9C%A8%EC%A0%81%EC%9D%B8-%ED%85%8C%EC%8A%A4%ED%8A%B8%EB%A5%BC-%EC%9C%84%ED%95%9C-stub-%EA%B0%9D%EC%B2%B4-%ED%99%9C%EC%9A%A9%EB%B2%95-5c52a447dfb7)
- [테스트하기 좋은 코드 - 외부에 의존하는 코드 개선](https://jojoldu.tistory.com/680)
- [Stub을 이용한 Service 계층 단위 테스트하기](https://jojoldu.tistory.com/637)

</details>

<details>

## 커밋 템플릿 적용 방법

```bash
# 로컬 환경에서 커밋 템플릿 적용
git config --local commit.template .gitmessage.txt

# 커밋 템플릿으로 커밋
git commit
```

<br>

## 프로젝트 실행

<details>
<summary> 프로젝트 실행 방법 </summary>

```bash
# 패키지 설치
npm install

```

.env example이 있으므로,.env example에 따라, .env를 작성하시면 됩니다.

</details>

## 데이터베이스 실행

<details>
<summary> 컨테이너 실행 방법 </summary>

docker-compose.yml 파일에 안내 되어있는 대로 세팅 후 아래 명령어를 실행합니다.

- 주의 : docker 컨테이너의 볼륨 생성을 위해 ./docker-database/mysql 디렉토리 내부에 data 디렉토리와 conf.d 디렉토리를 생성해둡니다.

```bash
# 컨테이너 실행
docker-compose up -d --build

```

.env example이 있으므로,.env example에 따라, .env를 작성하시면 됩니다.

</details>
