import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams, useHistory } from "react-router-dom"
import { getCommunityPosts, createPost, removePost } from "../../../store/post"
import "./CommunityPosts.css"

const CommunityPosts = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { communityId } = useParams()
    let deletePostHandler

    const user = useSelector(state => state.session.user)
    const posts = useSelector(state => state.posts.community)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getCommunityPosts(communityId))
            .then(() => { setIsLoaded(true) })
    }, [dispatch, communityId])

    return isLoaded && (
        <>
            {posts &&
                <div className="individual-post-container">
                    {Object.values(posts).reverse().map(post => (
                        <div key={post.id} id='individual-post'>
                            <div id='post-votes'></div>
                            <div>
                                <div>
                                    <div id='post-header'>
                                        <div id='post-username'>Posted by {post.Owner.username}</div>
                                    </div>
                                    <div id='home-page-post-title'>{post.title}</div>
                                    <div id='home-page-description'>{post.description}</div>
                                </div>
                                <div className="post-buttons">
                                    {/* <div id='post-comments-button'>Comments</div> */}
                                    {(user && user.id === post.user_id) && (
                                        <>
                                            <NavLink to={`/posts/${post.id}/edit`} id='edit-post-button'>Edit Post</NavLink>
                                            {deletePostHandler = async () => {
                                                if (window.confirm('Are you sure you want to delete your post?')) {
                                                    await dispatch(removePost(post.id))
                                                    history.push(`/communities/${post.community_id}`)
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
                // <div>
                //     {Object.values(posts).map(post => (
                //         <div key={post.id}>
                //             <div>
                //                 <div>{post.title}</div>
                //                 <div>{post.description}</div>
                //             </div>
                //             {(user && user.id === post.user_id) && (
                //                 <>
                //                     <div>
                //                         <NavLink to={`/posts/${post.id}/edit`}>Edit Post</NavLink>
                //                         {deletePostHandler = async () => {
                //                             if (window.confirm('Are you sure you want to delete your post?')) {
                //                                 await dispatch(removePost(post.id))
                //                                 history.push(`/communities/${communityId}`)
                //                             } else {
                //                                 history.push(`/communities/${communityId}`)
                //                             }
                //                         }}
                //                         <button onClick={deletePostHandler}>
                //                             Delete Post
                //                         </button>
                //                     </div>
                //                 </>
                //             )}
                //         </div>
                //     ))}
                // </div>
            }
        </>
    )
}

export default CommunityPosts
