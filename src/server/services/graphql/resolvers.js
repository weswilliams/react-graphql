import logger from '../../helpers/logger';



export default function resolver() {
  logger.log({ level: 'info', message: 'create resolver' });
  const { db } = this;
  const { Post, User } = db.models;
  const resolvers = {
    RootQuery: {
      posts(root, args, context) {
        logger.log({ level: 'info', message: 'query posts' });
        return Post.findAll({ order: [['createdAt', 'DESC']] });
      },
    },
    RootMutation: {
      addPost(root, { post }, context) {
        logger.log({ level: 'info', message: 'Post was created', });

        return User.findAll().then((users) => {
          const usersRow = users[0];

          return Post.create({
            ...post,
          }).then((newPost) => {
            return Promise.all([
              newPost.setUser(usersRow.id),
            ]).then(() => {
              return newPost;
            });
          });
        });
      },
    },
    Post: {
      user(post, args, context) {
        return post.getUser();
      },
    },
  };
  return resolvers;
}
