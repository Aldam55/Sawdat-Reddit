import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { deleteCommunityThunk, getSingleCommunityThunk } from "../../../store/community";
import CommunityPosts from "../../Posts/CommunityPosts";
import "./SingleCommunity.css"

const SingleCommunity = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { communityId } = useParams()

    const community = useSelector(state => state.communities.singleCommunity)
    const user = useSelector(state => state.session.user)
    const [isLoaded, setIsLoaded] = useState(false)

    const updateRedirect = () => {
        history.push(`/communities/${communityId}/updatecommunity`)
    }
    const deleteHandler = async () => {
        if (window.confirm("Are you sure you want to delete your community?")) {
            await dispatch(deleteCommunityThunk(communityId))
            history.push('/communities')
        } else {
            history.push(`/communities/${communityId}`)
        }
    }

    useEffect(() => {
        dispatch(getSingleCommunityThunk(communityId))
            .then(() => { setIsLoaded(true) })
    }, [dispatch, communityId])

    return isLoaded && (
        <>
            {community.id &&
                <div>
                    <div>
                        {community.name}
                        {user && user.id === community.user_id && (
                            <>
                                <div>
                                    <button onClick={updateRedirect}>Edit Community</button>
                                </div>
                                <div>
                                    <button onClick={deleteHandler}>Delete Community</button>
                                </div>
                            </>
                        )}
                    </div>
                    {user && user.id !== community.user_id && (
                        <>
                            <NavLink to={`/communities/${communityId}/createpost`}>
                                Create a Post
                            </NavLink>
                        </>
                    )}
                    <div>
                        {community.about}
                    </div>
                    <img src={community.banner_url} alt='banner'></img>
                    <img src={community.icon_url} alt='icon'></img>
                    <div>
                        <CommunityPosts></CommunityPosts>
                    </div>
                </div>
            }
        </>
    )
}

export default SingleCommunity
