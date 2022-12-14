const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(express.urlencoded({ extended: true }))
const path = require('path');

app.use(express.json());
var cors = require('cors');
const { count } = require('console');
app.use(cors());

const MongoClient = require('mongodb').MongoClient;


var db;

MongoClient.connect('mongodb+srv://skdo223:apsode1@cluster0.udjmfja.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true }, function (에러, client) {
    if (에러) return console.log(에러)
    db = client.db('todoapp');

    app.listen(8080, function () {
        console.log('listening on 8080')
    });
});


// DB에 일정 조회
app.post('/list-confirm', (req, res) => {
    db.collection(req.body.local_id).find().toArray((에러, 결과) => {
        res.send(결과)
    })
    console.log('DB조회 완료');
})

// DB에 일정 추가
app.post('/todolist', (req, res) => {

    db.collection('counter').findOne({ name: '게시물갯수' }, function (에러, 결과) {
        let count = 결과.totalpost // DB의 총 게시물갯수 가져오기

        db.collection(req.body.local_id).insertOne({ _id: count + 1, title: req.body.title, name: req.body.name }, function (에러, 결과) {
            console.log('일정 저장완료');
            db.collection('counter').updateOne({ name: '게시물갯수' }, { $inc: { totalpost: 1 } }, (에러, 결과) => {
                res.status(200).send({ message: '성공했음' });
            })
        })

    })
})

// DB정보 수정,추가
app.put('/list-update', (req, res) => {
    console.log(req.body);
    db.collection(req.body.local_id).updateOne({ _id: req.body.id }, { $set: { memo: req.body.memo } }, (에러, 결과) => {
        res.status(200).send({ message: '수정 성공했음' });
    })
    console.log('수정완료');
})


// DB정보 삭제
app.delete('/list-delete', (req, res) => {
    console.log(req.body);
    // req.body._id = parseInt(req.body._id)
    db.collection(req.body.local_id).deleteOne(req.body, (에러, 결과) => {
        console.log('삭제완료');
        res.status(200).send({ message: '성공했음' });
    })
})


// Session 방식 로그인
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const { send } = require('process');

app.use(session({ secret: '비밀코드', resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


// 아이디 중복 확인
app.post('/double-check', (req, res) => {
    db.collection('sign').findOne({ id: req.body.id }, (에러, 결과) => {
        if (결과 == null) {
            res.send(true)
        } else {
            res.send(false)
        }
    })
})


// 회원가입
app.post('/sign-up', (req, res) => {

    db.collection('sign').insertOne({ name: req.body.name, id: req.body.id, pw: req.body.pw, email: req.body.em, phone: req.body.ph }, function (에러, 결과) {
        console.log('회원가입 완료');

        // 회원가입시 아이디와 동일한 컬렉션 생성 (나의 개인 DB)
        db.createCollection(req.body.id, function (err, res) {

            console.log("Collection 생성 완료.");

        });
    })

})

// 로그인

app.post('/login', (req,res)=> {
    db.collection('sign').findOne({ id: req.body.id }, function (에러, 결과) {
        // res.send(결과.id)
        console.log(결과);
        if(결과 == null) {
            res.send(false)
        } else {
            res.send(결과.id)
        }
    })
})

