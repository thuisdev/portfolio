const { createBlog } = require('../db/blogQueries')
const { createUser } = require('../db/userQueries')
const { hashPassword } = require('../utils/passwordUtils')
const adminUsername = process.env.ADMIN_USERNAME || 'admin'
const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com'
const adminName = process.env.ADMIN_NAME || 'Admin User'

const seedDb = async () => {
    // Passwörter hashen
    const hashedAdminPw = await hashPassword(adminPassword);
    const hashedUserPw = await hashPassword('user123');

    // Admin User
    const admin = await createUser(
        adminUsername,
        adminName,
        adminEmail,
        hashedAdminPw,
        "admin"
    );

    // Regular User
    const regularUser = await createUser(
        "testuser",
        "Test User",
        "user@example.com",
        hashedUserPw,
        "user"
    );

    // Blogs
    await createBlog(
        "Getting Started with Web3",
        "Web3 represents the next evolution of the internet. Built on blockchain technology...",
        "An introduction to Web3 and why it matters for developers.",
        "https://picsum.photos/800/400?random=1",
        admin[0].user_id
    );

    await createBlog(
        "Understanding PostgreSQL",
        "Relational databases are the backbone of most web applications...",
        "A beginner friendly guide to PostgreSQL.",
        "https://picsum.photos/800/400?random=2",
        admin[0].user_id
    );

    await createBlog(
        "React vs Vanilla JS",
        "React is powerful but not always necessary...",
        "A practical comparison of React and vanilla JavaScript.",
        "https://picsum.photos/800/400?random=3",
        regularUser[0].user_id
    );

    await createBlog(
        "Building REST APIs with Express",
        "Express is one of the most popular Node.js frameworks...",
        "A practical guide to building REST APIs.",
        "https://picsum.photos/800/400?random=4",
        regularUser[0].user_id
    );

    await createBlog(
        "CSS vs Tailwind",
        "Tailwind CSS has taken the frontend world by storm...",
        "Comparing traditional CSS with utility-first Tailwind.",
        "https://picsum.photos/800/400?random=5",
        admin[0].user_id
    );

    console.log("✅ Database seeded successfully!")
    console.log(`Admin user: ${adminUsername}`)
    console.log("Regular user: testuser / user123")
}

seedDb();