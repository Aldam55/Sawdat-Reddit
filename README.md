![logo](https://user-images.githubusercontent.com/106426283/200190118-1975b3bd-d313-404c-8e4c-f3cfd7728eba.png)

Sawdat is a fullstack web application where users can communities that share similar interests and make posts to interact with other users. Inspired by [Reddit](https://www.reddit.com/)

**Live site: [Sawdat](https://sawdat.herokuapp.com/)

# 📍 Wiki Links
- [Database Schema](https://github.com/Aldam55/Sawdat-Reddit/wiki/Database-Schema)
- [Feature List](https://github.com/Aldam55/Sawdat-Reddit/wiki/Feature-List)
- [User Stories](https://github.com/Aldam55/Sawdat-Reddit/wiki/User-Stories)
- [Wireframes](https://github.com/Aldam55/Sawdat-Reddit/wiki/Wireframes)
- [Redux Store](https://github.com/Aldam55/Sawdat-Reddit/wiki/Redux-Store)

# 🤖 Technologies
### Frameworks, Platforms, Libraries:
[![My Skills](https://skillicons.dev/icons?i=py,flask,js,react)](https://sawdat.herokuapp.com/)

[![My Skills](https://skillicons.dev/icons?i=redux,postgres,docker,sqlite)](https://sawdat.herokuapp.com/)

[![My Skills](https://skillicons.dev/icons?i=css,html,heroku)](https://sawdat.herokuapp.com/)

- Python, Flask, JavaScript, React
- Redux, Postgres, Docker, SQLite
- CSS3, HTML5, Heroku

## 🌊 Splash Page
![image](https://user-images.githubusercontent.com/106426283/200191181-7984d658-3336-480d-b93e-65bace5347d1.png)

## 📁 Features

### User

#### Signup/Login:
- Users can sign up and login with valid credentials, or log in as a demo user.

![image](https://user-images.githubusercontent.com/106426283/200191926-e1d3f6bc-cce4-45c3-aa3c-fe849e5eef8c.png)
![image](https://user-images.githubusercontent.com/106426283/200191931-735b7049-3917-450b-9e47-262e60d77e87.png)



### Communities

#### User:
- Create a community.
- Navigate to an individual community's page.

#### Owner of Community:
- Edit community banner, icon, and description.
- Delete community.

![image](https://user-images.githubusercontent.com/106426283/200192399-4b7b67f1-172b-4e6e-a0f7-bd860ad8f3bf.png)
![image](https://user-images.githubusercontent.com/106426283/200192494-88151a0d-16e1-44ad-8875-6ab8a37216d2.png)
![image](https://user-images.githubusercontent.com/106426283/200192502-29640582-682f-4cb8-a134-007a244213b2.png)



### Posts

#### User:
- Read posts by other users.
- Create a post in a community.

#### Owner of Post:
- Edit description of a post.
- Delete post.

![image](https://user-images.githubusercontent.com/106426283/200193252-8cb78177-164a-4848-9c60-16d2de1458af.png)
![image](https://user-images.githubusercontent.com/106426283/200193255-7d4cd1ec-4682-4f9c-94d8-4b25f2b99a87.png)
![image](https://user-images.githubusercontent.com/106426283/200193258-65b428b8-f087-4424-a8b3-8a319ae62ed2.png)


# ▶️ Get Started

### Clone repository.

### Install dependencies & Prep database.
- In the project directory you will run:

```
pipenv install
```

This command will install packages into the pipenv virtual environment and update your Pipfile.

- Create a .env file in said current directory.
- Paste in SECRET_KEY and DATABASE_URL configurations.

```
SECRET_KEY=<<SECRET_KEY>>
DATABASE_URL=sqlite:///dev.db
```

The .env file contains the individual user environment variables that override the variables set in the /etc/environment file. You can customize your environment variables as desired by modifying your .env file. In this case we are setting the SECRET_KEY and the DATABASE_URL.

- While in your root directory run:

```
pipenv shell
```

This will create a new active pip environment for  you to run your backend.

- Followed by:

```
flask db upgrade
flask seed all
pipenv run flask run
```

Because this application uses SQLite, the upgrade command will detect that a database does not exist and will create it. While now you are creating the database you are also seeding in our 105 businesses, 315 business images, 30 users, and all of their 270 grumbles/nopes.

- Navigate to your /Nope-Yelp/react-app/ folder and create another .env file.
- Paste in the REACT_APP_BASE_URL

```
REACT_APP_BASE_URL=http://localhost:5000
```
We'll be pasting in the path to server for frontend into this newly created environment file.

- All there is to do is:

```
npm install
```
This command installs a package and any packages that it depends on. Since the package has a package-lock the installation of dependencies will be driven by that. If you take a peak into your package.json file you can see all the dependencies our project is installing.

```
npm start
```
This runs a predefined command specified in the "start" property of a package's "scripts" object in our case it is:

```
"start": "react-scripts start"
```
DO NOT paste this anywhere. The code above is already provided in our package.json file!

# 📱 Contact
[Linkedin](https://www.linkedin.com/in/alexander-dam-a45b8821a/)
