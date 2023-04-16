import express from 'express';

const app = express();

const PORT = 8080;

app.get('/', (req, res, next) => res.send("Hello World !!"));

app.use((REQ, NEXT, g) => {

})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}...`);
})