import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getUsersQuery, getPostsQuery, addPostMutation } from '../queries/queries'
import './AddPost.css';

const AddPost = () => {
	const { data } = useQuery(getUsersQuery);
	const [title, setTitle] = useState('');
	const [selectedUser, setSelectedUser] = useState('');
	const [description, setDescription] = useState('');
	const [addPost] = useMutation(addPostMutation);
	const { users } = data || [];

	const addPostHandler = e => {
		e.preventDefault();
		addPost({
			variables: { title, description, userId: selectedUser },
			refetchQueries: [{ query: getPostsQuery }]
		});
		setTitle('');
		setDescription('');
		setSelectedUser('');
	}

	return (
		<div className="add_post_wrapper">
			<form onSubmit={addPostHandler}>
				<input 
					type="text" 
					placeholder="Title" 
					value={title} 
					onChange={e => setTitle(e.target.value)} 
				/>
				<textarea 
					cols="30" 
					rows="5"
					value={description}
					onChange={e => setDescription(e.target.value)}
				></textarea>
				<select className="users_list_select" onChange={e => setSelectedUser(e.target.value)}>
					{users && users.map(user => {
						return <option key={user.id} value={user.id}>{user.name}</option>
					})}
				</select>
				<button className="post_btn">Post</button>
			</form>
		</div>
	)
}

export default AddPost;