from app.models import db, Post

posts = [
    {"user_id": 11,
     "community_id": 1,
     "title": "Elevate The Sky - We Are the Dreamers featuring Michael Oakley",
     "description": "A beautiful and uplifting song just uploaded to New Retro Wave. It reminds me of my childhood and is like the soundtrack of life!!!!"
     },
    {"user_id": 12,
     "community_id": 1,
     "title": "music played while waiting for artist to come on stage",
     "description": "when youre at concerts, is there an official name for the playlists that are played when the fans are still coming in/waiting for the singer to take the stage? sorry didnt know where else to ask lol but TIA!"
     },
    {"user_id": 13,
     "community_id": 1,
     "title": "Music",
     "description": "I want to try to write a song this is the first time I’ve ever wanted to try so give me 4 words if this gets multiple comments I’ll choose one or two and if this goes through I’ll post my results in the comments"
     },
    {"user_id": 14,
     "community_id": 1,
     "title": "On the search",
     "description": "Looking for a rap video As far as I know they only had 1 maybe 2 videos Believe it was a white guy in a ski mask In a hotel with writings on the wall At some point some skinny chick starts dancing on the bed all weird I always lose this video and i'm dying to listen to it now Hopefully I posted in the right place and someone knows what I mean"
     },
    {"user_id": 15,
     "community_id": 1,
     "title": "Trying to find the name of this song",
     "description": "Ok so basically there is this song that is sort of like Tokyo Drift, I can however not remember the name of it. The main part sounds a bit like \"skilarti fati nahti, give it to me girl\" (I know, awful enterpritation, but yeah). Looked everywhere but I can't seem to find it so"
     },
    {"user_id": 11,
     "community_id": 2,
     "title": "This era of remakes has really turned me off gaming. Anyone else?",
     "description": "Last gen it was remastered and directors edition and current get is remakes. Why does everything have to be a remake? I understand there is a market for them as seems like every dev is remaking old games and people love nostalgia. But this is getting super annoying as a gamer. Instead of remakes, I would love to see alternative timelines of old games or alternate characters within the same world. But no, devs are adamant on remaking the exact thing using modern graphics and then fooling people into purchasing the same game multiple times. Have they run out of ideas or it's just too easy to do a remake? it seems like every other game is a remake now. And the more success they have, the more remakes they will churn. It's like turning into the 3d movies where every movie had a 3d version despite it being crap."
     },
    {"user_id": 12,
     "community_id": 2,
     "title": "Is Wolfenstein (2009) available anywhere for PC?",
     "description": "As a fan of all the Wolfenstein games, I'd really like to play it again, even if it was a bit meh compared to most of the other titles."
     },
    {"user_id": 13,
     "community_id": 2,
     "title": "What characters would you want to see in a Disney fighting game similar to smash bros?",
     "description": "My roster: Mickey (Minnie as an echo), Donald (Daisy as an echo), Goofy, Pluto, Ariel, Simba, Pinocchio, Stitch, Woody, Buzz Lightyear, Mr. Incredible, Lightning McQueen, Vanellope Von Schweetz, Ralph, Elsa, Genie, Spider Man, Iron Man, Thanos, Luke Skywalker, Yoda, Homer Simpson, Bart Simpson, Sora"
     },
    {"user_id": 14,
     "community_id": 2,
     "title": "Diablo 2 Resurrected or Diablo 3?",
     "description": "I'm kind of a first time Diablo player, but not a first timer to the Diablo formula and I was wondering which one should I play before for Diablo 4?"
     },
    {"user_id": 15,
     "community_id": 2,
     "title": "Is it just me or planned obsolesence is in Gaming PCs?",
     "description": "So I noticed that certain parts of gaming PCs (especially the GPU) don't seem to perform well as advertised and in fact does the opposite."
     },
    {"user_id": 11,
     "community_id": 4,
     "title": "What Movie has a Musical Score/Theme that Goes So Hard When it Didn't Have to?",
     "description": "Weirdly, this question came to me while watching the show Solar Opposites. For a goofy r-rated streaming comedy cartoon, it has a weirdly epic theme for one of it's subplots. There are other movies that remind me of this too, like the theme from 21 Jump Street or Cloudy with a Chance of Meatballs. Both had scores/themes that seemeed incredibly epic given the nature of the movie. My question to you is, what are some others? Movies that were either not very good, kinda silly, or juts didn't quite fit the epic nature of the musical score it had."
     },
    {"user_id": 12,
     "community_id": 4,
     "title": "Who remembers the movie Collateral?",
     "description": "https://www.youtube.com/watch?v=qOmw7-NuogY&t=3s"
     },
    {"user_id": 13,
     "community_id": 4,
     "title": "Any Given Sunday is hilarious.",
     "description": "As far as football movies go this one is an imperfect gem. Great performances all around, very good, unconventional cinematography and the depiction seems brutally realistic. Audio could use some work though, you can barely understand the dialogue 1/3rd of the time. Even when it gets preachy the characters in the film are rolling their eyes at it because they know it's manipulative bullshit just meant to eke the last bit of performance out of them while they're still useful. The funny part, and what pushes the film almost into fantasy, is that Willie Beamen was acting like that after winning two games though. No way a third string quarterback is talking shit to the head coach, fellow players, starring in his own commercial and music video after a couple of good games, even if he is a magical combination of Peyton Manning and Michael Vick (who somehow dropped to the **7th** round )."
     },
    {"user_id": 14,
     "community_id": 4,
     "title": "Why do most people in movies or TV shows use their left hand when shaking hands?",
     "description": "I have noticed, and can't stop noticing, that if people are shaking hands they use their left hand, more than their right. Given most people in the world are right handed this confuses me - is there a reason? I figured it might be to do with direction of filming and how it looks on screen but I can't seem to find a correlation between the angle of filming and the hand used to shake. Honestly, it's been frustrating me for years. I can never see people shaking hands now without noticing which hand they use..."
     },
    {"user_id": 15,
     "community_id": 4,
     "title": "Barbarian (2022) is one of the laziest horror movies I have ever seen - and I have seen most of them",
     "description": "This i just a rant, sorry. But I am baffled... It doesn't happen often, but this movie have one of the laziest plots I've ever seen. I'm not going to spoil the movie, but if you like horrors where the actors are made to do every stupid mistake in the book and without rime or reason, then this is for you. Sadly, You'll get not laughs out of this crap as there is no comedic relief whatsoever.You will not get any satisfaction watching it to the very end as it has no relevant message to convey and it doesn't even try to explain why these things are happening or for what reason. You'll imply watch it and forget about it, never to think of it again.It's like the writers simply didn't gave a shit and just put this in production because it got funded.Worst of all is that the first part of the movie was actually quite intriguing, the actors were quite good as well, but as soon as the horror begins, all suspense and reason leaves the building.The actors are doing what they can with the limited scope. You will not get to know any of the characters, and you end up not caring one shit about them or their fate. They are simply there as plot devises for a movie without a plot. Somehow IMDB has this movie above 7, but I am absolutely convinced the producers must have cheated to boost it that high. Or maybe I'm wrong and this movie is somehow a masterpiece that I just doesn't understand. I didn't like Rosemarys Baby, which seems to be generally lauded, so maybe it's on me.What did you think of it?"
     },
    {"user_id": 11,
     "community_id": 6,
     "title": "Thoughts on petrodollar's stability?",
     "description": "I find most of news around the situation purely speculative. It can't be that easy to end the dominance of this currency. Am I wrong?"
     },
    {"user_id": 12,
     "community_id": 6,
     "title": "What if there was no tax in the economy?",
     "description": "What if the government printed money relative to demand, injecting it instead of into commercial banks like they do now, instead into the public sector directly. The cash then flows around the economy. One problem with printing money is that it causes the currency to devalue because  increase in supply exceeds increase in demand. Say we somehow determined EXACT demand for currency. Would this work? Would there be other problems?"
     },
    {"user_id": 13,
     "community_id": 6,
     "title": "You guys are gross",
     "description": "i saw something saying something about ‘inflation’ on here and i searched it up and i saw a fat sonic. you all disgust me"
     },
    {"user_id": 14,
     "community_id": 6,
     "title": "Inflation is here to stay, as governments are completely bypassing central banks and kick a completely new form of money printer into action by issuing state guarantees on bank credit",
     "description": ""
     },
    {"user_id": 15,
     "community_id": 6,
     "title": "Would you accept a pink dollar / is it legal to paint it pink?",
     "description": "It’s a dollar just like any other, but instead of green, it was painted pink. Keeps the same denomination, texture, codes and everything."
     },
    {"user_id": 11,
     "community_id": 8,
     "title": "Is it just me or has the price of books gone up?",
     "description": "So, my local bookstore usually has pretty great prices, but recentlt i've noticed that they have gone up from an average of 8 euros to 10 or 11. Of course that doesn't sound like much, but thats a 25- 37\%\ increase, and i've noticed that new books in easons going for 19 euro (looking at you fairy tail) , which let's be real, is riduculous. I've been looking into the reason for this, and apparantly the main reasons for said price rise are increased shipping costs, along with a rise in the cost of paper, and something to do with Ebooks, which is a whole other monster."
     },
    {"user_id": 12,
     "community_id": 8,
     "title": "Are readers more sensitive to animal death scenes in books than they are to those of humans?",
     "description": "This October, I’ve started reading horror for the first time (other than Stephen King, of course). I like to do a lot of research on YouTube and Goodreads to find books I think I’ll like before I shop and I’ve noticed this trend. Many readers/reviewers will Include a disclaimer or a trigger warning about specific animal death scenes so that people can avoid a book if they’re sensitive to that. For example, I just read Nick Cutter’s “The Troop” and almost all of the reviews I’ve seen mention a couple of the animal mutilation scenes as being especially off-putting and possibly a reason not to pick up this book. Now, this is a book that’s full of gruesome body horror. Human body mutilation is the name of the game, but I suppose readers don’t have a problem with that because that’s what they come to the horror shelf expecting. However, when a monkey dies they may put the book down for good. I remember thinking, during a gruesome animal experimentation scene: “thank goodness this isn’t happening to a human being” but maybe I’m in the minority? Do you guys get more squeamish reading about animal pain than human brutality?"
     },
    {"user_id": 13,
     "community_id": 8,
     "title": "Andy Serkis reading 'The Hobbit' is one of my fav audio book experiences",
     "description": "Just finished rereading 'The Hobbit,' this time as an audio book on Audible read by Andy Serkis. His performance was one of the best audio book readings I've ever heard. His voices and accents for the characters are fun, energetic and memorable. He sings all the songs, and adds growls and sounds to add to every exciting scene. And yes, he does the Gollum voice from the movies during the Riddles in the Dark chapter. It was a really fun way to revisit the story, and I recommend it! What are some of your favorite audiobook performances?"
     },
    {"user_id": 14,
     "community_id": 8,
     "title": "manga fan new to reading novels, how do you get used to the lack of pictures?",
     "description": "I feel it important to mention I am not trolling. as stated in the title I'm more of a manga fan and manga like western comics have pictures, but that presents the problem when I'm reading a novel, I want to know what's about to happen but I'm getting bored because I have nothing to look at. I feel so childish asking but after almost 10 years of only reading manga, reading novels and light novels gets really boring after a few minutes despite the fact I actually want to keep reading."
     },
    {"user_id": 15,
     "community_id": 8,
     "title": "What are the keys to making home bookshelves/library look and feel pleasant, instead of like a pack-rat hording of books junking up the place?",
     "description": "Looking at a bookshop (a place carefully designed to look pleasant), it seems like you should have more shelves than books so that books are not crowded and can be browsed easily. Book-ends so they don't spill into extra space. Some sort of organization scheme. Uniform shelving for visual structure to offset the chaos of book variety...  I'm sure this is well-trod ground, what are the best tried&true tips / systems / secrets?"
     },
    {"user_id": 11,
     "community_id": 10,
     "title": "If drinking and driving is illegal, why do bars have parking lots??",
     "description": ""
     },
    {"user_id": 12,
     "community_id": 10,
     "title": "If these activists are serious, they need to start carrying around portable 16 gauge nail guns for their hands instead of little bottles of super glue.",
     "description": ""
     },
    {"user_id": 13,
     "community_id": 10,
     "title": "What was happening in the West during Jesus time?",
     "description": ""
     },
    {"user_id": 14,
     "community_id": 10,
     "title": "The friends to lover trope only works if both characters are individuals",
     "description": "Meaning that the MC/FMC don't spend every waking moment with each other (Star vs the forces of evil) and are able to grow and develop as people when they are with and without each other."
     },
    {"user_id": 15,
     "community_id": 10,
     "title": "Have you fully recovered from the Pandemic isolation?",
     "description": "I felt like I had to restart my social skills. I get along with everyone and can have amazing conversations. I’m in a US State that barely shut down and when I have a conversation with them I can tell that they don’t have that “strain”. They’re fast with the conversation."
     },
]

post_lst = []
for i in range(0, len(posts)):
    user_id = posts[i]["user_id"]
    community_id = posts[i]["community_id"]
    title = posts[i]["title"]
    description = posts[i]["description"]

    new_post = Post(user_id=user_id,
                    community_id=community_id,
                    title=title,
                    description=description)

    post_lst.append(new_post)


def seed_posts():
    for post in post_lst:
        db.session.add(post)
    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
