const convertSelect = (json,valor,display)=>{
  let valores = [];
    json.forEach(x => {
      valores.push({"value":x[valor],"display":x[display]});
    })
  return valores;
}

module.exports = {
  convertSelect
}
