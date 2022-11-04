import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { createPost } from "../../../store/post"
import { getSingleCommunityThunk } from "../../../store/community"
import cake from "../../../assets/birthday-cake.png"
import icon from "../../../assets/icon.png"
import "./CreatePost.css"


const CreatePost = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { communityId } = useParams()

    const user = useSelector(state => state.session.user)
    const community = useSelector(state => state.communities.singleCommunity)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [validationErrors, setValidationErrors] = useState([])
    const [showErrors, setShowErrors] = useState(false)

    const updateTitle = (e) => setTitle(e.target.value)
    const updateDescription = (e) => setDescription(e.target.value)

    useEffect(() => {
        dispatch(getSingleCommunityThunk(communityId))
    }, [dispatch, communityId])

    useEffect(() => {
        const errors = []
        if (title.length < 5 || title.length > 120) errors.push("Title must be between 5 and 120 characters.")
        if (description.length > 2000) errors.push("Description must be less than 2000 characters.")
        setValidationErrors(errors)
    }, [title, description])

    const iconErrorHandler = (e) => {
        e.currentTarget.src = icon
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setShowErrors(true)

        if (!validationErrors.length) {
            const newPost = {
                title,
                description
            }

            let createdPost = await dispatch(createPost(newPost, communityId))

            if (createdPost) {
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
        <div className="create-post-wrapper">
            <div className="create-post-container">
                <div className="create-post-form-container">
                    <div className="create-post-form-content">
                        <div className="create-post-form-header">Create a Post</div>
                        <div className="create-post-community-wrapper">
                            <div className="create-post-community-container">
                                <div className="create-post-community-content">
                                    <img src={community.icon_url} alt='icon' id="create-post-community-icon" onError={iconErrorHandler} />
                                    <div id='create-post-community-name'>{community.name}</div>
                                </div>
                            </div>
                        </div>
                        <div className="create-post-form-body">
                            <form onSubmit={handleSubmit} className='create-post-form'>
                                {showErrors &&
                                    <ul className="errors">
                                        {validationErrors.map((e, i) => {
                                            return <div className='create-spot-error-message' key={i}>{e}</ div>
                                        })}
                                    </ul>
                                }
                                <div className="post-form-content">
                                    <div className="create-form-title-wrapper">
                                        <div className="create-form-title-container">
                                            <input
                                                className="create-form-title-body"
                                                type="text"
                                                placeholder="Title (Cannot be edited)"
                                                value={title}
                                                onChange={updateTitle}
                                                required />
                                            <div className="create-form-character-count">
                                                {title.length} / 120
                                            </div>
                                        </div>
                                    </div>
                                    <div className="create-form-description-wrapper">
                                        <div className="create-form-description-container">
                                            <textarea
                                                className="create-form-description-body"
                                                type="text"
                                                placeholder="Description (Optional)"
                                                value={description}
                                                onChange={updateDescription} />
                                        </div>
                                            <div className="create-form-description-count">
                                                {description.length} / 2000
                                            </div>
                                    </div>
                                </div>
                                <div className="create-form-bottom-section">
                                    <div className="create-form-borders"></div>
                                    <div className="create-form-buttons-container">
                                        <div className="create-form-buttons">
                                            <div className="create-post-cancel-container">
                                                <button
                                                    className="create-post-cancel"
                                                    type='button'
                                                    onClick={handleCancel}>
                                                    Cancel
                                                </button>
                                            </div>
                                            <div className="create-post-confirm">
                                                <button
                                                    className="create-post-button"
                                                    type='submit'
                                                    disabled={validationErrors.length}>
                                                    Post
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
                    <div className="create-post-about-container">
                        <div id="single-community-about-header">
                            <div id='about-community'>
                                About {community.name}
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
                    </div>
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
                            <li className="create-post-individual-rule">Test for validation errors</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePost
