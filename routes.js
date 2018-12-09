const nextRoutes = require("next-routes");
const routes = (module.exports = nextRoutes());

routes.add("login");
routes.add("register");
routes.add('auction', '/auction/:id');
routes.add({page: 'index'});
