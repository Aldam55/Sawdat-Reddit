const ADD_ONE = "votes/ADD_ONE"
const MINUS_ONE = "votes/MINUS_ONE"
const LOAD_ALL = "votes/LOAD_ALL"

const addOne = vote => ({
    type: ADD_ONE,
    vote
})
const minusOne = vote => ({
    type: MINUS_ONE,
    vote
})
const loadPostVotes = votes => ({
    type: LOAD_POST_VOTES,
    votes
})

export const addOneVote = (vote, postId) => async dispatch => {
    const response = await fetch(`/api/posts/${postId}/votes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(vote)
    })

    if (response.ok) {
        const addedVote = await response.json()
        console.log("this is the newly added vote", addedVote)
        addOne(addedVote)
        return addedVote
    } else {
        console.log("----ADD A VOTE THUNK ERROR----")
    }
    return
}

export const minusOneVote = (vote, postId) => async dispatch => {
    const response = await fetch(`/api/posts/${postId}/votes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(vote)
    })

    if (response.ok) {
        const minusVote = await response.json()
        minusOne(minusVote)
        return minusVote
    } else {
        console.log("----MINUS A VOTE THUNK ERROR----")
    }
    return
}

export const getAllVotes = () => async dispatch => {
    const response = await fetch('')
}

const initialState = {

}

const voteReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_ONE:
            return {
                ...state,
                [action.vote.id]: action.vote
            }
        case MINUS_ONE:
            return {
                ...state,
                [action.vote.id]: action.vote
            }
        default:
            return state
    }
}

export default voteReducer
