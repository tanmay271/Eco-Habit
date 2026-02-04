export default {
  register(/*{ strapi }*/) { },

  async bootstrap({ strapi }) {
    try {
      // 1. Check if we already have data (so we don't duplicate)
      const categories = await strapi.entityService.findMany('api::category.category');

      if (categories.length === 0) {
        console.log("------------------------------------------");
        console.log("🌱 SEEDING DATABASE WITH DUMMY DATA...");

        // 2. Create a "Sustainability" Category
        const sustainability = await strapi.entityService.create('api::category.category', {
          data: {
            name: 'Sustainability',
            slug: 'sustainability',
            description: [{
              type: 'paragraph',
              children: [{ type: 'text', text: 'Daily habits for a more sustainable lifestyle.' }]
            }],
            publishedAt: new Date()
          },
        });

        // 3. Create a "Bike to Work" Challenge
        await strapi.entityService.create('api::challenge.challenge', {
          data: {
            title: 'Bike to Work',
            description: [{
              type: 'paragraph',
              children: [{ type: 'text', text: 'Ride your bike to the office instead of driving.' }]
            }],
            points: 50,
            category: sustainability.id,
            publishedAt: new Date()
          },
        });

        console.log("✅ DATABASE SEEDED: Refresh your website!");
        console.log("------------------------------------------");
      }
    } catch (error) {
      console.error("❌ BOOTSTRAP ERROR:", error);
    }
  },
};