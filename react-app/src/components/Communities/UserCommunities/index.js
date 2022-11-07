import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useHistory } from "react-router-dom"
import { getUserCommunityThunk } from "../../../store/community"
import icon from "../../../assets/icon.png"
import "./UserCommunities.css"

const UserCommunities = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.session.user)
    const communities = useSelector(state => state.communities.allCommunities)
    const userCommunities = Object.values(communities).filter(community => community.user_id === user.id)

    const iconErrorHandler = (e) => {
        e.currentTarget.src = icon
    }

    useEffect(() => {
        dispatch(getUserCommunityThunk())
    }, [dispatch])

    if (userCommunities === undefined || !Object.values(userCommunities).length){
        return <div id='no-communities-message'>You don't own any communities!</div>
    } else return (
        <>
        <div>
            Placeholder text for current user communities.
        </div>
        </>
    )
}

export default UserCommunities
