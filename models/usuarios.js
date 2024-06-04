const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuarios', {
    nombres: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    primer_apellido: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    segundo_apellido: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    telefono: {
      type: DataTypes.CHAR(10),
      allowNull: false
    },
    id_usuario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    'contraseña': {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    fecha_sys: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    url_validacion: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    codigo_sesion: {
      type: DataTypes.CHAR(6),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'usuarios',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_usuario" },
        ]
      },
    ]
  });
};
