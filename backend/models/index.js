"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const auditContext = require("../utils/auditContext");

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

const db = {};
let sequelize;

const poolConfig = {
  dialect: "postgres",
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, poolConfig);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    ...config,
    ...poolConfig,
  });
}

/**
 * Recursively load all model files
 */
const loadModels = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    // 🔁 If folder → recurse
    if (stat.isDirectory()) {
      loadModels(fullPath);
      return;
    }

    // ✅ Load only valid model files
    if (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.endsWith(".js") &&
      !file.endsWith(".test.js")
    ) {
      const model = require(fullPath)(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    }
  });
};

// 🚀 Load models from this directory and all subdirectories
loadModels(__dirname);

// 🔗 Setup associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Helper to construct and save audit logs
const logAction = (action) => async (instance, options) => {
  if (!db.AuditLog) return;
  // Prevent infinite loops
  if (instance.constructor.name === "AuditLog") return;

  const store = auditContext.getStore();
  let userId = null;
  if (store && store.has("userId")) {
    userId = store.get("userId");
  }

  // Find the primary key name securely
  let recordId = "UNKNOWN";
  if (instance.constructor.primaryKeyAttributes && instance.constructor.primaryKeyAttributes.length > 0) {
    const pk = instance.constructor.primaryKeyAttributes[0];
    recordId = instance[pk] ? String(instance[pk]) : "UNKNOWN";
  } else if (instance.id) {
    recordId = String(instance.id);
  }

  let oldValues = null;
  let newValues = null;

  if (action === "CREATE") {
    newValues = instance.get();
  } else if (action === "UPDATE") {
    // Selectively capture what changed or full previous snapshot
    oldValues = instance._previousDataValues || null;
    newValues = instance.get();
  } else if (action === "DELETE") {
    oldValues = instance.get();
  }

  try {
    await db.AuditLog.create({
      user_id: userId,
      action: action,
      model_name: instance.constructor.name,
      record_id: recordId,
      old_values: oldValues,
      new_values: newValues,
    }, { transaction: options.transaction });
  } catch (error) {
    console.error(`Failed to write AuditLog for ${instance.constructor.name} [${action}]:`, error);
  }
};

sequelize.addHook("afterCreate", logAction("CREATE"));
sequelize.addHook("afterUpdate", logAction("UPDATE"));
sequelize.addHook("afterDestroy", logAction("DELETE"));

module.exports = db;
