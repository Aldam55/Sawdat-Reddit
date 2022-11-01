import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createCommunityThunk } from "../../../store/community";
import "./CreateCommunity.css"


const CreateCommunity = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [name, setName] = useState('')
    const [about, setAbout] = useState('')
    const [bannerUrl, setBannerUrl] = useState('')
    const [iconUrl, setIconUrl] = useState('')
    const [validationErrors, setValidationErrors] = useState([])
    const [showErrors, setShowErrors] = useState(false)

    const updateName = (e) => setName(e.target.value)
    const updateAbout = (e) => setAbout(e.target.value)
    const updateBannerUrl = (e) => setBannerUrl(e.target.value)
    const updateIconUrl = (e) => setIconUrl(e.target.value)

    useEffect(() => {
        const errors = []
        if (name.length < 5 || name.length > 40) errors.push("Community name must be between 5 and 40 characters.")
        if (about.length < 5 || about.length > 200) errors.push("About must be between 5 and 200 characters")
        if (bannerUrl.length && !bannerUrl.match(/\.(jpg|jpeg|png|gif)$/)) errors.push("Banner must be a valid image(jpg/jpeg/png).")
        if (!iconUrl.match(/\.(jpg|jpeg|png|gif)$/)) errors.push("Icon must be a valid image(jpg/jpeg/png).")
        setValidationErrors(errors)
    }, [name, about, bannerUrl, iconUrl])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setShowErrors(true)

        if (!validationErrors.length) {
            const community = {
                name,
                about,
                banner_url: bannerUrl,
                icon_url: iconUrl
            }

            let createdCommunity = await dispatch(createCommunityThunk(community))

            if (createdCommunity) {
                setShowErrors(false)
                history.push(`/communities/${createdCommunity.id}`)
            }
        }
    }

    const handleCancel = async (e) => {
        e.preventDefault()
        history.push('/')
    }

    return (
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
                    placeholder="name"
                    value={name}
                    onChange={updateName}
                    required />
                <textarea
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
                Create your Community
            </button>
            <button
                type='button'
                onClick={handleCancel}>
                Cancel
            </button>
        </form>
    )
}

export default CreateCommunity
