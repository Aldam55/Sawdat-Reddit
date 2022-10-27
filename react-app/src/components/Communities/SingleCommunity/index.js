import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleCommunityThunk } from "../../../store/community";
import "./SingleCommunity.css"

const SingleCommunity = () => {
    const dispatch = useDispatch()
    const { communityId } = useParams()

    const community = useSelector(state => state.communities.singleCommunity)
    const user = useSelector(state => state.session.user)
    const [isLoaded, setIsLoaded] = useState(false)
    console.log('this is the single community', community)
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
                </div>
                <div>
                {community.about}
                </div>
                <img src={community.banner_url} alt='banner'></img>
                <img src={community.icon_url} alt='icon'></img>
            </div>
            }
        </>
    )
}

export default SingleCommunity
