const posts = [];

// Controller for creating a post
exports.createPost = (req, res) => {
    const post = req.body;
    posts.push(post);
    return res.status(201).json(post);
};

// Controller for getting all posts
exports.getAllPosts = (req, res) => {
    return res.status(200).json(posts);
};

// Controller for getting user posts
exports.getUserPosts = (req, res) => {
    const userId = req.params.userId;
    const userPosts = posts.filter(post => post.userId === userId);
    return res.status(200).json(userPosts);
};

// Controller for toggling likes
exports.toggleLike = (req, res) => {
    const postId = req.params.postId;
    const post = posts.find(post => post.id === postId);
    if (post) {
        post.likes = post.likes ? post.likes + 1 : 1;
        return res.status(200).json(post);
    }
    return res.status(404).json({ message: 'Post not found' });
};

// Controller for deleting a post
exports.deletePost = (req, res) => {
    const postId = req.params.postId;
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex >= 0) {
        posts.splice(postIndex, 1);
        return res.status(204).send();
    }
    return res.status(404).json({ message: 'Post not found' });
};

// Controller for adding comments
exports.addComment = (req, res) => {
    const postId = req.params.postId;
    const post = posts.find(post => post.id === postId);
    if (post) {
        const comment = req.body.comment;
        post.comments = post.comments || [];
        post.comments.push(comment);
        return res.status(201).json(post);
    }
    return res.status(404).json({ message: 'Post not found' });
};