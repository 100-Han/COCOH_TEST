const express = require('express');
const router = express.Router();
const { Book } = require('../models');
const book = require('../models/book');

const isValidDate = (dateStr) => /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
const isValidRating = (ratingNum) => /^\d+\.\d$|^\d+\.\d\d$/.test(String(ratingNum));

// 전체 도서 불러오기 API
router.get('/', async(req, res) => {
    try {
        const data = await Book.findAll();
        const format = data.map(book => ({
            ...book.toJSON(), rating: Number(book.rating).toFixed(1)
        }));
        res.status(200).json(format);
    } catch(error) {
        res.status(400).json({error: '데이터 조회 실패입니다.', details: error.message});
    }
});

// 특정 도서 불러오기 API
router.get('/:id', async(req, res) => {
    try {
        const bookId = req.params.id;
        const data = await Book.findByPk(bookId);

        if (data == null) {return res.status(404).json({error: '찾는 도서가 없습니다.'})};

        const format = data.toJSON();
        res.status(200).json({...format, rating: Number(format.rating || 0).toFixed(1)});
    } catch(error) {
        res.status(400).json({error: '데이터 조회 실패입니다.', details: error.message});
    }
});

// 새 도서 생성 API
router.post('/', async(req, res) => {
    try {
        const {title, author, publishedDate, rating} = req.body;

        // 각 받아온 데이터들의 유효성을 검사
        if(!title || !author) {return res.status(400).json({error: '유효한 값이 아닙니다.'})};
        if(!title.trim()) {return res.status(400).json({error: 'title 항목은 공백으로 작성이 불가능합니다.'})};
        if(!author.trim()) {return res.status(400).json({error: 'author 항목은 공백으로 작성이 불가능합니다.'})};
        if(isNaN(rating)) {return res.status(400).json({error: 'rating 항목은 소수점 숫자만 사용가능합니다. (ex. 0.0)'})};
        if (!isValidRating(rating)) {return res.status(400).json({error: 'rating 항목은 반드시 소수점을 포함해야 합니다. (ex. 0.0)'})};
        if(rating < 0.0 || rating > 5.0) {return res.status(400).json({error: 'rating 항목은 0.0 ~ 5.0까지 사용가능합니다.'})};
        if(!isValidDate(publishedDate)){return res.status(400).json({error: '날짜 형식은 YYYY-MM-DD 이어야 합니다. (ex. 2025-06-09)'})}

        const newBook = await Book.create({
            title,
            author,
            publishedDate,
            rating
        });

        res.status(200).json(newBook);
    } catch(error) {
        res.status(400).json({error: '데이터 조회 실패입니다.', details: error.message});
    }
});

// 특정 도서 전체 정보 수정 API
router.put('/:id', async(req, res) => {
    try {
        const bookId = req.params.id;
        const {title, author, publishedDate, rating} = req.body;

        // 각 받아온 데이터들의 유효성을 검사
        if(!title.trim()) {return res.status(400).json({error: 'title 항목은 공백으로 작성이 불가능합니다.'})};
        if(!author.trim()) {return res.status(400).json({error: 'author 항목은 공백으로 작성이 불가능합니다.'})};
        if(!isNaN(rating)) {return res.status(400).json({error: 'rating 항목은 소수점 숫자만 사용가능합니다. (ex. 0.0)'})};
        if (!isValidRating(rating)) {return res.status(400).json({error: 'rating 항목은 반드시 소수점을 포함해야 합니다. (ex. 0.0)'})};
        if(rating < 0.0 || rating > 5.0) {return res.status(400).json({error: 'rating 항목은 0.0 ~ 5.0까지 사용가능합니다.'})};
        if(!isValidDate(publishedDate)){return res.status(400).json({error: '날짜 형식은 YYYY-MM-DD 이어야 합니다. (ex. 2025-06-09)'})}

        const[updated] = await Book.update(
            {title, author, publishedDate, rating},
            {where: {id : bookId}}
        );

        if(updated == 0) {return res.status(404).json({error: '찾는 도서가 없습니다.'})};

        const updatedBook = await Book.findByPk(bookId);
        res.status(200).json(updatedBook);
        
    } catch(error) {
        res.status(400).json({error: '데이터 수정에 실패하였습니다.', details: error.message});
    }
})

// 특정 도서 특정 정보 수정 API
router.patch('/:id', async(req, res) => {
    try {
        const bookId = req.params.id;
        const {title, author, publishedDate, rating} = req.body;

        // 각 받아온 데이터들의 유효성을 검사
        if(!title.trim()) {return res.status(400).json({error: 'title 항목은 공백으로 작성이 불가능합니다.'})};
        if(!author.trim()) {return res.status(400).json({error: 'author 항목은 공백으로 작성이 불가능합니다.'})};
        if(isNaN(rating)) {return res.status(400).json({error: 'rating 항목은 소수점 숫자만 사용가능합니다. (ex. 0.0)'})};
        if (!isValidRating(rating)) {return res.status(400).json({error: 'rating 항목은 반드시 소수점을 포함해야 합니다. (ex. 0.0)'})};
        if(rating < 0.0 || rating > 5.0) {return res.status(400).json({error: 'rating 항목은 0.0 ~ 5.0까지 사용가능합니다.'})};
        if(!isValidDate(publishedDate)){return res.status(400).json({error: '날짜 형식은 YYYY-MM-DD 이어야 합니다. (ex. 2025-06-09)'})}

        const book = await Book.findByPk(bookId);

        if(!book) {return res.status(404).json({error: '찾는 도서가 없습니다.'})};

        if (title) {book.title = title};
        if (author) {book.author = author};
        if (publishedDate) {book.publishedDate = publishedDate};
        if (rating) {book.rating = rating};

        await book.save();
        res.status(200).json(book);

    } catch(error) {
        res.status(400).json({error: '데이터 수정에 실패하였습니다.', details: error.message});
    }
})

// 특정 도서 삭제 API
router.delete('/:id', async(req, res) => {
    try {
    const bookId = req.params.id;
        const deletedBook = await Book.destroy({ where : {id : bookId} });

        if(!deletedBook) {return res.status(404).json({error: '찾는 도서가 없습니다.'})}

        res.status(200).json({message: '데이터가 정상적으로 삭제되었습니다.'})

    } catch(error) {
        res.status(400).json({error: '데이터 삭제에 실패하였습니다.', details: error.message});
    }
    

})

module.exports = router;