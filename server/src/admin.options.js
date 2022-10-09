const { default: adminBro } = require("admin-bro");
const AdminBro = require("admin-bro");
const AdminBroMongoose = require("admin-bro-mongoose");

AdminBro.registerAdapter(AdminBroMongoose);

const models = require("../api/models/index.js");

const {
    User,
    Wallet,
    Tasks,
    HardLvlTask
} = models;

const menu = {
    workers: { name: "Сотрудники", icon: "UserMultiple" },
    money: { name: "Финансы", icon: "Money" },
    system: { name: "Система", icon: "System" },
};

/** @type {AdminBro.AdminBroOptions} */
const options = {
    resources: [
        {
            resource: User,
            options: {
                parent: menu.workers,
                properties: {
                    _id: { isVisible: false },
                    // lastName: { isTitle: true },
                },
            },
        },
        {
            resource: Tasks,
            options: {
                parent: menu.workers,
                properties: {
                    _id: { isVisible: false },
                    // lastName: { isTitle: true },
                },
            },
        },
        {
            resource: Wallet,
            options: {
                parent: menu.money,
                properties: {
                    _id: { isVisible: false },
                    // lastName: { isTitle: true },
                },
            },
        },
        {
            resource: HardLvlTask,
            options: {
                parent: menu.System,
                properties: {
                    _id: { isVisible: false },
                    // lastName: { isTitle: true },
                },
            },
        },
    ],
    locale: {},
    rootPath: "/",
    branding: {
        companyName: "VTB admin",
        softwareBrothers: false,
    },
};

module.exports = options;
