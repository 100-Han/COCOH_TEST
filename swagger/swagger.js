const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const option = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "도서관에서 쓸 도서관리 REST API 구현",
            description: "도서관리 RESTFul API 클라이언트 UI"
        },
        serve: [
            {
                url: "http://localhost:3000",
            }
        ]
    },
    apis: ["./index.js", "./swagger/index.js", "./swagger/book.js"]
}

const specs = swaggerJsdoc(option);

module.exports = {swaggerUi, specs};