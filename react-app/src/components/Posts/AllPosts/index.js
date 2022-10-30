import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { getAllCommunitiesThunk, createCommunityThunk } from "../../../store/community"
import { createPost, getAllPosts } from "../../../store/post"
import "./AllPosts.css"

const AllPosts = () => {
    const dispatch = useDispatch()

    const posts = useSelector(state => state.posts.allPosts)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getAllPosts())
            .then(() => { setIsLoaded(true) })
    }, [dispatch])

    return isLoaded && (
        <>
            {posts &&
                <div>
                    {Object.values(posts).reverse().map(post => (
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

export default AllPosts
