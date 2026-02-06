
type NewsItem = {
    id: number;
    title: string;
    excerpt: string;
    image: string;
    date: string;
    category: string;
    tags: string[];
};

export const newsData: NewsItem[] = [
    {
        id: 1,
        title: "Ministry of Mines Holds Consultation to Strengthen Mineral Development",
        excerpt:
            "The Ministry of Mines conducted a consultation with key stakeholders to discuss strategies for strengthening mineral development and improving sector performance across the country.",
        image: "/home-1.jpg",
        date: "2026-02-03",
        category: "Projects",
        tags: ["Consultation", "Development", "Mining"],
    },
    {
        id: 2,
        title: "Training Provided on Reforms in the Mining Sector",
        excerpt:
            "A capacity-building training was delivered to professionals focusing on recent reforms, regulatory updates, and operational improvements within the mining sector.",
        image: "/home-1.jpg",
        date: "2026-01-26",
        category: "Training",
        tags: ["Training", "Reforms", "Sector Updates"],
    },
    {
        id: 3,
        title: "Review Conducted on Ongoing Mining Development Projects",
        excerpt:
            "The Ministry of Mines carried out a review of ongoing mining development projects across various regions to assess progress, challenges, and compliance with regulations.",
        image: "/home-1.jpg",
        date: "2026-01-25",
        category: "Projects",
        tags: ["Review", "Projects", "Mining"],
    },
    {
        id: 4,
        title: "Ministry of Mines Holds Consultation to Strengthen Mineral Development",
        excerpt:
            "The Ministry of Mines conducted a consultation with key stakeholders to discuss strategies for strengthening mineral development and improving sector performance across the country.",
        image: "/home-1.jpg",
        date: "2026-02-03",
        category: "Projects",
        tags: ["Consultation", "Development", "Mining"],
    },
    {
        id: 5,
        title: "Training Provided on Reforms in the Mining Sector",
        excerpt:
            "A capacity-building training was delivered to professionals focusing on recent reforms, regulatory updates, and operational improvements within the mining sector.",
        image: "/home-1.jpg",
        date: "2026-01-26",
        category: "Training",
        tags: ["Training", "Reforms", "Sector Updates"],
    },
    {
        id: 6,
        title: "Review Conducted on Ongoing Mining Development Projects",
        excerpt:
            "The Ministry of Mines carried out a review of ongoing mining development projects across various regions to assess progress, challenges, and compliance with regulations.",
        image: "/home-1.jpg",
        date: "2026-01-25",
        category: "Projects",
        tags: ["Review", "Projects", "Mining"],
    },
];



// Mock data for demonstration
export const mockNewsData = [
    {
        id: "1",
        title: "Ministry of Mines Holds Consultation to Strengthen Mineral Development",
        subtitle: "Strategic meeting with stakeholders focuses on enhancing Ethiopia's mining sector performance",
        date: "2026-02-03",
        category: "Projects",
        author: "Ministry of Mines Communications Office",
        image: "/home-1.jpg",
        imageCaption: "The consultation meeting held at the Ministry of Mines headquarters",
        tags: ["Consultation", "Development", "Mining", "Policy", "Ethiopia"],
        content: `
      <div class="space-y-6">
        <p class="lead">The Ministry of Mines conducted a comprehensive consultation with key stakeholders to discuss strategies for strengthening mineral development and improving sector performance across Ethiopia. The high-level meeting brought together industry experts, government officials, and private sector representatives.</p>
        
        <div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
          <h3 class="font-bold text-lg mb-2">Key Objectives:</h3>
          <ul class="list-disc pl-5 space-y-2">
            <li>Develop a unified strategy for mineral resource management</li>
            <li>Address regulatory challenges in the mining sector</li>
            <li>Enhance transparency and governance in mineral licensing</li>
            <li>Promote sustainable mining practices</li>
            <li>Attract foreign and domestic investment in mining</li>
          </ul>
        </div>
        
        <h2 class="text-2xl font-bold">Meeting Highlights</h2>
        
        <p>The consultation, held at the Ministry's headquarters in Addis Ababa, featured presentations from leading geologists, environmental experts, and economic analysts. Participants engaged in productive discussions about the future of Ethiopia's mining industry.</p>
        
        <h3 class="text-xl font-semibold mt-6">Strategic Priorities Identified</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="flex items-center gap-3 mb-3">
              <Target class="text-green-600" size={20} />
              <h4 class="font-semibold">Resource Mapping</h4>
            </div>
            <p class="text-sm">Comprehensive geological surveys to identify untapped mineral reserves across all regions.</p>
          </div>
          
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="flex items-center gap-3 mb-3">
              <Users class="text-blue-600" size={20} />
              <h4 class="font-semibold">Capacity Building</h4>
            </div>
            <p class="text-sm">Training programs for local communities and technical staff in modern mining techniques.</p>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold">Expected Outcomes</h3>
        
        <p>The consultation is expected to result in a new Mineral Development Framework that will guide Ethiopia's mining sector for the next decade. Key expected outcomes include:</p>
        
        <ul class="list-disc pl-6 space-y-2 my-4">
          <li><strong>Revised Licensing Procedures:</strong> Streamlined processes for mining permits and exploration licenses</li>
          <li><strong>Environmental Safeguards:</strong> Enhanced regulations for sustainable mining practices</li>
          <li><strong>Community Benefits:</strong> Clear guidelines for local community participation and benefit sharing</li>
          <li><strong>Investment Incentives:</strong> Attractive packages for both domestic and international investors</li>
          <li><strong>Technology Adoption:</strong> Integration of modern mining technologies and practices</li>
        </ul>
        
        <blockquote class="border-l-4 border-gray-300 pl-6 py-2 my-6 italic">
          "This consultation marks a significant step forward in our efforts to unlock Ethiopia's mineral potential. We are committed to creating a mining sector that contributes substantially to national development while ensuring environmental sustainability and community welfare."
          <footer class="mt-2 not-italic font-semibold">— Ministry of Mines Spokesperson</footer>
        </blockquote>
        
        <h2 class="text-2xl font-bold">Sector Statistics</h2>
        
        <div class="overflow-x-auto my-6">
          <table class="min-w-full border border-gray-200">
            <thead class="bg-gray-100">
              <tr>
                <th class="border border-gray-300 px-4 py-2 text-left">Mineral Type</th>
                <th class="border border-gray-300 px-4 py-2 text-left">Reserves (Estimated)</th>
                <th class="border border-gray-300 px-4 py-2 text-left">Current Production</th>
                <th class="border border-gray-300 px-4 py-2 text-left">Growth Potential</th>
              </tr>
            </thead>
            <tbody>
              <tr class="hover:bg-gray-50">
                <td class="border border-gray-300 px-4 py-2">Gold</td>
                <td class="border border-gray-300 px-4 py-2">500+ tons</td>
                <td class="border border-gray-300 px-4 py-2">Increasing</td>
                <td class="border border-gray-300 px-4 py-2">High</td>
              </tr>
              <tr class="hover:bg-gray-50">
                <td class="border border-gray-300 px-4 py-2">Tantalum</td>
                <td class="border border-gray-300 px-4 py-2">Significant</td>
                <td class="border border-gray-300 px-4 py-2">Stable</td>
                <td class="border border-gray-300 px-4 py-2">Moderate</td>
              </tr>
              <tr class="hover:bg-gray-50">
                <td class="border border-gray-300 px-4 py-2">Gemstones</td>
                <td class="border border-gray-300 px-4 py-2">Various</td>
                <td class="border border-gray-300 px-4 py-2">Growing</td>
                <td class="border border-gray-300 px-4 py-2">High</td>
              </tr>
              <tr class="hover:bg-gray-50">
                <td class="border border-gray-300 px-4 py-2">Industrial Minerals</td>
                <td class="border border-gray-300 px-4 py-2">Extensive</td>
                <td class="border border-gray-300 px-4 py-2">Developing</td>
                <td class="border border-gray-300 px-4 py-2">Very High</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <h3 class="text-xl font-semibold">Next Steps</h3>
        
        <p>Following the consultation, the Ministry will establish working groups to develop detailed implementation plans. A follow-up meeting is scheduled for March 2026 to review progress and finalize the new Mineral Development Framework.</p>
        
        <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 my-6">
          <h4 class="font-bold text-yellow-800 mb-2">Public Participation</h4>
          <p class="text-yellow-700">The Ministry encourages public feedback on the proposed mining sector reforms. Citizens can submit their comments through the Ministry's official website or participate in regional consultation sessions scheduled throughout February 2026.</p>
        </div>
        
         
      </div>
    `,
        relatedNews: [
            {
                id: "2",
                title: "New Mining Regulations to Boost Investment",
                description: "Revised policies aim to attract $500 million in mining investments by 2027",
                date: "2026-01-28",
                category: "Policy",
                image: "/home-1.jpg"
            },
            {
                id: "3",
                title: "Geological Survey Reveals Untapped Mineral Resources",
                description: "Comprehensive mapping identifies new mining opportunities in four regions",
                date: "2026-01-20",
                category: "Research",
                image: "/home-2.jpg"
            },
            {
                id: "4",
                title: "Community Engagement in Mining Projects",
                description: "New guidelines ensure local participation in mining development",
                date: "2026-01-15",
                category: "Community",
                image: "/home-3.jpg"
            },
            {
                id: "5",
                title: "Sustainable Mining Practices Workshop",
                description: "Training session for mining companies on environmental protection",
                date: "2026-01-10",
                category: "Training",
                image: "/home-4.jpg"
            }
        ]
    }
];