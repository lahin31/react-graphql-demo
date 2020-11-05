import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { getPostsQuery, deletePostMutation } from '../queries/queries'
import './Posts.css'

const Posts = () => {
	const { loading, data } = useQuery(getPostsQuery);
	const [deletePost] = useMutation(deletePostMutation);
	const { posts } = data || {};

	const handleDelete = postId => {
		deletePost({
			variables: { postId },
			refetchQueries: [{ query: getPostsQuery }]
		});
	}

	return (
		<div className="posts_wrapper">
			{ loading ? <span>Loading...</span> : <>
				{ posts && posts.map(post => {
					return <div className="post" key={post.id}>
						<div className="post_title">
							<h2>{ post.title }<span className="dlt_btn" onClick={() => handleDelete(post.id)}>Delete</span></h2>
							<span style={{ color: "gray" }}>by { post.user.name }</span>
						</div>
						<div className="post_description">
							<p>{ post.description }</p>
						</div>
					</div>
				})}
			</> }
		</div>
	)
}

export default Posts;