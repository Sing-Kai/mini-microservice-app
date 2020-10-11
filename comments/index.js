const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');

const app = express();
app.use(bodyParser.json());

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res)=> {
    res.send(commentsByPostId[req.params.id] ||[]);
});

app.post('/posts/:id/comments', (req, res)=>{
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;

    //find comment by post id, if not found return empty array
    const comments = commentsByPostId[req.params.id] || [] ;

    //add new comment to post
    comments.push({id: commentId, content});

    //reassign comments back to post
    commentsByPostId[req.params.id] = comments;

    res.status(201).send(comments);
});

app.listen(4001, ()=>{
    console.log('listening on 4001');
})