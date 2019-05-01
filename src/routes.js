const user = require("../routes/route_user");
const news = require("../routes/admin/route_news");
const services = require("../routes/admin/route_services");
const plans = require("../routes/admin/route_plan");
const installations = require("../routes/admin/route_installation");
module.exports = function(app) {
    app.use(user);
    app.use("/news", news)
    app.use("/services", services)
    app.use("/plans", plans)
    app.use("/insts", installations)
};