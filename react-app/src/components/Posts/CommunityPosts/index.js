import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams } from "react-router-dom"
import { getCommunityPosts, createPost } from "../../../store/post"
import "./CommunityPosts.css"

const CommunityPosts = () => {
    const dispatch = useDispatch()
    const {communityId} = useParams()

    const posts = useSelector(state => state.posts.community)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getCommunityPosts(communityId))
            .then(() => {setIsLoaded(true)})
    }, [dispatch, communityId])

    return isLoaded && (
        <>
        {posts &&
        <div>
            {Object.values(posts).map(post=> (
                <div key={post.id}>
                    <div>
                        <div>{post.title}</div>
                        <div>{post.description}</div>
                    </div>
                </div>
            ))}
        </div>
        }
        </>
    )
}

export default CommunityPosts
