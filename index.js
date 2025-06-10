const express = require('express');
const app = express();
const bookRouter = require('./routes/book');

app.use(express.json());

app.use('/books', bookRouter);
app.use((req, res, next) => {
    res.status(404).json({error: '유효하지 않은 페이지 입니다.'});
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server running on 3000`);
})