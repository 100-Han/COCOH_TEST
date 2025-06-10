const router = require("express").Router();
const bookController = require("./book");

/**
 * @swagger
 * tags:
 *  name: Books
 *  description: 도서관리 API CRUD
 */
router.use("/", book);

/**
 * @swagger
 * paths:
 *  /books:
 *      get:
 *          summary: "모든 책 정보 불러오기"
 *          description: "GET방식으로 요청"
 *          tags: [Books]
 *          responses:
 *              "200":
 *                  description: 전체 유저 정보
 *                  content:
 *                      application/json:
 *                         schema:
 *                         type: object
 *                         properties:
 *                          ok:
 *                              type: boolean
 *                          books:
 *                              type: object
 */
router.get('/books', bookController.getBooks);

/**
 * @swagger
 * paths:
 *  /books/{id}:
 *      get:
 *          summary: "특정 책 정보 불러오기"
 *          description: "GET방식으로 요청"
 *          tags: [Books]
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                  type: integer
 *                description: 조회할 책의 ID
 *          responses:
 *              "200":
 *                  description: 전체 유저 정보
 *                  content:
 *                      application/json:
 *                         schema:
 *                         type: object
 *                         properties:
 *                          ok:
 *                              type: boolean
 *                          books:
 *                              type: object
 */
router.get('/books/:id', bookController.getBook);

/**
 * @swagger
 * paths:
 *  /books:
 *      post:
 *          summary: "특정 책 정보 불러오기"
 *          description: "POST방식으로 요청"
 *          tags: [Books]
 *          requestBody:
 *              required: true
 *              content:
 *                application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                        - name
 *                        - author
 *                      properties:
 *                          name:
 *                            type: string
 *                            description: 책 제목
 *                            example: "Node.js 초보 가이드북"
 *                          author:
 *                            type: string
 *                            description: 저자
 *                            example: "홍길동"
 *                          publisheDate:
 *                            type: string
 *                            description: 발간날짜
 *                            example: "2025-06-10"
 *                          rating:
 *                            type: number
 *                            description: 평점 (0.0) ~ (5.0)
 *                            example: 5.0
 *          responses:
 *              "200":
 *                  description: 전체 유저 정보
 *                  content:
 *                      application/json:
 *                         schema:
 *                         type: object
 *                         properties:
 *                          ok:
 *                              type: boolean
 *                          books:
 *                              type: object
 */
router.post('/books', bookController.postBook);

/**
 * @swagger
 * paths:
 *  /books/{id}:
 *      put:
 *          summary: "특정 책 정보 전체 수정하기"
 *          description: "PUT방식으로 요청"
 *          tags: [Books]
 *          requestBody:
 *              required: true
 *              content:
 *                application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                        - name
 *                        - author
 *                      properties:
 *                          id:
 *                            type: number
 *                            description: 
 *                          name:
 *                            type: string
 *                            description: 책 제목
 *                            example: "Node.js 초보 가이드북"
 *                          author:
 *                            type: string
 *                            description: 저자
 *                            example: "홍길동"
 *                          publisheDate:
 *                            type: string
 *                            description: 발간날짜
 *                            example: "2025-06-10"
 *                          rating:
 *                            type: number
 *                            description: 평점 (0.0) ~ (5.0)
 *                            example: 5.0
 *          responses:
 *              "200":
 *                  description: 전체 유저 정보
 *                  content:
 *                      application/json:
 *                         schema:
 *                         type: object
 *                         properties:
 *                          ok:
 *                              type: boolean
 *                          books:
 *                              type: object
 */
router.put('/books/:id', bookController.putBook);

module.exports = router;