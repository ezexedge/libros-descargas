const Sequelize = require('sequelize');
const db = require('../config/db');

const Libros = db.define('libros', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    titulo :  Sequelize.STRING(100),
    autor : Sequelize.STRING(100),
    link : Sequelize.STRING(100),
    created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      }


});

module.exports = Libros;