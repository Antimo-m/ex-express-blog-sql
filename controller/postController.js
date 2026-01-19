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
    const id = req.params.id;
    const sql = "SELECT * FROM posts WHERE id = ?";
    const tagSql = `
    SELECT tags.label
    FROM tags
    JOIN post_tag ON tags.id = post_tag.tag_id
    WHERE post_tag.post_id = ?
  `;
    //prima query
    connection.query(sql, [id], (err, result) => {
        if (err) {
             return res.status(500).json(err);
        }
        if (result.length === 0) {
             return res.status(404).json({ error: "page not found" });
        }


        const post = result[0]; // prendo il post
        // Seconda query
        connection.query(tagSql, [id], (err, tagResults) => {
            if (err) {
                return res.status(500).json(err);
            }

            post.tags = tagResults.map(tag => tag.label); 
            res.json(post);
        });
    });
};


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
  const id = req.params.id
  const sql = `DELETE FROM posts where id = ?`

  connection.query(sql, [id], (err, result) => {
    if (err) {
      return  res.status(500).json({message: "errore interno"})
    }
    if (result.length === 0) {
        return res.status(404).json({
            error: "Post non trovato"
        })
    }res.status(204).json({
        success: "Post eliminato con successo"
    })
  })
}

export default { index, show, store, update, modify, destroy}