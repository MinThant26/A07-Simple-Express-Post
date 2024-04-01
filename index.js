const express = require('express');
const shortid  = require('shortid');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

//! router
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname + '/public/')))

app.post('/post', (req, res) => {
    const database = './database.json';

    fs.readFile(database, 'utf-8', (err, data) => {
        if(!err){
            const jsonData = JSON.parse(data);
            const id = shortid.generate();
            jsonData.push({
                id: id,
                first: req.body.firstName,
                last: req.body.lastName,
                age: req.body.age
            })

            const newObject = JSON.stringify(jsonData, null, 2);

            fs.writeFile(database, newObject, err => {
                if(err){
                    console.log(err);
                    res.send('Error: json cannot rewrite');
                }
                else{
                    res.json(jsonData);
                }
            })        
        }
        else{
            console.log(err);
            res.send('Error: json not open or not created');
        }
    })
})

//! server
app.listen(PORT, () => {
    console.log(`This app is running at ${PORT}`)
})