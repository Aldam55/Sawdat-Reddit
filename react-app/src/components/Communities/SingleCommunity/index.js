import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getSingleCommunityThunk } from "../../../store/community";
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
                            </>
                        )}
                    </div>
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
