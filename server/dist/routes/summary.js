"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const base_64_1 = __importDefault(require("base-64"));
const redis_1 = __importDefault(require("../lib/redis"));
const db_1 = __importDefault(require("../lib/db"));
const generateSummary_1 = require("../helpers/generateSummary");
const chunkAndSaveContent_1 = require("../helpers/chunkAndSaveContent");
const router = express_1.default.Router();
router.post("/check-summary", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url } = req.body;
        const userId = req.user.id;
        if (!url) {
            return res.status(400).json({
                message: "url not supplied",
                success: false
            });
        }
        const hashedUrl = base_64_1.default.encode(url);
        const isSummaryExists = yield db_1.default.summary.findFirst({
            where: {
                urlHash: hashedUrl,
                userId: userId
            }
        });
        if (!isSummaryExists) {
            return res.status(404).json({
                message: "Summary not found",
                found: false,
                success: false,
            });
        }
        const cachedSummary = isSummaryExists === null || isSummaryExists === void 0 ? void 0 : isSummaryExists.summary;
        return res.status(200).json({
            summary: cachedSummary,
            message: "summary found",
            found: true,
            success: true,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}));
router.post("/save-summary", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}));
router.post("/generate-summary", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { textContent, url } = req.body;
        const userSettings = (_a = req.body) === null || _a === void 0 ? void 0 : _a.settings;
        const user = req.user;
        const hashedUrl = base_64_1.default.encode(url);
        const { summarizedChunks } = yield (0, chunkAndSaveContent_1.chunkAndSaveContent)(textContent, hashedUrl);
        //  const summarizedChunks =  [
        //     'This guide, updated January 2nd, 2026, offers a step-by-step process for beginners to create a blog in approximately 20 minutes, requiring only basic computer skills. Authored by Scott Chow, who has been building blogs since 2002, it aims to help users avoid common mistakes.\n' +
        //       '\n' +
        //       'The process involves six key steps:\n' +
        //       '1.  **Pick a blog name:** Choose a descriptive name.\n' +
        //       '2.  **Get your blog online:** Register the blog and secure hosting.\n' +
        //       '3.  **Customize your blog:** Select and tweak a free design template.\n' +
        //       '4.  **Write & publish your first post:** Share initial content.\n' +
        //       '5.  **Promote your blog:** Market it to attract readers.\n' +
        //       '6.  **Make money blogging:** Explore monetization options.\n' +
        //       '\n' +
        //       'The guide addresses common misconceptions, stating that successful blogging does not require being a great writer or an expert. Instead, it emphasizes that people read blogs for personal perspectives and that the primary requirement for a successful blogger is a passion for their topic, as blogging is fundamentally about sharing knowledge.',
        //     'A blog is a type of website primarily focused on written content, known as blog posts, often presented from a personal perspective. It typically includes a comments section for reader interaction, fostering a direct connection and community.\n' +
        //       '\n' +
        //       'Key reasons for blogging include:\n' +
        //       '*   **Sharing knowledge and stories:** It provides a platform to express a voice, share experiences, and connect with others.\n' +
        //       '*   **Generating income:** Blogging can be a lucrative source of passive income, even for part-time bloggers.\n' +
        //       '*   **Gaining recognition:** A successful blog can establish the blogger as an expert in their field, potentially leading to opportunities like book deals.\n' +
        //       '*   **Building community:** It allows bloggers to connect with like-minded individuals, teach, and learn from their readers.\n' +
        //       '\n' +
        //       'A passion for the chosen topic is crucial for successful blogging, as it helps maintain reader interest and makes the process easier.',
        //     "Starting a blog offers benefits like connecting with like-minded people, building reader trust, and potential monetization. With the internet's current growth, now is an opportune time to begin.\n" +
        //       '\n' +
        //       `The first step is to choose a domain name, which is the blog's web address (e.g., MyNewBlog.com). Users can check if a preferred name is available. If a desired name is taken, alternatives include trying different domain extensions (.net, .org), adding small words (e.g., "a", "my", "the"), or using dashes between words (e.g., scott-chow.com). Domain names cannot contain spaces or punctuation other than dashes, and capitalization is ignored.\n` +
        //       '\n' +
        //       'If unsure about a blog name or topic, consider:\n' +
        //       '*   **Life experiences:** Share lessons learned from family, work, or significant life events (e.g., being a stay-at-home mom, dealing with clients, preparing for a wedding).\n' +
        //       '*   **A personal blog:** Cover a variety of topics about oneself, including daily activities and random thoughts.\n' +
        //       '*   **Hobbies & passions:** Focus on interests one is passionate about.',
        //     'To start a blog, choose a topic based on hobbies or passions like cooking, travel, or sports, noting that even niche topics can reach a global audience.\n' +
        //       '\n' +
        //       'Next, select a descriptive blog name, also known as a domain name. For specific topics, include relevant keywords (e.g., "food" for a cooking blog). For personal blogs covering various topics, use your name or a variation. The most preferred domain extension is .com, but .net, .org, or .co are also viable. Domain names cannot contain spaces.\n' +
        //       '\n' +
        //       'To get the blog online, three components are necessary:\n' +
        //       '1.  **Domain registration:** To claim and use your chosen domain name.\n' +
        //       '2.  **Blog hosting:** A service that stores blog files and delivers them to visitors.\n' +
        //       '3.  **Blogging software:** To build the blog, with WordPress being a popular, customizable, and easy-to-use option.\n' +
        //       '\n' +
        //       'These services are often bundled. BlueHost is recommended as a host that provides free domain registration and automatic WordPress installation.',
        //     'BlueHost offers web hosting services, including a free custom domain name, automatic WordPress installation, and reliable hosting recommended by WordPress since 2005. They host over 2 million sites, provide 24/7 customer service, and have a 30-day money-back guarantee.\n' +
        //       '\n' +
        //       'A special MLK Day Sale price of $1.99 per month is available through specific links by January 19th. The Blog Starter is compensated by BlueHost for purchases made through their links and offers free setup assistance to users.\n' +
        //       '\n' +
        //       'To set up a blog:\n' +
        //       '1.  Click a BlueHost link by January 19th to access the $1.99/month sale price.\n' +
        //       '2.  Select a plan; the Personal plan is recommended for beginners. All plans include a free domain, WordPress installation, hosting, and custom email addresses.\n' +
        //       '3.  Register a domain name, with an option for domain privacy protection. Users can also use an existing domain.\n' +
        //       `4.  Choose hosting package options. The discounted price is automatically applied. The 12-month package offers the lowest upfront cost, while the 36-month package provides the lowest per-month price ($1.99). It's recommended to remove "Professional Email" and "Sitelock Essentials" add-ons.\n` +
        //       '5.  After checkout, log in to the BlueHost account, then click "Edit site" to access the WordPress administrator dashboard.',
        //     'To customize a blog, first log into Bluehost.com using your domain name and password. From the Bluehost Portal, click the "WordPress" button to automatically log into your WordPress dashboard.\n' +
        //       '\n' +
        //       `In the WordPress dashboard, blog layouts are controlled by "Themes." To change your blog's design, navigate to the "Appearance" tab on the left menu. Several free themes, such as "Twenty Twenty-Four" and "Twenty Twenty-Five," are pre-installed. To activate one, hover over it and click "Activate."\n` +
        //       '\n' +
        //       `If you prefer a different design, you can choose from thousands of other free WordPress themes. Go to "Appearance" and then "Add New Theme." You can browse popular themes, and once you find one you like, hover over it, click "Install," and then "Activate" to apply it to your blog. Changing themes is the primary way to customize a WordPress blog's design.`,
        //     'To write and publish a new blog post in WordPress, navigate to "Posts" in the left menu. Delete the default post by clicking "Trash" and then click "Add New Post." Enter the title in the top box and the content in the lower box. Images can be added using the "+" icon, selecting "Image," and then "Upload." Once finished, click "Publish" on the top right.\n' +
        //       '\n' +
        //       'Blogs should feature two main content types: static and dynamic. Static content consists of pages that rarely change and are typically accessible via a menu. Essential static pages to include before launching a blog are:\n' +
        //       '*   **About Me (Us):** A biographical summary of the author(s) and a mission statement, explaining passion for the subject and goals.\n' +
        //       '*   **Contact Me (Us):** Provides visitors a way to reach the author, including physical address, phone, custom email, or a contact form, along with social media links.\n' +
        //       '*   **Disclaimer Page:** Required if monetizing the blog, as per FTC guidelines, to disclose income generation methods (e.g., product endorsements).',
        //     'Blogs require specific static pages for legal compliance and business functionality.\n' +
        //       '\n' +
        //       '**Required Static Pages:**\n' +
        //       '*   **Disclosure Page:** Mandated by FTC guidelines, this page must disclose any financial relationships (e.g., profiting from product endorsements or links).\n' +
        //       '*   **Privacy Policy Page:** Required if collecting visitor data, especially with Google Adsense or Analytics. It details data collection, usage, and sharing practices, complying with regulations like CCPA and GDPR. WordPress blogs often include this by default.\n' +
        //       '*   **Terms of Service Page:** Recommended for blogs running a store or selling services to limit potential liability.\n' +
        //       '\n' +
        //       'These pages are typically linked in the footer menu and must be visible and accessible from the homepage.\n' +
        //       '\n' +
        //       '**Optional Static Pages:**\n' +
        //       'Blogs can also include pages for advertising, donations, resources (links), or content submission, depending on their business model.\n' +
        //       '\n' +
        //       '**Dynamic Content (Blog Posts):**\n' +
        //       'This is the core content that engages visitors and builds a following.\n' +
        //       '*   **Regularity:** Content should be posted at specific, regular intervals (e.g., weekly) to build an audience.\n' +
        //       '*   **Quality:** Posts should be lengthy, informative, and engaging.\n' +
        //       '*   **Structure:**\n' +
        //       '    *   Use alluring titles to stimulate curiosity.\n' +
        //       '    *   Define the topic clearly in the first paragraph with a hook.\n' +
        //       '    *   Break up longer content into short paragraphs with spaces and use lists to improve readability.',
        //     'To create effective blog content, use short paragraphs, lists, standout quotes, images, and clear headings/sub-headings. Engage readers by posing questions in comments. Always ensure content and photos are original, avoiding plagiarism and using personal work or manipulated free images. Edit your work thoroughly to prevent grammatical and typographical errors.\n' +
        //       '\n' +
        //       'To publish a blog on WordPress, navigate to "Home" in the dashboard, click "Launch with confidence," and then "Launch your site" to remove the placeholder page.\n' +
        //       '\n' +
        //       'Promoting your blog is crucial for attracting visitors. Start by alerting your inner circle (family, friends, colleagues) and encouraging them to follow and mention your blog. Utilize major social media platforms like Facebook, Twitter, YouTube, Pinterest, and Instagram to post links to new content, share relevant news, engage with followers, and use hashtags.',
        //     "To increase blog traffic and engagement, bloggers should promote their content on social media platforms like Facebook and Twitter to leverage sharing and potential virality. Engaging with other blogs by leaving constructive comments and building relationships can also drive visitors. It's crucial to engage with one's own visitors by replying to comments and questions to encourage return visits. Collaborating with other bloggers through guest posting, cross-promotion, and regular interaction helps integrate into the blogging community. Posting content regularly, ideally at least once a week, is essential to maintain follower interest and growth. Creating an email list allows bloggers to notify subscribers of new content, fostering repeat visits and stronger relationships. Finally, optimizing the blog for search engines by submitting it to Google Search Console and Bing Webmaster Tools, and consistently adding informative content, helps improve visibility in search results over time.",
        //     'To improve search rankings for a new blog, content should include header tags (H1, H2, H3) for headings, be clearly categorized, and use "Post Name" permalinks in WordPress settings to ensure clean URLs. Tools like the Yoast WordPress plugin can also help.\n' +
        //       '\n' +
        //       'Monetizing a blog typically takes 6 months to a year to establish a steady income. Common methods include:\n' +
        //       '1.  **Selling advertising space:** Using platforms like Google AdSense to display ads.\n' +
        //       '2.  **Selling affiliate products:** Earning commissions when readers purchase products after clicking affiliate links, requiring disclosure.\n' +
        //       '3.  **Selling own products and services:** Directly offering personal goods or services to the audience.',
        //     "To monetize a blog, you can sell your own products and services, increasing their visibility using the blog's sidebar with visual images and links to a storefront. Digital downloads like ebooks, video tutorials, and e-courses are common, offering low overhead and no shipping costs. Another method is creating membership options, providing exclusive content such as unlimited digital downloads, free consultations, private networks/forums, or members-only content. The choice of monetization strategy depends on the blog's goals and purpose, as some methods like affiliate programs might divert traffic.\n" +
        //       '\n' +
        //       "For further assistance, the site offers a full guide to making money blogging, a more detailed version of steps via a menu, and specific tutorials on topics like adding custom logos, tracking visitors, moving WordPress sites, making websites with WordPress, social media sharing, choosing website builders, linking to other sites, changing text size/color, and making blogs private. Users can also contact the author for personalized advice or email questions if the FAQ section doesn't provide answers.",
        //     'The provided content lists common questions related to starting and managing a blog. These questions cover various aspects including what makes a blog successful, the requirements for writers to start a blog, choosing a blog topic and finding a profitable niche, naming a blog and addressing taken domain names, selecting a blogging platform (like WordPress), the costs involved, how bloggers make money, blogging frequency, and reasons why blogs might fail.'
        //   ];
        if (summarizedChunks.length == 0) {
            return res.status(500).json("Unable to summarize chunks");
        }
        const masterSummary = yield (0, generateSummary_1.generateMasterSummary)(summarizedChunks, userSettings);
        console.log("MASTER SUMMARY________", masterSummary);
        console.log("USERID________: ", user === null || user === void 0 ? void 0 : user.id);
        if (!masterSummary.content) {
            return res.status(500).json({
                message: "Summary cannot be created",
                success: false,
            });
        }
        console.log("USERID: ", user === null || user === void 0 ? void 0 : user.id);
        const response = yield db_1.default.summary.upsert({
            where: {
                userId_urlHash: {
                    userId: user.id,
                    urlHash: hashedUrl
                },
            },
            update: {
                summary: masterSummary.content,
                url: url
            },
            create: {
                urlHash: hashedUrl,
                url: url,
                summary: masterSummary.content,
                userId: user.id,
            }
        });
        // Intializing chat 
        const key = `chat:${user.id}:${hashedUrl}`;
        const chat = {
            messages: []
        };
        const redis = yield (0, redis_1.default)();
        if (redis) {
            yield redis.set(key, JSON.stringify(chat), {
                EX: 1 * 60 * 60 // 1 hour
            });
        }
        return res.status(200).json({
            message: "Generated summary successfully",
            aiResp: masterSummary.content,
            success: true
        });
    }
    catch (err) {
        console.log("🔴 Error: ", err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err
        });
    }
}));
exports.default = router;
