

const index = (req,res) => {
  res.render('main/index',{
    estudiante : req.query.nombre,
    nota1 : req.body.nota1,
    nota2 : req.body.nota2,
    nota3 : req.body.nota3
  })
}


const remover = (req,res) => {
  res.render('main/delete',{
    valores : req.query
  })
}

module.exports = {
  index,
  remover
}
