const {pool} = require ("./dbconn");

// Get Blogs Data
const getAllBlogs = async () => {
    const queryText =   `
    SELECT * 
    FROM Blog`
    
    const blogs = await pool.query(queryText);
    return blogs.rows
};

// Get Blog ID
const getBlogById = async(id) => {
    const queryText = `
    SELECT * FROM Blog 
    WHERE blog_id = $1`

    const blog = await pool.query(queryText, [id])
    return blog.rows
}


// Create Blog
const createBlog = async(title, content, blogPrvText, blogImgSrc, userId) => {
    const queryText =   `
    INSERT INTO Blog (title, content, blog_prv_text, blog_img_src, user_id) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *`

    const blog = await pool.query(queryText, [title, content, blogPrvText, blogImgSrc, userId])
    return blog.rows

};

// Update Blog by id
const updateBlogById = async(title, content, blogPrvText, blogImgSrc, blogId) => {
    const queryText = `
    UPDATE Blog SET title = $1, content = $2, blog_prv_text = $3, blog_img_src = $4
    WHERE blog_id = $5
    RETURNING *`
        const blog = await pool.query(queryText, [title, content, blogPrvText, blogImgSrc, blogId])
        return blog.rows
}

// Delete Blog by id
const deleteBlogById = async (blogId) => {
    const queryText = 
    `DELETE FROM Blog 
    WHERE blog_id = $1
    RETURNING *`
        const blog = await pool.query(queryText, [blogId])
        return blog.rows
} 


module.exports = { getAllBlogs, createBlog, getBlogById, updateBlogById, deleteBlogById }