import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateCommunityThunk, getSingleCommunityThunk, resetCommunity } from "../../../store/community";
import "./UpdateCommunity.css"


const UpdateCommunity = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { communityId } = useParams()

    const community = useSelector(state => state.communities.singleCommunity)
    if (!Object.values(community).length) dispatch(getSingleCommunityThunk(communityId))

    const [name, setName] = useState('')
    const [about, setAbout] = useState('')
    const [bannerUrl, setBannerUrl] = useState('')
    const [iconUrl, setIconUrl] = useState('')
    const [validationErrors, setValidationErrors] = useState([])
    const [showErrors, setShowErrors] = useState(false)

    useEffect(() => {
        if (Object.values(community).length) {
            setName(community.name)
            setAbout(community.about)
            setBannerUrl(community.bannerUrl)
            setIconUrl(community.iconUrl)
        }
    }, [community])

    const updateName = (e) => setName(e.target.value)
    const updateAbout = (e) => setAbout(e.target.value)
    const updateBannerUrl = (e) => setBannerUrl(e.target.value)
    const updateIconUrl = (e) => setIconUrl(e.target.value)

    useEffect(() => {
        dispatch(getSingleCommunityThunk(communityId))

        return () => dispatch(resetCommunity())
    }, [dispatch, communityId])
}

export default UpdateCommunity
