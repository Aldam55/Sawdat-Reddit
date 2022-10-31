const LOAD_ALL = "posts/LOAD_ALL"
const LOAD_ONE = "posts/LOAD_ONE"
const LOAD_COMMUNITY_POSTS = "posts/LOAD_COMMUNITY_POSTS"
const CREATE = "posts/CREATE"
const UPDATE = "posts/UPDATE"
const REMOVE = "posts/REMOVE"
const RESET = "posts/RESET"

const loadAll = posts => ({
    type: LOAD_ALL,
    posts
})
const loadOne = post => ({
    type: LOAD_ONE,
    post
})
const loadCommunityPosts = posts => ({
    type: LOAD_COMMUNITY_POSTS,
    posts
})
const create = post => ({
    type: CREATE,
    post
})
const update = post => ({
    type: UPDATE,
    post
})
const remove = postId => ({
    type: REMOVE,
    postId
})
export const resetPost = () => ({
    type: RESET
})

export const getAllPosts = () => async dispatch => {
    const response = await fetch('/api/posts/')

    if (response.ok) {
        const posts = await response.json()
        dispatch(loadAll(posts))
        return posts
    } else {
        console.log("----GET ALL POSTS THUNK ERROR----")
    }
    return
}

export const getCommunityPosts = (communityId) => async dispatch => {
    const response = await fetch(`/api/communities/${communityId}/posts`)

    if (response.ok) {
        const posts = await response.json()
        dispatch(loadCommunityPosts(posts))
        return posts
    } else {
        console.log("----GET COMMUNITY POSTS THUNK ERROR----")
    }
    return
}

export const getSinglePost = (postId) => async dispatch => {
    const response = await fetch(`/api/posts/${postId}`)

    if (response.ok) {
        const post = await response.json()
        dispatch(loadOne(post))
        return post
    } else {
        console.log("----GET POST BY ID THUNK ERROR----")
    }
    return
}

export const createPost = (post, communityId) => async dispatch => {
    const response = await fetch(`/api/communities/${communityId}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })

    if (response.ok) {
        const communityPost = await response.json()
        dispatch(create(communityPost))
        return communityPost
    } else {
        console.log("----CREATE POST THUNK ERROR----")
    }
    return
}

export const updatePost = (post, postId) => async dispatch => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })

    if (response.ok) {
        const updatedPost = await response.json()
        dispatch(update(updatedPost))
        return updatedPost
    } else {
        console.log("----UPDATE POST THUNK ERROR----")
    }
    return
}

export const removePost = (postId) => async dispatch => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
    })

    if (response.ok) {
        dispatch(remove(postId))
        return
    } else {
        console.log("----DELETE POST THUNK ERROR----")
    }
    return
}

const initialState = {
    community: {},
    user: {},
    allPosts: {}
}

const postReducer = (state = initialState, action) => {
    let newState;
    let community = {};
    let user = {};
    let allPosts = {}
    switch (action.type) {
        case LOAD_ALL:
            console.log("ACTION.POSTS IN LOAD ALL POSTS", action.posts)
            action.posts.posts.forEach(post => {
                allPosts[post.id] = post
            })
            return {
                ...state,
                allPosts
            }
        case LOAD_ONE:
            newState = { ...state, community: { ...state.community }, user: { ...state.user } }
            newState.community[action.post.id] = action.post
            return newState
        case LOAD_COMMUNITY_POSTS:
            console.log("POSTS IN LOAD COMMUNITY POSTS", action.posts)
            action.posts.forEach(post => {
                community[post.id] = post
            })
            return {
                ...state,
                community
            }
        case CREATE:
            console.log("ACTION IN CREATE POST", action)
            newState = { community: { ...state.community }, user: { ...state.user } }
            newState.community[action.post.id] = action.post
            return newState
        case UPDATE:
            console.log("ACTION IN UPDATE POST", action)
            newState = { community: { ...state.community }, user: { ...state.user } }
            newState.community[action.post.id] = action.post
            return newState
        case REMOVE:
            newState = { ...state, community: { ...state.community }, user: { ...state.user } }
            delete newState.community[action.postId]
            delete newState.user[action.postId]
            return newState
        case RESET:
            return initialState
        default:
            return state
    }
}

export default postReducer
