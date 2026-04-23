"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const routesData = [
      {
        key: "home",
        path: "/",
        order: 1,
        translations: {
          en: "Home",
          am: "መነሻ",
        },
      },
      {
        key: "sector",
        path: null,
        order: 2,
        translations: {
          en: "Sector",
          am: "ዘርፍ",
        },
        children: [
          {
            key: "mining",
            path: "/mining",
            order: 1,
            translations: {
              en: "Mining",
              am: "ማዕድን",
            },
          },
          {
            key: "geothermal",
            path: "/geothermal",
            order: 2,
            translations: {
              en: "Geothermal",
              am: "ጂኦተርማል",
            },
          },
          {
            key: "petroleum",
            path: "/petroleum",
            order: 3,
            translations: {
              en: "Petroleum",
              am: "ነዳጅ",
            },
          },
        ],
      },
      {
        key: "about",
        path: "/about",
        order: 3,
        translations: {
          en: "About",
          am: "ስለ እኛ",
        },
      },
      {
        key: "asm",
        path: "/asm",
        order: 4,
        translations: {
          en: "ASM",
          am: "ASM",
        },
      },
      {
        key: "investigating",
        path: "/investigating-in-ethiopia",
        order: 5,
        translations: {
          en: "Investigating in Ethiopia",
          am: "በኢትዮጵያ ምርመራ",
        },
      },
      {
        key: "services",
        path: "/services",
        order: 6,
        translations: {
          en: "Services",
          am: "አገልግሎቶች",
        },
      },
      {
        key: "news",
        path: "/news",
        order: 7,
        translations: {
          en: "News",
          am: "ዜና",
        },
      },
      {
        key: "events",
        path: "/events",
        order: 8,
        translations: {
          en: "Events",
          am: "ክስተቶች",
        },
      },
      {
        key: "contact",
        path: "/contact",
        order: 9,
        translations: {
          en: "Contact",
          am: "አግኙን",
        },
      },
    ];

    const routes = [];
    const translations = [];
    const allRouteIds = new Set(); // Track all created route IDs

    for (const route of routesData) {
      const routeId = uuidv4();
      allRouteIds.add(routeId);

      // ================= ROOT ROUTE =================
      routes.push({
        route_id: routeId,
        path: route.path,
        parent_id: null,
        order: route.order,
        is_active: true,
        show_in_navbar: true,
        created_at: now,
        updated_at: now,
      });

      Object.entries(route.translations).forEach(([lang, label]) => {
        translations.push({
          route_translation_id: uuidv4(),
          route_id: routeId,
          language_code: lang,
          label,
          created_at: now,
          updated_at: now,
        });
      });

      // ================= CHILD ROUTES =================
      if (route.children?.length) {
        route.children.forEach((child) => {
          const childId = uuidv4();
          allRouteIds.add(childId);

          routes.push({
            route_id: childId,
            path: child.path,
            parent_id: routeId, // This links to parent
            order: child.order,
            is_active: true,
            show_in_navbar: true,
            created_at: now,
            updated_at: now,
          });

          Object.entries(child.translations).forEach(([lang, label]) => {
            translations.push({
              route_translation_id: uuidv4(),
              route_id: childId,
              language_code: lang,
              label,
              created_at: now,
              updated_at: now,
            });
          });
        });
      }
    }

    // Clear existing data first to avoid duplicates
    await queryInterface.bulkDelete("route_translations", null, {});
    await queryInterface.bulkDelete("routes", null, {});

    // Insert fresh data
    await queryInterface.bulkInsert("routes", routes);
    await queryInterface.bulkInsert("route_translations", translations);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("route_translations", null, {});
    await queryInterface.bulkDelete("routes", null, {});
  },
};