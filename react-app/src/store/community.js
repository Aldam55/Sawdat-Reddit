const LOAD_ALL = "communities/LOAD_ALL"

const loadAll = (communities) => ({
    type: LOAD_ALL,
    communities
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

let initialState = {
    allCommunities: {},
    singleCommunity: {}
}

const communityReducer = (state = initialState, action) => {
    let newState;
    let allBusiness = {}
    switch (action.type) {
        case LOAD_ALL:
            action.communities.forEach(community => {
                allCommunities[community.id] = community
            })
            return {
                ...state,
                allCommunities
            }
        default:
            return state
    }
}

export default communityReducer
