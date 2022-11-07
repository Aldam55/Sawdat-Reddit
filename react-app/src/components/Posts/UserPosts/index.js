import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getUserPosts } from "../../../store/post";
import icon from "../../../assets/icon.png"
import "./UserPosts.css"

const UserPosts = () => {
    const dispatch = useDispatch()
    const history = useHistory

    const user = useSelector(state => state.session.user)
    const posts = useSelector(state => state.posts.user)
    const communities = useSelector(state => state.communities.allCommunities)

    const iconErrorHandler = (e) => {
        e.currentTarget.src = icon
    }

    useEffect(() => {
        dispatch(getUserPosts())
    }, [dispatch])

    if(posts === undefined || !Object.values(posts).length){
        return(
            <div id="no-posts-message">You haven't created any posts yet!</div>
        )
    } else {
        return (
            <div>
                <h1>Placeholder text for user posts</h1>
            </div>
        )
    }
}
