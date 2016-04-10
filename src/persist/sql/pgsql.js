import Sequelize from 'sequelize'


export default function (config) {

  /*
   * create a connection to postgres
   */
  var createConn = function (db, user, pass, host, port) {
    return new Sequelize(db, user, pass, {
      host: host,
      dialect: 'postgres',
      port: port
    });
  };


  /*
   * create a model, given a connection and a schema
   */
  var createModel = function (conn, schema, options) {
    return conn.define(schema.name, schema.def, options);
  };


  /*
   * sync model (i.e. create table) in database
   */
  var syncModel = function (model) {
    return model.sync({ force: true });
  };


  /*
   * get top level sequelize object for type lookup
   */
   var dbStatic = function () {
     return Sequelize;
   };


  return {
    initConn: createConn(
      config.psql.initialdb,
      config.psql.username,
      config.psql.password,
      config.psql.host,
      config.psql.port
    ),
    createConn: createConn,
    createModel: createModel,
    syncModel: syncModel,
    dbStatic: dbStatic
  };
}