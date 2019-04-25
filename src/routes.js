const user = require("../routes/route_user");
const news = require("../routes/admin/route_news");
module.exports = function(app) {
    app.use(user);
    app.use("/news", news)
};