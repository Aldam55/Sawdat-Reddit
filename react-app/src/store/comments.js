const LOAD_POST_COMMENTS = "comments/LOAD_POST_COMMENTS"

const loadPostComments = comments => ({
    type: LOAD_POST_COMMENTS,
    comments
})

export const getPostComments = (postId) => async dispatch => {
    const response = await fetch(`/api/posts/${postId}/comments`)

    if (response.ok) {
        const comments = await response.json()
        dispatch(loadPostComments(comments))
        return comments
    } else {
        console.log("----GET POST COMMENTS THUNK ERROR----")
    }
    return
}

const initialState = {
    post: {}
}

const commentsReducer = (state = initialState, action) => {
    let newState;
    let post;
    switch (action.type) {
        case LOAD_POST_COMMENTS:
            console.log("ACTION IN LOAD COMMENTS", action.comments)
            action.comments.forEach(comment => {
                post[comment.id] = comment
            })
            return {
                post
            }
        default:
            return state
    }
}

export default commentsReducer
