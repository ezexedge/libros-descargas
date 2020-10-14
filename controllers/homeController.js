const Libros = require('../models/Libros')
const moment = require('moment')

exports.redireccion = (req,res)=>{
    res.redirect('/1')
}
exports.home = async (req,res) => {

   // const libros = await Libros.findAll({limit: 2,offset:2})
    //console.log(libros)

    let limit = 7
    let offset = 0
    
  await  Libros.findAndCountAll()
    .then(data=>{
        let page = req.params.page
        let pages = Math.ceil(data.count / limit);
        offset = limit * (page - 1);
        Libros.findAll({
            attributes: ['id', 'titulo', 'autor', 'link' , 'created_at'],
            limit: limit,
            offset: offset,
            $sort: { id: 1 },
            order: [['created_at', 'DESC']] 
          })
          .then((libros) => {
            res.render( 'index',{
                libros,
                data,
                 page,
                 pages
                });
          });
    })
    .catch(function (error) {
		res.render('error',error);
	});

   
}

exports.formLibros = (req,res)=> {


    res.render('subirLibros')
}

exports.subirLibros = async (req,res,next)=>{
    const { titulo , autor  , link } = req.body


    const libro = await Libros.create({titulo,autor,link})

    if(!libro){
       return next()
    }

    res.redirect('/')

}


exports.busqueda = async (req,res)=> {
    const { titulo } = req.query
    const libro = await Libros.findOne({ where: { titulo: titulo  } });
    

    res.render('busqueda',{
       busqueda,
       libro
    })
    
    
}