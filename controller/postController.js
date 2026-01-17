import napoli from "../Napoli.js"
import connection from "../bs.js"

//Index
const index = (req, res) => {
    const sql = `SELECT * FROM posts`
    connection.query(sql, (err, result) => {
        if (err) {
            res.status(500)
            return
        }res.json({
            result : result
        })
    }
    )

    /* const risultato= {
        count: napoli.length,
        valore: napoli
    }
    res.json(risultato) */
}


//Show
const show = (req, res) => {
    const id = parseInt(req.params.id);
    const post = napoli.find(p => p.id === id)

    if (post) {
        res.json(post)
    } else {
        res.json({ message: `il post con id ${id} non è stato trovato` }) //message per restiture l'errore in formato json
    }
}


//Store
const store = (req, res) => {
    const newid = napoli[napoli.length -1].id +1;// andiamo a generare l'id manualmente

    
    const newPost = {
        id:newid,
        ...req.body
    }; //creiamo un nuovo oggetto passandogli l'id e copiando i dati dal request

    napoli.push(newPost)//pushiamo il tutto nel nostro array napoli, 
    console.log(req.body)
    res.status(201).json(newPost)//mostriamo la rispsota
}


//Update
const update = (req, res) => {
    const id = parseInt(req.params.id);
    const postIndex = napoli.findIndex(post => post.id === id)//cerchiamo l'indice del post corrispondente all'id passato nell'url

    napoli[postIndex] = {
        id, 
        ...req.body
    } // sovrasciviamo il post trovato con i dati passati nel body mantendo lo stesso id

    res.json(napoli[postIndex]) //mostriamo il post aggiornato
    
}


//Modify
const modify = (req,res) => {
 const id = parseInt(req.params.id);
const post = napoli.find(post => post.id === id) //troviamo il post corridpsondente all'id
const ModifyPost = {...post, ...req.body}//creiamo un oggetto dove combinato i dati del post originale con quelli ricevuti nel body

    const index = napoli.findIndex(post => post.id === id); //Troviamo l’indice del post nell’array e lo sostituiamo con l’oggetto aggiornato
napoli[index] = ModifyPost

res.status(200).json(ModifyPost)

}


const destroy = (req,res) => {
    const id = parseInt(req.params.id);
    const postIndex = napoli.findIndex(post => post.id === id);

    napoli.splice(postIndex, 1);
    res.status(200).json({message: "post con id ${id} eliminato"})

}

export default { index, show, store, update, modify, destroy}