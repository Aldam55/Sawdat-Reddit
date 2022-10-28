import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getAllCommunitiesThunk } from '../../../store/community'
import "./AllCommunities.css"

const AllCommunities = () => {
    const dispatch = useDispatch()

    const communities = useSelector(state => state.communities.allCommunities)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getAllCommunitiesThunk())
            .then(() => { setIsLoaded(true) })
    }, [dispatch])

    return isLoaded && (
        <div>
            <div>
                <NavLink to='/communities/create'>Create a Community</NavLink>
            </div>
            {communities &&
                <div>
                    {Object.values(communities).map(community => (
                        <div key={community.id}>
                            <NavLink to={`/communities/${community?.id}`}>{community.name}</NavLink>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default AllCommunities
