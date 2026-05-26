let express = require("express")
let {dbConnection} = require("./dbconnection")
let app = express()
app.use(express.json())

app.get("/student-read",async (req, res) => {
    let mydb = await dbConnection();
    let studentCollection = mydb.collection("students")
    let data = await studentCollection.find().toArray();
    let resobj={
        status:"success",
        data:data,
        msg:"data read successfully"
    }
    res.send(resobj);
})

app.post("/student-insert",async (req, res) => {
    let mydb = await dbConnection();
    let studentCollection = mydb.collection("students");
    let result = await studentCollection.insertOne(req.body);
    let resobj = {
        status: "success",
        data: result,
        msg: "data inserted successfully"
    };
    res.send(resobj);
});

app.listen(8000);