const LOAD_ALL = "communities/LOAD_ALL"
const LOAD_ONE = "communities/LOAD_ONE"

const loadAll = (communities) => ({
    type: LOAD_ALL,
    communities
})
const loadOne = community => ({
    type: LOAD_ONE,
    community
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

export const getOneCommunityThunk = (communityId) => async dispatch => {
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

let initialState = {
    allCommunities: {},
    singleCommunity: {}
}

const communityReducer = (state = initialState, action) => {
    let newState;
    let allCommunities = {}
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
        default:
            return state
    }
}

export default communityReducer
