DROP TABLE IF EXISTS Blog CASCADE;
DROP TABLE IF EXISTS Users CASCADE;

-- Users Table
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Blogs Table
CREATE TABLE Blog (
    blog_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    blog_prv_text VARCHAR(500),
    blog_img_src VARCHAR(500),
    user_id INT REFERENCES Users(user_id),
    created_at TIMESTAMP DEFAULT NOW()
);