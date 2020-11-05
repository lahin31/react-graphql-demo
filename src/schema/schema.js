const graphql = require("graphql");
const Post = require("../models/post");
const User = require("../models/user");
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull
} = graphql;

const PostType = new GraphQLObjectType({
	name: "Post",
	fields: () => ({
		id: { 
			type: GraphQLID 
		},
		title: { 
			type: GraphQLString 
		},
		description: { 
			type: GraphQLString 
		},
		userId: {
			type: GraphQLID
		},
		user: {
			type: UserType,
			resolve({ userId }, args) {
				return User.findById(userId);
			}
		}
	})
});

const UserType = new GraphQLObjectType({
	name: "User",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		posts: {
			type: new GraphQLList(PostType),
			resolve({ id }, args) {
				return Post.find({
					userId: id
				})
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		post: {
			type: PostType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Post.findById(args.id);
			}
		},
		posts: {
			type: new GraphQLList(PostType),
			resolve(parent, args) {
				return Post.find({});
			}
		},
		user: {
			type: UserType,
			args: { userId: { type: GraphQLID }},
			resolve(parent, { userId }) {
				return User.findById(userId);
			}
		},
		users: {
			type: new GraphQLList(UserType),
			resolve(parent, args) {
				return User.find({});
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addUser: {
			type: UserType,
			args: {
				name: {
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve(parent, { name }) {
				let user = new User({ name });
				return user.save();
			}
		},
		addPost: {
			type: PostType,
			args: {
				title: { 
					type: new GraphQLNonNull(GraphQLString) 
				},
				description: { 
					type: new GraphQLNonNull(GraphQLString) 
				},
				userId: {
					type: new GraphQLNonNull(GraphQLID)
				}
			},
			resolve(parent, { title, description, userId }) {
				const post = new Post({
					title,
					description,
					userId
				});
				return post.save();
			}
		},
		deletePost: {
			type: PostType,
			args: {
				postId: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, { postId }) {
				return Post.deleteOne({ _id: postId });
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});