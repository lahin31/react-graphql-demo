import { gql } from '@apollo/client'

const getUsersQuery = gql`
	query GetUsers {
		users {
			id
			name
		}
	}
`;

const getPostsQuery = gql`
	query GetPosts {
		posts {
			id
			title
			description
			user {
				name
			}
		}
	}
`;

const addPostMutation = gql`
	mutation AddPost($title: String!, $description: String!, $userId: ID!) {
		addPost(title: $title, description: $description, userId: $userId) {
			title
			id
		}
	}
`;

const deletePostMutation = gql`
	mutation DeletePost($postId: ID!) {
		deletePost(postId: $postId) {
			id
			title
		}
	}
`;

export { 
	getUsersQuery,
	getPostsQuery, 
	addPostMutation,
	deletePostMutation
}

