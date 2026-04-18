const db = require("../../models");

exports.getAuditLogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", action = "" } = req.query;

    const queryOptions = {
        where: {},
        order: [["created_at", "DESC"]],
        include: [
            {
                model: db.User,
                as: "user",
                attributes: ["user_id", "full_name", "email"],
            }
        ]
    };

    if (action) {
      queryOptions.where.action = action;
    }

    if (search) {
      // Basic search logic checking model names
      queryOptions.where.model_name = {
        [db.Sequelize.Op.iLike]: `%${search}%`,
      };
    }

    if (limit !== "all") {
        const offset = (page - 1) * limit;
        queryOptions.limit = parseInt(limit, 10);
        queryOptions.offset = offset;
    }

    const { rows, count } = await db.AuditLog.findAndCountAll(queryOptions);

    res.status(200).json({
      success: true,
      totalCount: count,
      data: rows,
    });
  } catch (error) {
    console.error("Failed to fetch audit logs:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error fetching logs",
    });
  }
};

exports.deleteAuditLog = async (req, res) => {
  try {
    const { id } = req.params;
    const log = await db.AuditLog.findByPk(id);

    if (!log) {
      return res.status(404).json({
        success: false,
        message: "Audit log not found",
      });
    }

    await log.destroy();

    res.status(200).json({
      success: true,
      message: "Audit log deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete audit log:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error deleting log",
    });
  }
};
