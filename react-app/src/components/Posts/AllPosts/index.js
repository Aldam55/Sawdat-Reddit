import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useHistory } from "react-router-dom"
import { getAllCommunitiesThunk, createCommunityThunk } from "../../../store/community"
import { createPost, getAllPosts, removePost } from "../../../store/post"
import viewcommunities from "../../../assets/viewcommunities.png"
import icon from "../../../assets/icon.png"
import "./AllPosts.css"

const AllPosts = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    let deletePostHandler

    const user = useSelector(state => state.session.user)
    const posts = useSelector(state => state.posts.allPosts)
    const communities = useSelector(state => state.communities.allCommunities)
    const [isLoaded, setIsLoaded] = useState(false)
    const postsArr = Object?.values(posts)

    const iconErrorHandler = (e) => {
        e.currentTarget.src = icon
    }

    useEffect(() => {
        dispatch(getAllPosts())
        dispatch(getAllCommunitiesThunk())
            .then(() => { setIsLoaded(true) })
    }, [dispatch, postsArr.length])

    return isLoaded && (
        <>
            {posts &&
                <div className="home-page-container">
                    <div className="individual-post-container">
                        {Object.values(posts).reverse().map(post => (
                            <div key={post.id} id='individual-post'>
                                <div id='post-votes'>votes</div>
                                <div>
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
                            </div>
                        ))}
                    </div>
                    <div className="homepage-community-buttons">
                        <div className="homepage-communities-container">
                            <img className="some-communities-background" src={viewcommunities} />
                            <div className='communities-holder'>
                                {Object.values(communities).reverse().slice(0, 5).map(community => (
                                    <div className="newest-communities">
                                        <NavLink to={`/communities/${community.id}`} id="newest-communities-link">
                                            <div className="newest-community-container">
                                                <img src={`${community.icon_url}`} id='newest-community-icon' onError={iconErrorHandler}/>
                                                <div>
                                                    {community.name}
                                                </div>
                                            </div>
                                        </NavLink>
                                    </div>
                                ))}
                            </div>
                            <div className="all-communities-padding">
                            <NavLink to={`/communities`} id='all-communities'>
                                <div id='view-all-communities-button'>
                                    View All
                                </div>
                            </NavLink>
                            </div>
                        </div>
                        {user && (
                            <div className='homepage-create-buttons'>
                                <NavLink to={`/communities/create`} id='create-community'>
                                    <div id='create-community-button'>
                                        Create Community
                                    </div>
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div>
            }
        </>
    )
}

export default AllPosts
