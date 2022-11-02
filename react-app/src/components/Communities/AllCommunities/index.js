import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getAllCommunitiesThunk } from '../../../store/community'
import icon from "../../../assets/icon.png"
import "./AllCommunities.css"

const AllCommunities = () => {
    const dispatch = useDispatch()

    const communities = useSelector(state => state.communities.allCommunities)
    const [isLoaded, setIsLoaded] = useState(false)

    const iconErrorHandler = (e) => {
        e.currentTarget.src = icon
    }

    useEffect(() => {
        dispatch(getAllCommunitiesThunk())
            .then(() => { setIsLoaded(true) })
    }, [dispatch])

    return isLoaded && (
        <div className='all-communities-wrapper'>
            <div className='all-communities-container'>
                {/* <div>
                    <NavLink to='/communities/create'>Create a Community</NavLink>
                </div> */}
                <div className='all-communities-content'>
                    <div className='all-communities-header'>
                        <div className='all-communities-header-text'>
                            All communities
                        </div>
                    </div>
                    {communities &&
                        <div className='all-communities-individual'>
                            {Object.values(communities).map(community => (
                                <div key={community.id} id='each-community'>
                                    <div id='each-community-left'>
                                        <NavLink to={`/communities/${community?.id}`} id='all-communities-link'>
                                            <img src={community.icon_url} id="each-community-icon" onError={iconErrorHandler}/>
                                            <div id='each-community-name'>
                                            {community.name}
                                            </div>
                                        </NavLink>
                                    </div>
                                    <div id='each-community-right'>placeholder</div>
                                </div>
                            ))}
                        </div>
                    }
                </div>
                <div>
                    placeholder
                </div>
            </div>
        </div>
    )
}

export default AllCommunities
