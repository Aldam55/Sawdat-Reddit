import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { getSingleCommunityThunk, resetCommunity } from "../../../store/community"
import { updatePost, getSinglePost, resetPost } from "../../../store/post"
import cake from "../../../assets/birthday-cake.png"
import icon from "../../../assets/icon.png"
import "./UpdatePost.css"


const UpdatePost = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { postId } = useParams()

    const user = useSelector(state => state.session.user)
    const community = useSelector(state => state.communities.singleCommunity)
    const existingPost = useSelector(state => state.posts.community[postId])

    if (!Object.values(community).length) dispatch(getSingleCommunityThunk(existingPost?.community_id))

    const [description, setDescription] = useState(existingPost?.description ?? '')
    const [validationErrors, setValidationErrors] = useState([])
    const [showErrors, setShowErrors] = useState(false)

    const updateDescription = (e) => setDescription(e.target.value)

    useEffect(() => {
        dispatch(getSinglePost(postId))
        dispatch(getSingleCommunityThunk(existingPost?.community_id))

        return () => {
            dispatch(resetCommunity())
            dispatch(resetPost())
        }
    }, [dispatch, postId])

    useEffect(() => {
        const errors = []
        if (description.length > 2000) errors.push("Description must be less than 2000 characters.")
        setValidationErrors(errors)
    }, [description])

    const iconErrorHandler = (e) => {
        e.currentTarget.src = icon
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setShowErrors(true)

        if (!validationErrors.length) {
            const payload = {
                title: existingPost?.title,
                description
            }

            let updatedPost = await dispatch(updatePost(payload, postId))

            if (updatedPost) {
                setShowErrors(false)
                history.push(`/communities/${existingPost?.community_id}`)
            }
        }
    }

    const handleCancel = async (e) => {
        e.preventDefault()
        history.push(`/communities/${existingPost?.community_id}`)
    }

    return (
        <div className="create-post-wrapper">
            <div className="create-post-container">
                <div className="create-post-form-container">
                    <div className="create-post-form-content">
                        <div className="create-post-form-header">Update your post in {community.name}</div>
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
                                            <div className="edit-form-title">
                                                Title: {existingPost?.title}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="create-form-description-wrapper">
                                        <div className="create-form-description-container">
                                            <textarea
                                                className="create-form-description-body"
                                                type="text"
                                                placeholder="Description (Optional)"
                                                maxLength={2000}
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
                            <li className="create-post-individual-rule">Chase progress, not perfection</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdatePost
