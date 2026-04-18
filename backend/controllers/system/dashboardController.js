const db = require("../../models");
const { Sequelize, Op } = require("sequelize");
const moment = require("moment");

const getDashboardAnalytics = async (req, res) => {
  try {
    const thirtyDaysAgo = moment().subtract(30, "days").toDate();

    // 1. Overview counts
    const totalUsersPromise = db.User.count();
    const activeRolesPromise = db.Role.count();
    const totalLogsPromise = db.AuditLog.count();
    const totalMessagesPromise = db.Message ? db.Message.count() : Promise.resolve(0);
    const totalNewsPromise = db.News ? db.News.count() : Promise.resolve(0);

    const [totalUsers, activeRoles, totalLogs, totalMessages, totalNews] = await Promise.all([
      totalUsersPromise,
      activeRolesPromise,
      totalLogsPromise,
      totalMessagesPromise,
      totalNewsPromise
    ]);

    // 2. Audit logs over time (last 30 days) - area chart
    const logsOverTime = await db.AuditLog.findAll({
      attributes: [
        [Sequelize.fn("DATE", Sequelize.col("created_at")), "date"],
        [Sequelize.fn("COUNT", Sequelize.col("*")), "count"],
      ],
      where: {
        created_at: {
          [Op.gte]: thirtyDaysAgo,
        },
      },
      group: [Sequelize.fn("DATE", Sequelize.col("created_at"))],
      order: [[Sequelize.fn("DATE", Sequelize.col("created_at")), "ASC"]],
      raw: true,
    });

    // 3. User roles distribution - pie chart
    // A user can have multiple roles, so we count combinations in user_roles
    let userRolesCount = [];
    if (db.UserRoles && db.Role) {
      userRolesCount = await db.UserRoles.findAll({
        attributes: [
          [Sequelize.col("role.name"), "role"],
          [Sequelize.fn("COUNT", Sequelize.col("UserRoles.user_id")), "count"]
        ],
        include: [{
          model: db.Role,
          as: "role",
          attributes: []
        }],
        group: ["role.role_id", "role.name"],
        raw: true
      });
    }

    // 4. Action breakdown (Audit Logs) - pie chart
    const actionsBreakdown = await db.AuditLog.findAll({
      attributes: [
        "action",
        [Sequelize.fn("COUNT", Sequelize.col("*")), "count"],
      ],
      group: ["action"],
      raw: true,
    });

    // 5. Public contacts / messages over time - bar chart
    let contactsOverTime = [];
    if (db.Message) {
        contactsOverTime = await db.Message.findAll({
            attributes: [
              [Sequelize.fn("DATE", Sequelize.col("created_at")), "date"],
              [Sequelize.fn("COUNT", Sequelize.col("*")), "count"],
            ],
            where: {
              created_at: {
                [Op.gte]: thirtyDaysAgo,
              },
            },
            group: [Sequelize.fn("DATE", Sequelize.col("created_at"))],
            order: [[Sequelize.fn("DATE", Sequelize.col("created_at")), "ASC"]],
            raw: true,
        });
    }

    // 6. News views vs reactions - stacked bar chart (if available)
    let newsInteractions = [];
    if (db.News && db.NewsRead && db.NewsReaction) {
        // Find top 10 news by views
        const topNews = await db.News.findAll({
            attributes: ['news_id', 'title'],
            limit: 10,
            raw: true
        });

        for (let article of topNews) {
            const readCount = await db.NewsRead.count({ where: { news_id: article.news_id } });
            const reactionCount = await db.NewsReaction.count({ where: { news_id: article.news_id } });
            newsInteractions.push({
                title: article.title.substring(0, 15) + "...",
                views: readCount,
                reactions: reactionCount
            });
        }
    }

    // Map properties for UI consistency
    const formatTimeSeries = (data, valueKey = "count") => {
      // Create a map of existing dates
      const dataMap = new Map();
      data.forEach((item) => {
        // SQL DATE() sometimes returns formatting differently (e.g. string or JS Date).
        // Safest is to moment(item.date) wrapper.
        const dateStr = moment(item.date).format("YYYY-MM-DD"); 
        dataMap.set(dateStr, parseInt(item.count, 10));
      });

      // Fill in blanks for 30 days
      const result = [];
      for (let i = 29; i >= 0; i--) {
        const d = moment().subtract(i, 'days').format('YYYY-MM-DD');
        result.push({
          date: d,
          [valueKey]: dataMap.has(d) ? dataMap.get(d) : 0,
        });
      }
      return result;
    };

    const formattedLogsOverTime = formatTimeSeries(logsOverTime, "actions");
    const formattedContactsOverTime = formatTimeSeries(contactsOverTime, "messages");

    return res.status(200).json({
      success: true,
      data: {
        summary: {
          totalUsers,
          activeRoles,
          totalLogs,
          totalMessages,
          totalNews
        },
        logsOverTime: formattedLogsOverTime,
        contactsOverTime: formattedContactsOverTime,
        actionsBreakdown: actionsBreakdown.map(a => ({
           action: a.action || 'unknown',
           count: parseInt(a.count, 10)
        })),
        rolesDistribution: userRolesCount.map(r => ({
           role: r.role || 'Unassigned',
           count: parseInt(r.count, 10)
        })),
        newsInteractions
      },
    });
  } catch (error) {
    console.error("Dashboard analytics error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching dashboard analytics.",
    });
  }
};

module.exports = {
  getDashboardAnalytics,
};
