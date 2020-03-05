const postService = require('../service/post.service');


const getPosts = async (req, res) => {
      try {
        const result = await postService.getPosts({});
            return res.status(200).send(result);
          } catch (e) {
            console.log(e);
            return res.sendStatus(400);
          } 
}

const createPost = async (req, res) => {
  const post = req.body;
      try {
        const created = await postService.create(post);
            return res.status(200).send(created);
          } catch (e) {
            console.log(e);
            return res.sendStatus(400);
          } 
}

const getPostById = async (req,res) => {
  const id = req.params.id;
  try {
    const post = await postService.getPostById(id);
    return res.status(200).send(post);
  } catch (e) {
    return res.sendStatus(400);
  }
}

const updatePost = async (req,res) => {
  const post = req.body;
  try { 
    const replaced = await postService.update(post);
    if (!replaced || !replaced.ok || !replaced.n) {
      return res.sendStatus(404);
    }
    return res.sendStatus(200);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
} 

module.exports =  { createPost, getPosts, getPostById,  updatePost };
