"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // =============================
    // DEFINE ROUTES STRUCTURE
    // =============================

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
            translations: {
              en: "Mining",
              am: "ማዕድን",
            },
          },
          {
            key: "geothermal",
            path: "/geothermal",
            translations: {
              en: "Geothermal",
              am: "ጂኦተርማል",
            },
          },
          {
            key: "petroleum",
            path: "/petroleum",
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

    // =============================
    // BUILD ROUTES + TRANSLATIONS
    // =============================

    for (const route of routesData) {
      const routeId = uuidv4();

      routes.push({
        route_id: routeId,
        path: route.path,
        parent_id: null,
        order: route.order || 0,
        is_active: true, // ✅ controlled later by admin
        show_in_navbar: true,
        created_at: now,
        updated_at: now,
      });

      // translations
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

      // =============================
      // CHILDREN (SECTOR)
      // =============================
      if (route.children) {
        route.children.forEach((child, index) => {
          const childId = uuidv4();

          routes.push({
            route_id: childId,
            path: child.path,
            parent_id: routeId,
            order: index + 1,
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

    // =============================
    // INSERT INTO DB
    // =============================

    await queryInterface.bulkInsert("routes", routes, {
      ignoreDuplicates: true,
    });

    await queryInterface.bulkInsert("route_translations", translations, {
      ignoreDuplicates: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("route_translations", null, {});
    await queryInterface.bulkDelete("routes", null, {});
  },
};