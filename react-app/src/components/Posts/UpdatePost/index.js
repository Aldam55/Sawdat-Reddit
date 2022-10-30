import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { getSingleCommunityThunk, resetCommunity } from "../../../store/community"
import { updatePost, getSinglePost, resetPost } from "../../../store/post"
import "./UpdatePost.css"


const UpdatePost = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { postId } = useParams()

    const user = useSelector(state => state.session.user)
    const community = useSelector(state => state.communties.singleCommunity)
    const existingPost = useSelector(state => state.posts.community[postId])
    if (!Object.values(community).length) dispatch(getSingleCommunityThunk(existingPost?.community_id))

    const [description, setDescription] = useState('')
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
        if (description.length > 3000) errors.push("Description must be less than 3000 characters.")
        setValidationErrors(errors)
    }, [description])

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
        <form onSubmit={handleSubmit}>
            {showErrors &&
                <ul className="errors">
                    {validationErrors.map((e, i) => {
                        return <div className='create-spot-error-message' key={i}>{e}</ div>
                    })}
                </ul>
            }
            <div>
                <textarea
                    type="text"
                    value={description}
                    onChange={updateDescription}
                    required />
            </div>
            <button
                type='submit'>
                Update your Post
            </button>
            <button
                type='button'
                onClick={handleCancel}>
                Cancel
            </button>
        </form>
    )
}

export default UpdatePost
