"use strict";
exports.__esModule = true;
var typeorm_1 = require("typeorm");
// @ts-ignore
var dotenv_1 = require("dotenv");
var ChannelChats_1 = require("./src/entities/ChannelChats");
var ChannelMembers_1 = require("./src/entities/ChannelMembers");
var Channels_1 = require("./src/entities/Channels");
var DMs_1 = require("./src/entities/DMs");
var Mentions_1 = require("./src/entities/Mentions");
var Users_1 = require("./src/entities/Users");
var WorkspaceMembers_1 = require("./src/entities/WorkspaceMembers");
var Workspaces_1 = require("./src/entities/Workspaces");
dotenv_1.dotenv.config();
var dataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
        ChannelChats_1.ChannelChats,
        ChannelMembers_1.ChannelMembers,
        Channels_1.Channels,
        DMs_1.DMs,
        Mentions_1.Mentions,
        Users_1.Users,
        WorkspaceMembers_1.WorkspaceMembers,
        Workspaces_1.Workspaces,
    ],
    migrations: [__dirname + '/src/migrations/*.ts'],
    charset: 'utf8mb4',
    synchronize: false,
    logging: true
});
exports["default"] = dataSource;
