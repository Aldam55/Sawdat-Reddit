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
                <div>
                    {Object.values(posts).map(post => (
                        <div key={post.id}>
                            <div>
                                <div>{post.title}</div>
                                <div>{post.description}</div>
                            </div>
                            {(user && user.id === post.user_id) && (
                                <>
                                    <div>
                                        <NavLink to={`/posts/${post.id}/edit`}>Edit Post</NavLink>
                                        {deletePostHandler = async () => {
                                            if (window.confirm('Are you sure you want to delete your post?')) {
                                                await dispatch(removePost(post.id))
                                                history.push(`/communities/${communityId}`)
                                            } else {
                                                history.push(`/communities/${communityId}`)
                                            }
                                        }}
                                        <button onClick={deletePostHandler}>
                                            Delete Post
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            }
        </>
    )
}

export default CommunityPosts
