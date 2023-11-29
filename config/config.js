require("dotenv").config();
require("ts-node").register({
    transpileOnly: true,
    compilerOptions: {
        module: "commonjs",
    },
});
const { sequelizeOpts } = require("../src/helpers/DB.ts"); // Change the path to your config file

module.exports = sequelizeOpts;
