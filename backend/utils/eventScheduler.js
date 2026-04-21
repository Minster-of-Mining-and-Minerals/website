"use strict";

const cron = require("node-cron");
const { Op } = require("sequelize");
const { Event } = require("../models");

/**
 * Event Scheduler
 * Runs every minute to handle event publication lifecycle.
 */
const initEventScheduler = () => {
  // Run every minute
  cron.schedule("* * * * *", async () => {
    const now = new Date();

    try {
      // 1. Transition 'scheduled' events to 'published' when window opens
      const toPublish = await Event.findAll({
        where: {
          status: "scheduled",
          publish_start: { [Op.lte]: now },
          deleted_at: null,
        },
      });

      if (toPublish.length > 0) {
        await Event.update(
          { status: "published", published_at: now },
          { where: { event_id: toPublish.map((e) => e.event_id) } }
        );
        console.log(`[EventScheduler] Published ${toPublish.length} events.`);
      }

      // 2. Transition 'published' events to 'archived' when window closes
      const toArchive = await Event.findAll({
        where: {
          status: "published",
          publish_end: { [Op.lt]: now },
          deleted_at: null,
        },
      });

      if (toArchive.length > 0) {
        await Event.update(
          { status: "archived" },
          { where: { event_id: toArchive.map((e) => e.event_id) } }
        );
        console.log(`[EventScheduler] Archived ${toArchive.length} events.`);
      }
    } catch (error) {
      console.error("[EventScheduler] Error:", error);
    }
  });

  console.log(" [EventScheduler] Initialized (running every minute)");
};

module.exports = { initEventScheduler };
