let express = require("express")

let app = express()

app.use(express.json())

app.get("/student-read", (req, res) => {
    res.send("Student view API");
})

app.post("/Student-insert", async (req, res) => {
    let mydb=await dbconnection();
    let studentcollection=mydb.collection("studentcollection");
    
    let obj={
        sName:req.body.sName,
        sEmail:req.body.sEmail,
    }

    console.log(obj);
    res.send("Student insert API");
})

app.listen("8000")