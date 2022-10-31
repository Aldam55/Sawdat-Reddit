import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useHistory } from "react-router-dom"
import { getAllCommunitiesThunk, createCommunityThunk } from "../../../store/community"
import { createPost, getAllPosts, removePost } from "../../../store/post"
import "./AllPosts.css"

const AllPosts = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    let deletePostHandler

    const user = useSelector(state => state.session.user)
    const posts = useSelector(state => state.posts.allPosts)
    const [isLoaded, setIsLoaded] = useState(false)
    const postsArr = Object?.values(posts)

    useEffect(() => {
        dispatch(getAllPosts())
            .then(() => { setIsLoaded(true) })
    }, [dispatch, postsArr.length])

    return isLoaded && (
        <>
            {posts &&
                <div className="home-page-container">
                    <div className="individual-post-container">
                        {Object.values(posts).reverse().map(post => (
                            <div key={post.id} id='individual-post'>
                                <div>
                                    <div id='post-header'>
                                        <img src={post.Community.icon_url} id='post-community-icon'></img>
                                        <NavLink to={`/communities/${post.Community.id}`} id='post-community-name'>{post.Community.name}</NavLink>
                                        <span id='post-dot'>•</span>
                                        <div id='post-username'>Posted by {post.Owner.username}</div>
                                    </div>
                                    <div id='home-page-post-title'>{post.title}</div>
                                    <div id='home-page-description'>{post.description}</div>
                                </div>
                                <div className="post-buttons">
                                    <div id='post-comments-button'>Comments</div>
                                    {(user && user.id === post.user_id) && (
                                        <>
                                                <NavLink to={`/posts/${post.id}/edit`} id='edit-post-button'>Edit Post</NavLink>
                                            {deletePostHandler = async () => {
                                                if (window.confirm('Are you sure you want to delete your post?')) {
                                                    await dispatch(removePost(post.id))
                                                    history.push(`/`)
                                                } else {
                                                    history.push(`/`)
                                                }
                                            }}
                                            <div onClick={deletePostHandler} id='delete-post-button'>
                                                Delete Post
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <div>
                            <NavLink to={`/communities`}>
                                <div id='view-all-communities-button'>
                                    View All Communities
                                </div>
                            </NavLink>
                        </div>
                        <div>
                            <NavLink to={`/communities/create`}>
                                <div id='create-community-button'>
                                    Create Community
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default AllPosts
