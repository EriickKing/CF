const user = require("../routes/route_user");
const news = require("../routes/admin/route_news");
const services = require("../routes/admin/route_services");
const plans = require("../routes/admin/route_plan");
const installations = require("../routes/admin/route_installation");
const hours = require("../routes/admin/route_hour");
const deli = require("../routes/store/route_deli");
const article = require("../routes/store/route_article");
module.exports = function(app) {
    app.use(user);
    app.use("/news", news)
    app.use("/services", services)
    app.use("/plans", plans)
    app.use("/insts", installations)
    app.use("/hours", hours)

    //STORE
    app.use("/delivery", deli);
    app.use("/article", article);
};