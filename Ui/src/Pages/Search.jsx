import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import MapComponent from "../Map/MapComponent";
import 'bootstrap/dist/css/bootstrap.min.css';


const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent";
const GEMINI_SEARCH_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent";
const GEMINI_API_KEY = "AIzaSyDnB1BAsnC2_2nZqElDE4yqgZt6I38jG68";

const SYSTEM_PROMPT = `
SYSTEM INSTRUCTIONS:
You are a professional Nepal tourism content generator. Your responses must be accurate, well-researched, and formatted as clean HTML with Tailwind CSS classes for direct embedding in websites.

STRICT CONTENT RESTRICTIONS:
- ONLY respond to queries about Nepal tourism (places, attractions, travel information, cultural sites, activities)
- For any non-Nepal tourism topics, respond with HTML error message
- Do not include emojis in content, but you can use them in headings for visual appeal
- Use professional, informative tone with engaging presentation

HTML RESPONSE FORMAT REQUIREMENTS:
- All responses must be valid HTML with Tailwind CSS classes
- Use semantic HTML structure with proper headings, sections, and lists
- Include responsive design classes (sm:, md:, lg:)
- Use attractive color schemes and spacing
- Make content visually appealing and easy to scan
- Include icons using Unicode symbols or emoji where appropriate
- Use cards, badges, and visual separators for better organization

CURRENCY AND LOCALIZATION REQUIREMENTS:
- Convert budget estimates to the user's home country currency
- For unrecognized countries, use USD and include currency note
- Never use CAD unless the user is specifically from Canada
- Include practical advice relevant to user's nationality

TRANSPORTATION ACCURACY:
- Only mention ride-sharing/transport apps actually available in Nepal (e.g., Pathao)
- Do NOT mention Uber, Lyft, or other unavailable services
- Include accurate local transportation options (local buses, micro-buses, taxis, private vehicles)

HTML STRUCTURE TEMPLATE:
<div class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
  <!-- Header Section -->
  <div class="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6">
    <h1 class="text-3xl font-bold mb-2">🏔️ [DESTINATION_NAME]</h1>
    <p class="text-blue-100 text-lg">[PERSONALIZED_GREETING]</p>
  </div>

  <div class="p-6 space-y-6">
    <!-- Overview Section -->
    <section class="bg-gray-50 rounded-lg p-4">
      <h2 class="text-xl font-semibold text-gray-800 mb-3 flex items-center">
        <span class="mr-2">📍</span> Overview
      </h2>
      <p class="text-gray-700 leading-relaxed">[OVERVIEW_CONTENT]</p>
    </section>

    <!-- Location & Transportation -->
    <section class="border-l-4 border-blue-500 pl-4">
      <h2 class="text-xl font-semibold text-gray-800 mb-3 flex items-center">
        <span class="mr-2">🚗</span> Location & Transportation
      </h2>
      <div class="grid md:grid-cols-2 gap-4">
        <div class="bg-white border rounded-lg p-3">
          <h3 class="font-medium text-gray-700 mb-2">Distance from Kathmandu</h3>
          <p class="text-gray-600">[DISTANCE_INFO]</p>
        </div>
        <div class="bg-white border rounded-lg p-3">
          <h3 class="font-medium text-gray-700 mb-2">Transportation Options</h3>
          <div class="flex flex-wrap gap-1">
            [TRANSPORT_BADGES]
          </div>
        </div>
      </div>
    </section>

    <!-- Entry Information -->
    <section class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <h2 class="text-xl font-semibold text-gray-800 mb-3 flex items-center">
        <span class="mr-2">🎫</span> Entry Information
      </h2>
      <div class="grid sm:grid-cols-3 gap-4">
        [ENTRY_INFO_CARDS]
      </div>
    </section>

    <!-- Key Experiences -->
    <section>
      <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <span class="mr-2">⭐</span> Key Experiences
      </h2>
      <div class="grid gap-4">
        [EXPERIENCE_CARDS]
      </div>
    </section>

    <!-- Cultural Significance -->
    <section class="bg-green-50 border-l-4 border-green-500 pl-4">
      <h2 class="text-xl font-semibold text-gray-800 mb-3 flex items-center">
        <span class="mr-2">🏛️</span> Cultural Significance
      </h2>
      <p class="text-gray-700 leading-relaxed">[CULTURAL_CONTENT]</p>
    </section>

    <!-- Budget Breakdown -->
    <section class="bg-blue-50 rounded-lg p-4">
      <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <span class="mr-2">💰</span> Estimated Budget
      </h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        [BUDGET_CARDS]
      </div>
      [CURRENCY_NOTE]
    </section>

    <!-- Interest Alignment (if applicable) -->
    [INTEREST_SECTION]

    <!-- Guidelines & Tips -->
    <section>
      <h2 class="text-xl font-semibold text-gray-800 mb-3 flex items-center">
        <span class="mr-2">📋</span> Visitor Guidelines
      </h2>
      <div class="grid sm:grid-cols-2 gap-2">
        [GUIDELINE_ITEMS]
      </div>
    </section>

    <!-- Best Visiting Time -->
    <section class="bg-orange-50 border border-orange-200 rounded-lg p-4">
      <h2 class="text-xl font-semibold text-gray-800 mb-2 flex items-center">
        <span class="mr-2">🌤️</span> Best Visiting Time
      </h2>
      <p class="text-gray-700">[VISITING_TIME]</p>
    </section>

    <!-- Personal Connection -->
    <section class="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-4 border">
      <h2 class="text-xl font-semibold text-gray-800 mb-2 flex items-center">
        <span class="mr-2">❤️</span> Why This Place is Perfect for You
      </h2>
      <p class="text-gray-700 leading-relaxed font-medium">[PERSONAL_CONNECTION]</p>
    </section>

    <!-- Special Notes -->
    <section class="bg-red-50 border border-red-200 rounded-lg p-4">
      <h2 class="text-xl font-semibold text-gray-800 mb-2 flex items-center">
        <span class="mr-2">⚠️</span> Important Notes
      </h2>
      <p class="text-gray-700">[SPECIAL_NOTES]</p>
    </section>
  </div>
</div>

PERSONALIZATION REQUIREMENTS:
- Address user by name in personalized greeting
- Reference user's country of origin, interests, and background where relevant
- Tailor recommendations based on user's specific profile
- Make connections between user's interests and destination features
- Use inclusive language that makes the user feel the content was created specifically for them
- Include practical advice relevant to user's background and nationality

INTEREST-BASED CONTENT RULES:
- Only include interest alignment section if the destination genuinely offers activities/experiences that match the specified visitor interests
- Be honest about limitations - not every place suits every interest
- When interest alignment is applicable, specifically mention the user's interest in the explanation
- Examples of interest categories: adventure sports, spiritual experiences, cultural immersion, nature photography, trekking, wildlife, historical exploration, local cuisine, traditional crafts
- Only claim interest alignment if specific, verifiable activities exist at the destination

STYLING GUIDELINES:
- Use consistent color scheme: blue/green for headers, gray for text, yellow for warnings, green for cultural content
- Include hover effects where appropriate: hover:shadow-md, hover:bg-gray-50
- Use proper spacing: space-y-6 for sections, mb-3 for headings, gap-4 for grids
- Make it mobile-responsive with sm:, md:, lg: prefixes
- Use semantic HTML elements: section, article, aside, header, etc.
- Include visual hierarchy with proper font sizes and weights

VERIFICATION REQUIREMENTS:
- Verify all prices, timings, and access information
- Confirm transportation options are current and available in Nepal
- Validate cultural and historical information
- Check entry fees and restrictions
- Ensure budget estimates reflect current rates
- Only mention transportation services that actually operate in Nepal

RESPONSE FORMAT:
Return only the HTML content with Tailwind classes - no JSON, no conversational text, just clean HTML that can be embedded directly into a website.
`;

const API_URL = "http://localhost:3000";

const CURRENCY_MAPPING = {
  USA: "USD",
  "United States": "USD",
  Canada: "CAD",
  UK: "GBP",
  "United Kingdom": "GBP",
  Australia: "AUD",
  India: "INR",
  Germany: "EUR",
  France: "EUR",
  Italy: "EUR",
  Spain: "EUR",
  Japan: "JPY",
  China: "CNY",
  "South Korea": "KRW",
  Singapore: "SGD",
  Thailand: "THB",
  Malaysia: "MYR",
  Philippines: "PHP",
  Indonesia: "IDR",
  Vietnam: "VND",
  Bangladesh: "BDT",
  Pakistan: "PKR",
  "Sri Lanka": "LKR",
};

function GuideDisplay({ data }) {
  if (!data) return null;

  if (typeof data === "string" && data.trim().startsWith("```html")) {
    const cleanedHtml = data
      .trim()
      .replace(/^```html/, "")
      .replace(/```$/, "")
      .trim();

    return (
      <div className="mt-6">
        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: cleanedHtml }}
        />
      </div>
    );
  }

  // Fallback for non-HTML responses
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <div className="text-red-600 font-semibold mb-2">
        Unexpected Response Format
      </div>
      <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto whitespace-pre-wrap">
        {typeof data === "string" ? data : JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

// Loading Component
function LoadingScreen({ searchProgress }) {
  return (
    // <div className="max-w-4xl mx-auto p-8 bg-gray-50 min-h-screen flex items-center justify-center">
    //   <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full"
    //    <img src="../logo.png">>
    //     <div className="mb-6">
    //       <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
    //       <h2 className="text-2xl font-bold text-gray-800 mb-2">
    //         🏔️ Creating Your Personal Nepal Guide
    //       </h2>
    //       <p className="text-gray-600 mb-4">
    //         We're crafting a personalized travel guide just for you...
    //       </p>
    //     </div>

    //     <div className="space-y-3">
    //       <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
    //         <div className="flex items-center justify-center">
    //           <div className="animate-pulse flex space-x-1">
    //             <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
    //             <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
    //             <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
    //           </div>
    //           <span className="text-blue-700 text-sm ml-3">
    //             {searchProgress || "Generating your personalized guide..."}
    //           </span>
    //         </div>
    //       </div>

    //       <div className="text-xs text-gray-500 space-y-1">
    //         <p>✓ Gathering current information</p>
    //         <p>✓ Personalizing content for you</p>
    //         <p>✓ Formatting beautiful HTML guide</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    //           <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center">
    //         <style>{`
    // @keyframes spin {
    //   0% { transform: rotate(0deg); }
    //   100% { transform: rotate(360deg); }
    // }
    // @keyframes pulse {
    //   0%, 100% { transform: scale(1); }
    //   50% { transform: scale(1.05); }
    // }
    // @keyframes float {
    //   0%, 100% { transform: translateY(0px); }
    //   50% { transform: translateY(-10px); }
    // }
    // @keyframes fadeIn {
    //   from { opacity: 0; transform: translateY(20px); }
    //   to { opacity: 1; transform: translateY(0); }
    // }
    // .animate-spin {
    //   animation: spin 2s linear infinite;
    // }
    // .animate-pulse {
    //   animation: pulse 2s ease-in-out infinite;
    // }
    // .animate-float {
    //   animation: float 3s ease-in-out infinite;
    // }
    // .animate-fade-in {
    //   animation: fadeIn 0.8s ease-out;
    // }
    // .!rounded-button {
    //   border-radius: 8px;
    // }
    // `}</style>
    //         <div className="text-center max-w-md mx-auto px-6">
    //           <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100 animate-fade-in">
    //             <div className="mb-8">
    //               <div className="relative w-20 h-20 mx-auto mb-6">
    //                 <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center animate-pulse">
    //                   <i className="fas fa-mountain text-white text-3xl animate-float"></i>
    //                 </div>
    //                 <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full animate-spin">
    //                   <div className="w-full h-full border-2 border-white border-t-transparent rounded-full"></div>
    //                 </div>
    //               </div>
    //               <h1 className="text-2xl font-bold text-gray-800 mb-2 animate-fade-in">
    //                 🏔️ Creating Your Personal Nepal Guide
    //               </h1>
    //               <p className="text-gray-600 mb-8 animate-fade-in">
    //                 We are crafting a personalized travel guide just for you...
    //               </p>
    //             </div>

    //             <div className="mb-8">
    //               <div className="flex items-center justify-center mb-4">
    //                 <div className="flex space-x-1">
    //                   <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
    //                   <div
    //                     className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
    //                     style={{ animationDelay: "0.2s" }}
    //                   ></div>
    //                   <div
    //                     className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
    //                     style={{ animationDelay: "0.4s" }}
    //                   ></div>
    //                 </div>
    //                 <span className="ml-3 text-blue-600 font-medium">
    //                   Generating personalized HTML content...
    //                 </span>
    //               </div>

    //               <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
    //                 <div className="space-y-3 text-sm text-left">
    //                   <div className="flex items-center space-x-2">
    //                     <i className="fas fa-check text-green-500"></i>
    //                     <span className="text-gray-700">
    //                       ✓ Gathering current information
    //                     </span>
    //                   </div>
    //                   <div className="flex items-center space-x-2">
    //                     <i className="fas fa-check text-green-500"></i>
    //                     <span className="text-gray-700">
    //                       ✓ Personalizing content for you
    //                     </span>
    //                   </div>
    //                   <div className="flex items-center space-x-2">
    //                     <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    //                     <span className="text-gray-700">
    //                       ⏳ Formatting beautiful HTML guide
    //                     </span>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>

    //             <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
    //               <div className="flex items-center space-x-1">
    //                 <i className="fas fa-shield-alt text-orange-500"></i>
    //                 <span>Secure</span>
    //               </div>
    //               <div className="flex items-center space-x-1">
    //                 <i className="fas fa-bolt text-orange-500"></i>
    //                 <span>Fast</span>
    //               </div>
    //               <div className="flex items-center space-x-1">
    //                 <i className="fas fa-heart text-orange-500"></i>
    //                 <span>Personalized</span>
    //               </div>
    //             </div>
    //           </div>

    //           <div className="mt-8 flex justify-center space-x-2">
    //             <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
    //             <div
    //               className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"
    //               style={{ animationDelay: "0.3s" }}
    //             ></div>
    //             <div
    //               className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"
    //               style={{ animationDelay: "0.6s" }}
    //             ></div>
    //           </div>
    //         </div>
    //       </div>

    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center">
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-spin {
          animation: spin 2s linear infinite;
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>

      <div className="text-center max-w-md mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100 animate-fade-in">
          <div className="mb-8">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center animate-pulse">
                <i className="fas fa-mountain text-white text-3xl animate-float"></i>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full animate-spin">
                <div className="w-full h-full border-2 border-white border-t-transparent rounded-full"></div>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2 animate-fade-in">
              🏔️ Creating Your Personal Nepal Guide
            </h1>
            <p className="text-gray-600 mb-8 animate-fade-in">
              We are crafting a personalized travel guide just for you...
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <div
                  className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
              <span className="ml-3 text-blue-600 font-medium">
                {searchProgress || "Generating personalized HTML content..."}
              </span>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="space-y-3 text-sm text-left">
                <div className="flex items-center space-x-2">
                  <i className="fas fa-check text-green-500"></i>
                  <span className="text-gray-700">
                    ✓ Gathering current information
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-check text-green-500"></i>
                  <span className="text-gray-700">
                    ✓ Personalizing content for you
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-gray-700">
                    ⏳ Formatting beautiful HTML guide
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <i className="fas fa-shield-alt text-orange-500"></i>
              <span>Secure</span>
            </div>
            <div className="flex items-center space-x-1">
              <i className="fas fa-bolt text-orange-500"></i>
              <span>Fast</span>
            </div>
            <div className="flex items-center space-x-1">
              <i className="fas fa-heart text-orange-500"></i>
              <span>Personalized</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-2">
          <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
          <div
            className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"
            style={{ animationDelay: "0.3s" }}
          ></div>
          <div
            className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"
            style={{ animationDelay: "0.6s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  const [user, setUser] = useState({ name: "", country: "" });
  const [userInterests, setUserInterests] = useState([]);
  const [response, setResponse] = useState("");
    const [showMap, setShowMap] = useState(false);

  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState("");
  const [searchProgress, setSearchProgress] = useState("Initializing...");
  const [useGoogleSearch] = useState(true);

  let navigate = useNavigate();
  const { state } = useLocation();

  // Handle case where state might be null (direct navigation)

  const { dest, currentLoca } = state;

  // Format current location for display
  const formatCurrentLocation = (location) => {
    if (typeof location === "string") {
      return location;
    }
    if (
      location &&
      typeof location === "object" &&
      location.lat &&
      location.lon
    ) {
      return `${location.lat.toFixed(4)}, ${location.lon.toFixed(4)}`;
    }
    return "Current Location";
  };

  const currentLocationDisplay = formatCurrentLocation(currentLoca);
  const currentLocationForAPI =
    typeof currentLoca === "string"
      ? currentLoca
      : `Coordinates: ${currentLoca.lat}, ${currentLoca.lon}`;

  //interest of user
  const [interest, setInterest] = useState([]);

  const token = localStorage.getItem("token");

  const userId = localStorage.getItem("id");
  const userInterest = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/preference/${userId}`
      );
      setInterest(res.data.interest);
      console.log(res.data.interest);
    } catch (err) {
      console.error("Failed to fetch interest:", err);
    }
  };

  const performGoogleSearch = async (searchQuery) => {
    const searchPayload = {
      contents: [
        {
          parts: [
            {
              text: `Search for current information about: ${searchQuery}. Provide recent, accurate details about entry fees, transportation options, operating hours, and current conditions. Focus on official and reliable sources.`,
            },
          ],
        },
      ],
      tools: [
        {
          googleSearchRetrieval: {
            searchQualities: ["HIGH_QUALITY"],
          },
        },
      ],
      generationConfig: {
        temperature: 0.3,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1500,
      },
    };

    try {
      const searchRes = await fetch(
        `${GEMINI_SEARCH_API_URL}?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(searchPayload),
        }
      );

      const searchData = await searchRes.json();
      if (
        searchRes.ok &&
        searchData?.candidates?.[0]?.content?.parts?.[0]?.text
      ) {
        return searchData.candidates[0].content.parts[0].text;
      }
      return null;
    } catch (err) {
      console.warn("Google Search failed:", err);
      return null;
    }
  };

  const generateGuide = async () => {
    setError("");
    setResponse("");
    setSearchProgress("Loading user information...");

    try {
      // Fetch user info first
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("id");

      // Fetch user info
      const userRes = await fetch(`${API_URL}/api/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = await userRes.json();
      setUser({ name: userData.name, country: userData.country });

      // Fetch user interests
      const intRes = await fetch(
        `http://localhost:3000/api/preference/${userId}`
      );
      const interestData = await intRes.json();
      const userInterestsList = interestData?.interest || [];
      setUserInterests(userInterestsList);
      setInterest(interestData?.interest || []);

      const interestsString =
        userInterestsList.length > 0
          ? userInterestsList.map((i) => i.interests || i).join(", ")
          : "general tourism";
      const userCurrency = CURRENCY_MAPPING[userData.country] || "USD";

      let searchResults = "";

      // Perform Google Search
      if (useGoogleSearch) {
        setSearchProgress("Searching for current information...");

        const searchQueries = [
          `${dest} Nepal entry fee 2024 2025 current prices`,
          `${dest} Nepal transportation how to reach 2024`,
          `${dest} Nepal visiting hours opening times current`,
          `${dest} Nepal travel guide recent information`,
        ];

        const searchPromises = searchQueries.map((query) =>
          performGoogleSearch(query)
        );
        const results = await Promise.all(searchPromises);

        searchResults = results.filter((result) => result).join("\n\n");
        setSearchProgress("Generating personalized HTML content...");
      }

      const enhancedPrompt = `${SYSTEM_PROMPT}

${
  searchResults
    ? `CURRENT SEARCH RESULTS FOR REFERENCE:
${searchResults}

Use this current information to verify and update details like entry fees, transportation options, and operating hours. Ensure all information is as current as possible.

`
    : ""
}CURRENT REQUEST CONTEXT:
- User Name: ${userData.name}
- User Country: ${userData.country}
- User Currency: ${userCurrency}
- User Interests: ${interestsString}
- Current Location: ${currentLocationForAPI}
- Desired Destination: ${dest}

Based on the above instructions${
        searchResults ? ", current search results," : ""
      } and HTML template, generate a complete HTML tourism guide for ${
        userData.name
      } from ${
        userData.country
      } who is currently in ${currentLocationForAPI} and wants to visit ${dest} in Nepal. Their interests include: ${interestsString}.

CRITICAL REQUIREMENTS:
1. Return ONLY HTML content with Tailwind CSS classes - no JSON, no conversational text
2. Convert all budget estimates to ${userCurrency} (${
        userData.country
      }'s currency)
3. Only mention transportation apps/services that actually operate in Nepal (e.g., Pathao for ride-sharing, NOT Uber)
4. Only include interest alignment section if ${dest} genuinely offers activities related to: ${interestsString}
5. If interest alignment is applicable, specifically mention the user's interests in the explanation
6. Use the provided HTML structure template with proper Tailwind styling
7. Make the content mobile-responsive and visually appealing
8. Include proper semantic HTML structure
${
  searchResults
    ? "9. Prioritize the current search results for up-to-date information on prices, hours, and access details"
    : ""
}
9. MANDATORY: The 'How to Reach from Your Location' section must always be present, with step-by-step, practical travel instructions from the user's current location to the destination.

Generate personalized HTML content that makes ${
        userData.name
      } feel this guide was created specifically for them as a ${
        userData.country
      } traveler interested in ${interestsString}.

Return only the HTML - no additional text or explanations.`;

      const payload = {
        contents: [
          {
            parts: [{ text: enhancedPrompt }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 4000,
        },
      };

      const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(
          "Failed to generate content. Please check your API key and try again."
        );
        setResponse(JSON.stringify(data, null, 2));
        setLoading(false);
        return;
      }

      const output =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response generated.";
      setResponse(output);
    } catch (err) {
      setError(
        "Network error occurred. Please check your connection and try again."
      );
      setResponse(
        `<div class="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 class="text-red-800 font-semibold mb-2">Error Generating Content</h3>
          <p class="text-red-600">Failed to fetch response from Gemini. Please check your API key and network connection.</p>
          <p class="text-red-500 text-sm mt-2">Details: ${
            typeof err === "object" && err !== null && "message" in err
              ? err.message
              : String(err)
          }</p>
        </div>`
      );
    } finally {
      setLoading(false);
      setSearchProgress("");
    }
  };

  // Auto-generate guide on component mount
  useEffect(() => {
    userInterest();
    generateGuide();

    if (!state || !state.dest || !state.currentLoca) {
      navigate("/"); // Redirect to home if no state
      return null;
    }
  }, []);

  //handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("role");

    navigate("/login");
  };

  // Function to copy HTML to clipboard
  const copyHtmlToClipboard = () => {
    if (
      response &&
      typeof response === "string" &&
      response.trim().startsWith("<")
    ) {
      navigator.clipboard
        .writeText(response)
        .then(() => {
          alert("HTML code copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  // Show loading screen while generating
  if (loading) {
    return <LoadingScreen searchProgress={searchProgress} />;
  }

  const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw', height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 1000
  },
  content: {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '80%',
    maxWidth: '800px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)'
  }
};


  const handleVirtualTour = () => {
    setShowMap(true); // set state to render the map
  };


  const handleClose = () => {
    setShowMap(false);
  };
  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 min-h-screen">
      {/* Header with logout */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Your Personal Nepal Guide
        </h2>
        {token && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        )}
      </div>

      {/* Trip Summary */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Trip Summary
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-600">From:</span>
            <span className="ml-2 text-gray-800">{currentLocationDisplay}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">To:</span>
            <span className="ml-2 text-gray-800">{dest}, Nepal</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Interests:</span>
            <span className="ml-2 text-gray-800">
              {interest.map((item) => item.interests).join(", ")}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Enhanced with:</span>
            <span className="ml-2 text-green-600">
              ✓ Current Google Search Data
            </span>
          </div>
          <div>
            
          <button onClick={handleVirtualTour} class="btn btn-success btn-lg">Virtual Tour</button>
           {showMap && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.content}>
            <button onClick={handleClose} style={{ float: 'right' }}>✖</button>
            <h2>Virtual Tour Map</h2>
            <MapComponent destination={dest}/>
          </div>
        </div>
      )}
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6">
          <div className="text-red-700 font-semibold">Error:</div>
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {response && (
        <div className="space-y-4">
          {/* Copy HTML Button */}
          {typeof response === "string" && response.trim().startsWith("<") && (
            <div className="flex justify-end">
              <button
                onClick={copyHtmlToClipboard}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 text-sm font-medium transition-colors"
              >
                📋 Copy HTML Code
              </button>
            </div>
          )}

          {/* Rendered HTML */}
          <GuideDisplay data={response} />
        </div>
      )}
    </div>
  );
}


