const funciones = require('../../funciones');
const Logic = require('../../logic/usuarioLogic');
const rolLogic = require('../../logic/rolLogic')

const sgMail = require('@sendgrid/mail');

const Create = async (req,res) => {
  let find = await Logic.FindOneAsync({numDoc:req.body.numDoc});
  if(!find.data){
    req.body.avatar = req.file.buffer;
     await Logic.CreateAsync(req.body);
     Mail(req.body.correo);
   }
   let roles = await rolLogic.FindAllAsync({});
   roles = funciones.convertSelect(
                         (roles.success) ? roles.data.filter(x => x.estado == true) : []
                      ,'_id','valor');
   res.render('usuario/create',{
     alerta: (find.data) ? "danger" : "success",
     msg : (find.data) ? "El usuario ya esta registrado" : "El usuario se creo correctamente",
     roles : roles
   });
}

const View = async(req,res) => {
  const id = (req.query.id) ? req.query.id : 0;
  let usuario = await Logic.FindByIdAsync(id);
  let data = (usuario.success) ? usuario.data : {};

  let roles = await rolLogic.FindAllAsync({});
  data.roles = funciones.convertSelect(
                        (roles.success) ? roles.data.filter(x => x.estado == true) : []
                     ,'_id','valor');
  res.render(`usuario/${ (id==0) ? 'create' : 'view' }`, data);
}

const Loggear = async (req, res) => {
  let result = await Logic.LoginAsync(req.body.usuario, req.body.contra);
  if(result.success){
    req.session.session = true;
    req.session.nick = result.data.nickname;
    req.session.idUsuario = result.data._id;
    req.session.id_rol = result.data.id_rol;
    req.session.avatar = result.data.avatar.toString('base64');
    res.send({success : true, data : "Operacion Exitosa"});
  }
  res.send({success : false, data : "Error al iniciar sesión"})
}

const Logout = async (req, res) => {

    req.session.session = null;
    req.session.nick = null;
    req.session.idUsuario = null;
    req.session.id_rol = null;

    res.send({success : true, data : "Operacion Exitosa"});
}

const Mail = (correo) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'farango@ideassimples.com.co',
    from: 'farango@ideassimples.com.co',
    subject: 'Bienvenido al curos de Node TdeA',
    text: 'Gracias por crear un usuario',
    html: '<strong>Gracias por crear un usuario</strong>',
  };
  sgMail.send(msg);
}

module.exports = {
  Create,
  View,
  Loggear,
  Logout
}
