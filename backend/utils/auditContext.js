const { AsyncLocalStorage } = require("async_hooks");

const auditContext = new AsyncLocalStorage();

module.exports = auditContext;
