//importar dependencia do SQlite

sqlite3 = require("sqlite3").verbose()

//criar o objeto q ira fazer operaçoes no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//utilizar o obeto de banco de dados
db.serialize(() => {
//     //criar tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places(
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT, 
//             name TEXT,
//             address TEXT,
//             address2 TXT,
//             state TEXT,
//             city TEXT,
//             itens TXT
//         );
//     `)
//     //inserir dados na tabela
//     const query = `
//         INSERT INTO places (
//             image, 
//             name,
//             address, 
//             address2,
//             state,
//             city, itens
//         ) VALUES (?, ?, ?, ?, ? ,?, ?)
//     `
    // const values = [
    //     "http://localhost:3000/assets/assets/recycle02.jpeg", 
    //     "PapaerSider",
    //     "guilherme Gembala,Jardim America",
    //     "numero 260",
    //     "Santa Catarina",
    //     "Rio do Sul",
    //     "Residuos Eletronicos e Lampadas"
    // ]

//    function afterInsertData(err){
//         if(err){
//             return console.log(err)
//         }
//     console.log("Cadrastrado com sucesso")
//     console.log(this)
//     }

    //db.run(query, values, afterInsertData)

    //consultar s dados na tabela
    //db.all(`SELECT * FROM places`, function(err, rows){
      //  if(err){
        //    return console.loge(err)
        //}
        //console.log("Aqui estao seus registros: ")
        //console.log(rows)
    //})

    //deletar dado na tabela
    db.run(`DELETE FROM places WHERE id = ?`, [3], function(err){
       if(err){
           return console.loge(err)
        }
        console.log("Registro deletado com sucesso")
    })
})