from app.models import db, User

users = [{'email': 'FredDarnell@email.com', 'username': 'FredDarnell'},
         {'email': 'DanLewis@email.com', 'username': 'DanLewis'},
         {'email': 'LunaCast@email.com', 'username': 'LunaCast'},
         {'email': 'GiannaWagle@email.com', 'username': 'GiannaWagle'},
         {'email': 'WillowHesch@email.com', 'username': 'WillowHesch'},
         {'email': 'MiaMcGinnis@email.com', 'username': 'MiaMcGinnis'},
         {'email': 'SofiaMccord@email.com', 'username': 'SofiaMccord'},
         {'email': 'NathanTapia@email.com', 'username': 'NathanTapia'},
         {'email': 'EmiliaFletcher@email.com', 'username': 'EmiliaFletcher'},
         {'email': 'RileyOlson@email.com', 'username': 'RileyOlson'},
         {'email': 'EdwardHancock@email.com', 'username': 'EdwardHancock'},
         {'email': 'GiannaRoberts@email.com', 'username': 'GiannaRoberts'},
         {'email': 'ZoeyMyers@email.com', 'username': 'ZoeyMyers'},
         {'email': 'GiannaChapman@email.com', 'username': 'GiannaChapman'},
         {'email': 'VictorJohnson@email.com', 'username': 'VictorJohnson'},
         {'email': 'AlexCast@email.com', 'username': 'AlexCast'},
         {'email': 'BenDuffman@email.com', 'username': 'BenDuffman'},
         {'email': 'SofiaDuffman@email.com', 'username': 'SofiaDuffman'},
         {'email': 'AuroraVanderpoel@email.com', 'username': 'AuroraVanderpoel'},
         {'email': 'IslaFerro@email.com', 'username': 'IslaFerro'},
         {'email': 'PaulMaki@email.com', 'username': 'PaulMaki'},
         {'email': 'NoraCataldi@email.com', 'username': 'NoraCataldi'},
         {'email': 'MiaDavis@email.com', 'username': 'MiaDavis'},
         {'email': 'PaulMcGinnis@email.com', 'username': 'PaulMcGinnis'},
         {'email': 'LarryWagle@email.com', 'username': 'LarryWagle'},
         {'email': 'OttoAshwoon@email.com', 'username': 'OttoAshwoon'},
         {'email': 'AveryVan Zandt@email.com', 'username': 'AveryVan Zandt'},
         {'email': 'JohnSandstrom@email.com', 'username': 'JohnSandstrom'},
         {'email': 'SofiaDeitz@email.com', 'username': 'SofiaDeitz'},
         {'email': 'NovaHaworth@email.com', 'username': 'NovaHaworth'}]

add_user = []

for i in range(0, len(users)):
    username = users[i]["username"]
    email = users[i]["email"]
    password = "password"

    new_user = User(username=username, email=email, password=password)
    add_user.append(new_user)

# Adds a demo user, you can add other users here if you want


def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    for user in add_user:
        db.session.add(user)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
