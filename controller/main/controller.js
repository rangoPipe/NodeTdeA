

const index = (req,res) => {
  //console.log(req.session);
  res.render('main/index')
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
