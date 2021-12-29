import Router from 'express-promise-router';
import httpErrors from 'http-errors';

import { Comment, Post } from '../../models';

const router = Router();

let posts = [];
(async () => {
  posts = await Post.findAll();
})();

router.get('/posts', async (req, res) => {
  const postList = posts.slice(req.query.offset, req.query.offset + req.query.limit);

  return res.status(200).type('application/json').send(postList);
});

router.get('/posts/:postId', async (req, res) => {
  const post = await Post.findByPk(req.params.postId);

  if (post === null) {
    throw new httpErrors.NotFound();
  }

  return res.status(200).type('application/json').send(post);
});

router.get('/posts/:postId/comments', async (req, res) => {
  const posts = await Comment.findAll({
    limit: req.query.limit,
    offset: req.query.offset,
    where: {
      postId: req.params.postId,
    },
  });

  return res.status(200).type('application/json').send(posts);
});

router.post('/posts', async (req, res) => {
  if (req.session.userId === undefined) {
    throw new httpErrors.Unauthorized();
  }

  const post = await Post.create(
    {
      ...req.body,
      userId: req.session.userId,
    },
    {
      include: [
        {
          association: 'images',
          through: { attributes: [] },
        },
        { association: 'movie' },
        { association: 'sound' },
      ],
    },
  );

  posts = [post, ...posts];

  return res.status(200).type('application/json').send(post);
});

export { router as postRouter };
