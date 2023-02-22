const ADD_ONE = "votes/ADD_ONE"
const MINUS_ONE = "votes/MINUS_ONE"
const LOAD_POST_VOTES = "votes/LOAD_POST_VOTES"
const LOAD_ALL_VOTES = "votes/LOAD_ALL_VOTES"

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
const loadAllVotes = votes => ({
    type: LOAD_ALL_VOTES,
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

export const getPostVotes = (postId) => async dispatch => {
    const response = await fetch(`/api/posts/${postId}/votes`)

    if (response.ok) {
        const votes = await response.json()
        dispatch(loadPostVotes(votes))
        return votes
    } else {
        console.log("----GET POST VOTES THUNK ERROR----")
    }
    return
}

const initialState = {
    postVotes: {}
}

const voteReducer = (state = initialState, action) => {
    let newState;
    let postVotes = {};
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
        case LOAD_POST_VOTES:
            action.votes.forEach(vote => {
                postVotes[vote.id] = vote
            })
            return {
                ...state,
                postVotes
            }
        default:
            return state
    }
}

export default voteReducer
