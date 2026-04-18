const jwt = require("jsonwebtoken");
const db = require("../models");
const auditContext = require("../utils/auditContext");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access token required",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user to ensure they exist and are active, and attach permissions
    const user = await db.User.findByPk(decoded.user_id, {
      attributes: ["user_id", "email", "full_name", "is_active"],
      include: [
        {
          model: db.Role,
          as: "roles",
          include: [
            {
              model: db.RolePermission,
              as: "rolePermissions",
              include: [
                {
                  model: db.Permission,
                  as: "permission",
                  attributes: ["resource", "action"],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!user || !user.is_active) {
      return res.status(403).json({
        success: false,
        message: "User not found or inactive",
      });
    }

    const flattenedPermissions = [
      ...new Set(
        user.roles.flatMap((role) =>
          role.rolePermissions
            .filter((rp) => rp.permission?.resource && rp.permission?.action)
            .map(
              (rp) =>
                `${rp.permission.resource}:${rp.permission.action}`
            )
        )
      ),
    ];

    req.user = {
      user_id: user.user_id,
      email: user.email,
      full_name: user.full_name,
      roles: user.roles.map((r) => r.name),
      permissions: flattenedPermissions,
    };

    // Run the remainder of the request within an ALS context
    const store = new Map();
    store.set("userId", user.user_id);

    auditContext.run(store, () => {
      next();
    });
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// Permission middleware
const checkPermission = (resource, action) => {
  return (req, res, next) => {
    const requiredPermission = `${resource}:${action}`;

    if (!req.user || !req.user.permissions) {
      return res.status(403).json({
        success: false,
        message: "Access denied: No permissions found",
      });
    }

    if (!req.user.permissions.includes(requiredPermission)) {
      return res.status(403).json({
        success: false,
        message: `Access denied: Required permission ${requiredPermission}`,
      });
    }

    next();
  };
};

// Role checking middleware
const requireRole = (roleName) => {
  return (req, res, next) => {
    if (!req.user || !req.user.roles) {
      return res.status(403).json({
        success: false,
        message: "Access denied: No roles found",
      });
    }

    if (!req.user.roles.includes(roleName)) {
      return res.status(403).json({
        success: false,
        message: `Access denied: Required role ${roleName}`,
      });
    }

    next();
  };
};

// Check if user has any of the specified roles
const requireAnyRole = (roleNames) => {
  return (req, res, next) => {
    if (!req.user || !req.user.roles) {
      return res.status(403).json({
        success: false,
        message: "Access denied: No roles found",
      });
    }

    const hasRole = roleNames.some((roleName) =>
      req.user.roles.includes(roleName)
    );

    if (!hasRole) {
      return res.status(403).json({
        success: false,
        message: `Access denied: Required one of roles: ${roleNames.join(
          ", "
        )}`,
      });
    }

    next();
  };
};

module.exports = {
  authenticateToken,
  checkPermission,
  requireRole,
  requireAnyRole,
};
