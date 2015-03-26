module.exports = function(sequelize, DataTypes) {
  var Trail = sequelize.define('Trail', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    source: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING
    },
    status_date: {
      type: DataTypes.DATE
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'trails'
  });

  return Trail;
};

