import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateCommunityThunk, getSingleCommunityThunk, resetCommunity } from "../../../store/community";
import "./UpdateCommunity.css"


const UpdateCommunity = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { communityId } = useParams()

    const community = useSelector(state => state.communities.singleCommunity)
    if (!Object.values(community).length) dispatch(getSingleCommunityThunk(communityId))

    // const [name, setName] = useState('')
    const [about, setAbout] = useState('')
    const [bannerUrl, setBannerUrl] = useState('')
    const [iconUrl, setIconUrl] = useState('')
    const [validationErrors, setValidationErrors] = useState([])
    const [showErrors, setShowErrors] = useState(false)

    useEffect(() => {
        if (Object.values(community).length) {
            setAbout(community.about)
            setBannerUrl(community.banner_url)
            setIconUrl(community.icon_url)
        }
    }, [community])

    const updateAbout = (e) => setAbout(e.target.value)
    const updateBannerUrl = (e) => setBannerUrl(e.target.value)
    const updateIconUrl = (e) => setIconUrl(e.target.value)

    useEffect(() => {
        dispatch(getSingleCommunityThunk(communityId))

        return () => dispatch(resetCommunity())
    }, [dispatch, communityId])

    useEffect(() => {
        const errors = []
        if (about.length < 5 || about.length > 200) errors.push("About must be between 5 and 200 characters")
        if (bannerUrl.length && !bannerUrl.match(/\.(jpg|jpeg|png|gif)$/)) errors.push("Banner must be a valid image(jpg/jpeg/png).")
        if (!iconUrl.match(/\.(jpg|jpeg|png|gif)$/)) errors.push("Icon must be a valid image(jpg/jpeg/png).")
        setValidationErrors(errors)
    }, [about, bannerUrl, iconUrl])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setShowErrors(true)

        if (!validationErrors.length) {
            const communityObj = {
                name: community.name,
                about,
                banner_url: bannerUrl,
                icon_url: iconUrl
            }

            let updatedCommunity = await dispatch(updateCommunityThunk(communityObj, communityId))

            if (updatedCommunity) {
                setShowErrors(false)
                history.push(`/communities/${communityId}`)
            }
        }
    }

    const handleCancel = async (e) => {
        e.preventDefault()
        history.push(`/communities/${communityId}`)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {showErrors &&
                    <ul className="errors">
                        {validationErrors.map((e, i) => {
                            return <div className='create-spot-error-message' key={i}>{e}</ div>
                        })}
                    </ul>
                }
                <div>
                    <input
                        type="text"
                        placeholder="about"
                        value={about}
                        onChange={updateAbout}
                        required />
                    <input
                        type="text"
                        placeholder="Banner ImgUrl"
                        value={bannerUrl}
                        onChange={updateBannerUrl} />
                    <input
                        type="text"
                        placeholder="Icon ImgUrl"
                        value={iconUrl}
                        onChange={updateIconUrl}
                        required />
                </div>
                <button
                    type='submit'>
                    Update your Community
                </button>
                <button
                    type='button'
                    onClick={handleCancel}>
                    Cancel
                </button>
            </form>
        </div>
    )
}

export default UpdateCommunity
