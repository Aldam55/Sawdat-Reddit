import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { createPost } from "../../../store/post"
import { getSingleCommunityThunk } from "../../../store/community"
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
        if (description.length > 1000) errors.push("Description must be less than 1000 characters.")
        setValidationErrors(errors)
    }, [title, description])

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
                    placeholder="Title"
                    value={title}
                    onChange={updateTitle}
                    required />
                <textarea
                    type="text"
                    placeholder="description"
                    value={description}
                    onChange={updateDescription} />
            </div>
            <button
                type='submit'>
                Post
            </button>
            <button
                type='button'
                onClick={handleCancel}>
                Cancel
            </button>
        </form>
    )
}

export default CreatePost
