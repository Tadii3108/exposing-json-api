const {addNewVisitor, listVisitors, deleteVisitor, updateVisitor, viewVisitor, deleteAllVisitors} = require('./db');
const express = require('express');
const app = express();
const port = 9005;

app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})


app.post('/addNewVisitor', async(req, res) => {
    console.log(JSON.stringify(req.body));
    const visitor_name = req.body.visitor_name;
    const visitor_age = req.body.visitor_age;
    const date_of_visit = req.body.date_of_visit;
    const time_of_visit = req.body.time_of_visit;
    const assistant = req.body.assistant;
    const comments = req.body.comments;

    const newVisitor = await addNewVisitor(visitor_name,visitor_age,date_of_visit,time_of_visit,assistant,comments);
    res.send(JSON.stringify(newVisitor));
    res.end();
});

app.get('/listVisitors', async(req, res) =>{
    const allVisitors = await listVisitors();

    res.send(JSON.stringify(allVisitors));
    res.end();
})

app.delete('/deleteVisitor/:id', async(req, res) => {
    const delVisitor = await deleteVisitor(req.params.id);

    res.send(JSON.stringify(delVisitor));
    res.end();
})

app.put('/updateVisitor/:id', async(req, res) => {
    console.log(JSON.stringify(req.body));
    const id = req.params.id;
    const visitor_name = req.body.visitor_name;
    const visitor_age = req.body.visitor_age;
    const date_of_visit = req.body.date_of_visit;
    const time_of_visit = req.body.time_of_visit;
    const assistant = req.body.assistant;
    const comments = req.body.comments;

    const update = await updateVisitor(id,visitor_name,visitor_age,date_of_visit,time_of_visit,assistant,comments);
    res.send(JSON.stringify(update));
    res.end();
})

app.get('/viewVisitor/:id', async(req, res) => {
    const view = await viewVisitor(req.params.id);

    res.send(JSON.stringify(view));
    res.end();
})

app.delete('/deleteAllVisitors', async(req, res) => {
    const deleteAll = await deleteAllVisitors();

    res.send(JSON.stringify(deleteAll));
    res.end();
})
    
const server = app.listen(port, () => {
    console.log(`server listening at ${port}.`)
});


