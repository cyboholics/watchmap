import express from 'express';
import watchmap from '@cyboholics/watchmap-js-sdk';
import axios from 'axios';

const app = express();

console.log(process.env)

app.use(watchmap())

app.get('/express2-test1', (req, res) => {
    console.log("express2-test1 called")
    res.send('Hello World From Test1!');
})

app.get('/express2-test2', async (req, res) => {
    console.log("express2-test2 called")
    await axios.get('http://localhost:3001/express1-test3')
    res.send('Hello World From Test2!');
});

app.get('/express2-test3', (req, res) => {
    console.log("express2-test3 called")
    res.send('Hello World From Test3!');
});

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
})