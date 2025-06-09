# COCOH_TEST

- 프로젝트 요약 : 도서관리 REST API CRUD 구현
- 사용 모듈 : Express, Sequlize
- 설치 및 실행법
  - 'npx sequelize-cli db:migrate --name 20250609043040-create-book.js' 명령어를 통하여 migrations 실행
  - 'npm start dev' 명령어를 통하여 서버를 실행
  - POSTMAN 으로 엔드포인트에 맞는 API 요청 및 응답
- 주요 엔드포인트 정리
  - POST / : 새로운 도서를 생성하기 위한 라우트
  - GET / : 전체 도서에 대한 정보를 가져오기 위한 라우트
  - GET /:id : 특정 도서에 대한 정보를 가져오기 위한 라우트
  - PUT /:id : 특정 도서 전체 정보를 수정하기 위한 라우트
  - PATCH /:id : 특정 도서의 특정 정보를 수정하기 위한 라우트
  - DELETE /:id : 특정 도서 데이터를 삭제하기 위한 라우트
