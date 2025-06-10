const express = require('express');
const app = express();
const bookRouter = require('./routes/book');
const { swaggerUi, specs } = require("./swagger/swagger");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @path {GET} http://localhost:3000/
 * @description
 */

app.use('/books', bookRouter);
app.use((req, res, next) => {
    res.status(404).json({error: '유효하지 않은 페이지 입니다.'});
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server running on 3000`);
})