let express = require("express")
let {dbConnection} = require("./dbconnection")
const { ObjectId } = require("mongodb")
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

app.put("/student-insert",async (req, res) => {
    let mydb = await dbConnection();
    let studentCollection = mydb.collection("students");
    let {sName,sEmail} = req.body;
    let obj = {
        sName,
        sEmail
    }
    let result = await studentCollection.insertOne(obj);
    let resobj = {
        status: "success",
        data: result,
        msg: "data inserted successfully"
    };
    res.send(resobj);
});

app.delete("/student-delete/:id",async (req, res) => {
    let {id} = req.params;
    let mydb = await dbConnection();
    let studentCollection = mydb.collection("students");
    let result = await studentCollection.deleteOne({_id:new ObjectId(id)});
    let resobj = {
        status: "success",
        data: result,
        msg: "data deleted successfully"
    };
    res.send(resobj);
});

app.put("/student-update/:id", async (req, res) => {
    try {
        let {id} = req.params;
        let {sName,sEmail} = req.body;
        let obj = {};
        if (sName != "" && sName != undefined && sName != null) {
            obj["sName"] = sName;
        }
        if (sEmail != "" && sEmail != undefined && sEmail != null) {
            obj["sEmail"] = sEmail;
        }
        let mydb = await dbConnection();
        let studentCollection = mydb.collection("students");
        let result = await studentCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: obj }
        );
        let resobj = {
            status: "success",
            data: result,
            msg: "data updated successfully"
        };
        res.status(200).json(resobj);
    } catch (error) {
        res.status(500).json({
            status: "failed",
            msg: error.message
        });
    }
});

// app.put("/student-update/:id",async (req, res) => {
//     let {id} = req.params;
//     let {sName,sEmail} = req.body;

//     let obj={};

//     if(sName!=="" && sName!==undefined && sName!==null){
//         obj['sName']=sName;
//     }
//     if(sEmail!=="" && sEmail!==undefined && sEmail!==null){
//         obj['sEmail']=sEmail;
//     }

//     let mydb = await dbConnection();
//     let studentCollection = mydb.collection("students");
//     let result = await studentCollection.updateOne({_id:new ObjectId(id)},{$set:obj});
//     let resobj = {
//         status: "success",
//         data: result,
//         msg: "data updated successfully"
//     };
//     res.send(resobj);
// });

app.listen(8000);