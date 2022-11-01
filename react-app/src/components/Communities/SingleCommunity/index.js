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

    // MAKE onError() HANDLER FOR IMAGES

    useEffect(() => {
        dispatch(getSingleCommunityThunk(communityId))
            .then(() => { setIsLoaded(true) })
    }, [dispatch, communityId])

    return isLoaded && (
        <>
            {community.id &&
                <div className="single-community-container">
                    <img className="single-community-banner" src={community.banner_url} alt='banner' />
                    <div className="single-community-header">
                        <div className="single-community-header-container">
                            <div className="community-header-content">
                                <img src={community.icon_url} alt='icon' id="single-community-icon" />
                                <div id='single-community-header-text'>
                                    <h1 id='single-community-title'>
                                        {community.name}
                                    </h1>
                                </div>
                            </div>
                            <div id='single-community-tabs'>
                                <div id='tabs-posts'>Posts</div>
                                <div>
                                    <NavLink to={`/communities`} id='tabs-communities'>
                                        Other Communities
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="single-community-content-container">
                        <div><CommunityPosts></CommunityPosts></div>
                        <div className="single-community-button-container">
                            <div className="single-community-about-container">
                                <div id="single-community-about-header">
                                    <div id='about-community'>
                                        About community
                                    </div>
                                </div>
                                <div id='single-community-about-body'>
                                    {community.about}
                                </div>
                            </div>
                            <div>
                                <div>
                                    {community.name}
                                </div>
                                <div>
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
                                <div>
                                    {user && user.id !== community.user_id && (
                                        <>
                                            <NavLink to={`/communities/${communityId}/createpost`}>
                                                Create a Post
                                            </NavLink>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default SingleCommunity
