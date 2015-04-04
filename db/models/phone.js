module.exports = function(sequelize, DataTypes) {
  var Phone = sequelize.define('Phone', {
    number: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'phones',
    classMethods: {
      associate: function (models) {
        Phone.belongsToMany(models.Trail, {through: 'PhoneTrail', as: 'trails'});
      }
    }
  });

  return Phone;
};
