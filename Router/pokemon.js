const express = require("express");
const router = express.Router();
const Pokemon = require("../models/Pokemon");

router.get("/", async (req, res) => {
  try {
    const arrayPokemonDB = await Pokemon.find();
    console.log(arrayPokemonDB);
    res.render("pokemon", { arrayPokemon: arrayPokemonDB });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  const body = req.body
  console.log(body);
  try {
    const pokemonDB = new Pokemon(body)
    await pokemonDB.save()
    res.redirect('/pokemon')
  } catch (error) {
    console.log(error);
  }
});

router.get("/crear", (req, res) => {
  res.render("crear")
})

router.get("/:id", async (req, res) => {
  const id = req.params.id
  
  try {
    const pokemonDB = await Pokemon.findOne({_id: id})
    res.render('detalle',{
      pokemon : pokemonDB,
      error: false
    })
  } catch (error) {
    console.log(error);
    res.render('detalle',{
      error: true,
      mensaje: 'Pokemon no encontrado'
    })
  }
});

router.delete('/:id', async (req, res) =>{
  const id = req.params.id;
  try{
    const pokemonDB = await Pokemon.findByIdAndDelete({_id: id});
    if(!pokemonDB) {
      res.json({
        estado: false,
        mensaje: 'No se puede eliminar el pokemon.'
      })
    }else{
      res.json({
        estado: true,
        mensaje: 'Pokemon eliminado.'
      })
    }
  }catch (error){
    console.log(error)
  }
});

router.put('/:id', async (req, res) =>{
  const id = req.params.id;
  const body = req.body;
  try{
    const pokemonDB = await Pokemon.findByIdAndUpdate(
      id,body, {useFindAndModify: false}
    )
    console.log(pokemonDB)
    res.json({
      estado: true,
      mensaje: 'Pokemon editado.'
    })
  }catch (error){
    console.log(error)
    res.json({
      estado: false,
      mensaje: 'No se puede editar el pokemon.'
    })
  }
});





module.exports = router;