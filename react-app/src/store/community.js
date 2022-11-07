const LOAD_ALL = "communities/LOAD_ALL"
const LOAD_ONE = "communities/LOAD_ONE"
const CREATE = "communities/CREATE"
const UPDATE = "communities/UPDATE"
const REMOVE = "communities/REMOVE"
const RESET = "communities/RESET"

const loadAll = (communities) => ({
    type: LOAD_ALL,
    communities
})
const loadOne = community => ({
    type: LOAD_ONE,
    community
})
const create = community => ({
    type: CREATE,
    community
})
const update = community => ({
    type: UPDATE,
    community
})
const remove = communityId => ({
    type: REMOVE,
    communityId
})
export const resetCommunity = () => ({
    type: RESET
})

export const getAllCommunitiesThunk = () => async dispatch => {
    const response = await fetch("/api/communities/")

    if (response.ok) {
        const communities = await response.json()
        await dispatch(loadAll(communities))
        return communities
    } else {
        console.log("-----GET ALL COMMUNITIES THUNK ERROR-----")
    }
    return
}

export const getSingleCommunityThunk = (communityId) => async dispatch => {
    const response = await fetch(`/api/communities/${communityId}`)

    if (response.ok) {
        const singleCommunityData = await response.json()
        dispatch(loadOne(singleCommunityData))
        return singleCommunityData
    } else {
        console.log("---- SINGLE COMMUNITY THUNK ERROR ----")
    }
    return
}

export const getUserCommunityThunk = () => async (dispatch) => {
    const response = await fetch("/api/communities/current")

    if (response.ok) {
        const communityData = await response.json();
        dispatch(loadAll(communityData))
        return communityData
    } else {
        console.log("---- CURRENT USER COMMUNITY THUNK ERROR ----")
    }
}

export const createCommunityThunk = (community) => async dispatch => {
    const response = await fetch('/api/communities/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(community)
    })
    console.log("response in create community thunk", response)
    if (response.ok) {
        const createdCommunity = await response.json()
        dispatch(create(createdCommunity))
        return createdCommunity
    } else {
        console.log("---- CREATE COMMUNITY THUNK ERROR ----")
    }
    return
}

export const updateCommunityThunk = (community, communityId) => async dispatch => {
    const response = await fetch(`/api/communities/${communityId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(community)
    })

    if (response.ok) {
        const updatedCommunityData = await response.json()
        dispatch(update(updatedCommunityData))
        return updatedCommunityData
    } else {
        console.log("----UPDATE COMMUNITY THUNK ERROR----")
    }
    return
}

export const deleteCommunityThunk = communityId => async dispatch => {
    const response = await fetch(`/api/communities/${communityId}`, {
        method: "DELETE"
    })

    if (response.ok) {
        const deletedCommunityData = await response.json()
        dispatch(remove(deletedCommunityData))
        return
    } else {
        console.log("----DELETE COMMUNITY THUNK ERROR----")
    }
    return
}

const initialState = {
    allCommunities: {},
    singleCommunity: {}
}

const communityReducer = (state = initialState, action) => {
    let newState;
    let allCommunities = {};
    let singleCommunity = {}
    switch (action.type) {
        case LOAD_ALL:
            action.communities.communities.forEach(community => {
                allCommunities[community.id] = community
            })
            return {
                ...state,
                allCommunities
            }
        case LOAD_ONE:
            newState = { ...state, allCommunities: { ...state.allCommunities }, singleCommunity: { ...state.singleCommunity } }
            newState.singleCommunity = action.community
            return { ...newState }
        case CREATE:
            newState = { allCommunities: { ...state.allCommunities } }
            newState.singleCommunity = action.community
            return newState
        case UPDATE:
            newState = { allCommunities: { ...state.allCommunities } }
            newState.singleCommunity = action.community
            return newState
        case REMOVE:
            newState = {
                allCommunities: { ...state.allCommunities },
                singleCommunity: { ...state.singleCommunity }
            }
            delete newState.allCommunities[action.communityId]
            if (newState.singleCommunity.id === action.communityId) {
                newState.singleCommunity = {}
            }
            return newState
        case RESET:
            return initialState
        default:
            return state
    }
}

export default communityReducer
