let express = require("express")

let app = express()

app.use(express.json())


app.get("/student-read", (req, res) => {
    res.send("Student view API");
})

app.post("/student-insert", (req, res) => {
    res.send("Student insert API");
})

app.listen(8000) 