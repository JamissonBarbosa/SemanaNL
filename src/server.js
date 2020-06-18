const express = require("express")
const server = express()

//pegar o banco de dados

const db = require("./database/db")

//pasta public
server.use(express.static("public"))

//habilitar o uso do req.body
server.use(express.urlencoded({ extended: true} ))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//pagina inicial
server.get("/", (req, res) => {
    return res.render("index.html", {title: "Um titulo"})
})

server.get("/create-point", (req, res) => {
    

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    //console.log(req.body)
    //inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            image, 
            name,
            address, 
            address2,
            state,
            city, 
            itens
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.itens
    ]

   function afterInsertData(err){
        if(err){
            return console.log(err)
        }
    console.log("Cadrastrado com sucesso")
    console.log(this)

    return res.render("create-point.html", {saved: true})
    }
    

    db.run(query, values, afterInsertData)
    
})

server.get("/search", (req, res) => {
    const search = req.quiry.search

    if(search == ""){
        return res.render("search-results.html", {total: 0})
        
    }

    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            return console.loge(err)
        }
        const total = rows.length
        return res.render("search-results.html", {places: rows, total: total})
    })

    
})

//ligar servidor
server.listen(3000)