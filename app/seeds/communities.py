from app.models import db, Community

communities = [
    {'user_id': 1,
     'name': 'Music',
     'about': "The musical community of Sawdat",
     'banner_url': 'https://b.thumbs.redditmedia.com/XWgGN39mWf12u3_Mv0NO2Jhps8OjGlQ9Xv9jxeKqV-k.png',
     'icon_url': 'https://b.thumbs.redditmedia.com/UO8Hj8ZnQmYGeE9ZIjKPQEwlX46OBPC_kj2Jqlt5nqo.png'},
    {'user_id': 2,
     'name': 'Gaming',
     'about': "A community for (almost) anything related to games - video games, board games, card games, etc. (but not sports).",
     'banner_url': 'https://styles.redditmedia.com/t5_2qh03/styles/bannerBackgroundImage_j84aqdq3eyd91.png?width=4000&s=750c0c8fac9a435d86f5884c01db442811a2c90d',
     'icon_url': 'https://b.thumbs.redditmedia.com/0PgZl68jAxA6T1BH6uvUQ5Bz1F1GrrJLCL8oi2Gz0Ak.png'},
    {'user_id': 3,
     'name': 'Astronomy',
     'about': "The amateur hobby of humanity since the dawn of time and scientific study of celestial objects.",
     'banner_url': "https://styles.redditmedia.com/t5_2qhor/styles/bannerBackgroundImage_uq5xwd6cybf31.jpg?width=4000&s=a970ab1a6198ebf46a77e92a34b875ebf14b13d7",
     'icon_url': 'https://b.thumbs.redditmedia.com/btbD_P83TqhTmqMBKyZdfiq0FBsAUuwyv6KK2Wx-X-w.png'},
    {'user_id': 4,
     'name': 'Movies',
     'about': "The goal of Movies is to provide an inclusive place for discussions and news about films with major releases. Submissions should be for the purpose of informing or initiating a discussion, not just to entertain readers.",
     'banner_url': "https://styles.redditmedia.com/t5_2qh3s/styles/bannerBackgroundImage_k1ukyjei82r81.png?width=4000&s=731749ec0839e557c7bf41ec21beae0f083ef926",
     'icon_url': 'https://styles.redditmedia.com/t5_2qh3s/styles/communityIcon_yq9ah8eniar81.jpg?width=256&s=262d01a00774ee9e7953f9586a2c60134d788bb4'},
    {'user_id': 5,
     'name': "Space",
     'about': "Share & discuss informative content on: Astrophysics, Cosmology, Space Exploration, Planetary Science, Astrobiology",
     'banner_url': "https://a.thumbs.redditmedia.com/Viwu-zOMDlD_GZOsO-OpNIKeFQa406KtExOdft5vqN8.png",
     'icon_url': "https://b.thumbs.redditmedia.com/Zf90LsQEOyfU9RKf5NgXRATeMlFHULaD-B6UlicR5Sc.png"},
    {'user_id': 6,
     'name': "Economy",
     'about': "Forum for economy, business, politics, stocks, bonds, product releases, IPOs, advice, news, investment, videos, predictions, government, money, politics, debate, capitalism, current trends, and more.",
     'banner_url': "https://styles.redditmedia.com/t5_2qhpn/styles/bannerBackgroundImage_42dl8b4zkg711.jpg?width=4000&s=cd77012ee42b52b8085adff7fb3942284e73eff1",
     'icon_url': "https://b.thumbs.redditmedia.com/1zSgQcLlTzQ4noH5-FqBj8hgojBv20xnyYYPQEusXCk.png"},
    {'user_id': 6,
     'name': "Technology",
     'about': "Community dedicated to the news and discussions about the creation and use of technology and its surrounding issues.",
     'banner_url': "https://img.freepik.com/free-vector/high-tech-futuristic-lines-technology-banner_1017-23966.jpg?w=2000",
     'icon_url': "https://b.thumbs.redditmedia.com/J_fCwTYJkoM-way-eaOHv8AOHoF_jNXNqOvPrQ7bINY.png"},
    {'user_id': 7,
     'name': "Books",
     'about': "It is our intent and purpose to foster and encourage in-depth discussion about all things related to books, authors, genres, or publishing in a safe, supportive environment.",
     'banner_url': "https://styles.redditmedia.com/t5_2qh4i/styles/bannerBackgroundImage_s3o1jk71o6w91.jpg?width=4000&s=e00f7651b3150620ce198b3d4227a30d0db570d3",
     'icon_url': "https://a.thumbs.redditmedia.com/8rHqHJ86uZ8iHfejG2zZbLX9ThOAZUzCVOwgms0KCq4.png"},
    {'user_id': 6,
     'name': "DataIsBeautiful",
     'about': "DataIsBeautiful is for visualizations that effectively convey information. Pretty pictures are not the sole aim of this community",
     'banner_url': "https://styles.redditmedia.com/t5_2tk95/styles/bannerBackgroundImage_loa87i93mop01.png?width=4000&s=3e3a0f3e5687c3ecc34fd0632d8c78e38abcc737",
     'icon_url': "https://a.thumbs.redditmedia.com/PWqqPdsoof5lD4noSANijKfTVDalyChZWQrG9ljigy8.png"},
    {'user_id': 10,
     'name': "Random Thoughts",
     'about': "Unbeckoned, they pop into your head, however, we still expect them to have some form of rhyme or reason.",
     'banner_url': "https://styles.redditmedia.com/t5_2rka3/styles/bannerBackgroundImage_2fg8yzilkz891.jpeg?width=4000&s=cca0f15255c8253efec61878e1ef93902c48cee6",
     'icon_url': "https://styles.redditmedia.com/t5_2rka3/styles/communityIcon_cjbp61dd8pj91.jpeg?width=256&s=4395d47328f0313e0678f016f0fc317e8b5521d5"},
]

community_lst = []
for i in range(0, len(communities)):
    user_id = communities[i]["user_id"]
    name = communities[i]["name"]
    about = communities[i]["about"]
    banner_url = communities[i]["banner_url"]
    icon_url = communities[i]["icon_url"]

    new_community = Community(user_id=user_id,
                              name=name,
                              about=about,
                              banner_url=banner_url,
                              icon_url=icon_url)
    community_lst.append(new_community)


def seed_communities():
    for community in community_lst:
        db.session.add(community)
    db.session.commit


def undo_communities():
    db.session.execute('TRUNCATE communities RESTART IDENTITY CASCADE;')
    db.session.commit()
