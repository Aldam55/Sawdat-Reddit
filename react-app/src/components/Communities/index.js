import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCommunitiesThunk } from '../../store/community'

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
            {communities &&
                <div>
                    {Object.values(communities).map(community => (
                        <div key={community.id}>
                            {community.name}
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default AllCommunities
