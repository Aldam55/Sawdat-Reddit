import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createCommunityThunk } from "../../../store/community";
import icon from "../../../assets/icon.png"
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
        if (name.length < 5 || name.length > 25) errors.push("Community name must be between 5 and 25 characters.")
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
        <div className="create-community-wrapper">
            <div className="create-community-container">
                <div className="create-community-form-container">
                    <div className="create-community-form-content">
                        <div className="create-community-form-header">Create a Community</div>
                        <div className="create-community-form-body">
                            <form onSubmit={handleSubmit} className='create-community-form'>
                                {showErrors &&
                                    <ul className="errors">
                                        {validationErrors.map((e, i) => {
                                            return <div className='create-community-error-message' key={i}>{e}</ div>
                                        })}
                                    </ul>
                                }
                                <div className="community-form-content">
                                    <div className="create-community-name-wrapper">
                                        <div className="create-community-name-container">
                                            <div className="create-community-name-text">
                                                <div className="create-community-name">
                                                    Community Name:
                                                </div>
                                                <div className="create-community-disclaimer">Community names cannot be changed or edited.</div>
                                            </div>
                                            <input
                                                className="create-community-name-body"
                                                type="text"
                                                placeholder="Circus"
                                                value={name}
                                                onChange={updateName}
                                                required />
                                        </div>
                                    </div>
                                    <div className="create-community-about-wrapper">
                                        <div className="create-community-about-container">
                                            <div className="create-community-name-text">Tell us about your community:</div>
                                            <textarea
                                                className="create-community-about-body"
                                                type="text"
                                                placeholder="The Circus is a community made by programmers, for programmers. The goal is to answer any coding related questions with the hopes that all members of the Circus will find sucessful jobs in the tech industry."
                                                value={about}
                                                onChange={updateAbout}
                                                required />
                                            <div className="create-form-description-count">
                                                {about.length} / 200
                                            </div>
                                        </div>
                                    </div>
                                    <div className="create-community-banner-wrapper">
                                        <div className="create-community-banner-container">
                                            <div className="create-community-name-text">Community Banner Image (Optional): </div>
                                            <input
                                                className="create-community-banner-body"
                                                type="text"
                                                placeholder="Banner ImgUrl"
                                                value={bannerUrl}
                                                onChange={updateBannerUrl} />
                                        </div>
                                    </div>
                                    <div className="create-community-icon-wrapper">
                                        <div className="create-community-icon-container">
                                        <div className="create-community-name-text">Community Icon Image:</div>
                                            <input
                                                className="create-community-icon-body"
                                                type="text"
                                                placeholder="Icon ImgUrl"
                                                value={iconUrl}
                                                onChange={updateIconUrl}
                                                required />
                                        </div>
                                    </div>
                                </div>
                                <div className="create-community-bottom-section">
                                    <div className="create-form-borders"></div>
                                    <div className="create-community-buttons-container">
                                        <div className="create-community-buttons">
                                            <div className="create-post-cancel-container">
                                                <button
                                                    className="create-post-cancel"
                                                    type='button'
                                                    onClick={handleCancel}>
                                                    Cancel
                                                </button>
                                            </div>
                                            <div className="create-community-confirm">
                                                <button
                                                    className="create-community-button"
                                                    type='submit'>
                                                    Create
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="create-post-right">
                    <div className="create-post-rules-container">
                        <div className="create-post-rules-header">
                            <img src={icon} alt='icon' className="rules-icon" />
                            Posting to Sawdat
                        </div>
                        <ol className="create-post-rules">
                            <li className="create-post-individual-rule">Remember the users</li>
                            <li className="create-post-individual-rule">Treat others how you want to be treated</li>
                            <li className="create-post-individual-rule">Don't steal other people's code</li>
                            <li className="create-post-individual-rule">Remove default styling</li>
                            <li className="create-post-individual-rule">Chase progress, not perfection</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateCommunity
