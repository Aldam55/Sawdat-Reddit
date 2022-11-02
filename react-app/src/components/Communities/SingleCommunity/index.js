import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { deleteCommunityThunk, getSingleCommunityThunk } from "../../../store/community";
import CommunityPosts from "../../Posts/CommunityPosts";
import cake from "../../../assets/birthday-cake.png"
import banner from "../../../assets/sawdat-error-image.jpg"
import icon from "../../../assets/icon.png"
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
    const bannerErrorHandler = (e) => {
        e.currentTarget.src = banner
    }
    const iconErrorHandler = (e) => {
        e.currentTarget.src = icon
    }

    useEffect(() => {
        dispatch(getSingleCommunityThunk(communityId))
            .then(() => { setIsLoaded(true) })
    }, [dispatch, communityId])

    return isLoaded && (
        <>
            {community.id &&
                <div className="single-community-container">
                    <img className="single-community-banner" src={community.banner_url} alt='banner' onError={bannerErrorHandler} />
                    <div className="single-community-header">
                        <div className="single-community-header-container">
                            <div className="community-header-content">
                                <img src={community.icon_url} alt='icon' id="single-community-icon" onError={iconErrorHandler}/>
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
                                <div id='single-community-about-content'>
                                    <div id='single-community-about-body'>{community.about}</div>
                                </div>
                                <div id='single-community-date-container'>
                                    <img src={cake} id="cake-icon" />
                                    <div id='single-community-date'>
                                        Created {new Date(community.created_at).toString().slice(4, 15)}
                                    </div>
                                </div>
                                <div id='just-for-center'>
                                    <div id='border-placeholder'></div>
                                </div>
                                <div className="single-communities-padding">
                                    <div id='single-community-create-post'>
                                        {user && (
                                            <>
                                                <NavLink to={`/communities/${communityId}/createpost`} id='all-communities'>
                                                    Create a Post
                                                </NavLink>
                                            </>
                                        )}
                                        {!user && (
                                            <>
                                                <NavLink to='/login' id='all-communities'>Create a Post</NavLink>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div id='just-for-center'>
                                    <div id='border-placeholder'></div>
                                </div>
                                <div>
                                    <div>
                                        {user && user.id === community.user_id && (
                                            <>
                                                <div>
                                                    <button onClick={updateRedirect} id='edit-community-button'>Edit Community</button>
                                                </div>
                                                <div>
                                                    <button onClick={deleteHandler} id='delete-community-button'>Delete Community</button>
                                                </div>
                                            </>
                                        )}
                                    </div>
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
