const faker = require('faker');

// const {
//   getRandomIntInclusive,
//   getRandomUserId,
//   numOfDiscussions,
//   numOfPosts
// } = require('../../config/globals.js');

// const generateSeeds = () => {
//   let arr = [];
//   // prettier-ignore
//   for (let i = 1; i <= numOfPosts; i++) {
//     arr.push({
//       user_id: getRandomUserId(),
//       discussion_id: getRandomIntInclusive(1, numOfDiscussions),
//       body: faker.lorem.sentence(),
//       created_at: Date.parse(
//         faker.date.between(
//           new Date(Date.now() - (1000 * 60 * 60 * 13)),
//           new Date(Date.now())
//         )
//       )
//     });
//   }
//   return arr;
// };

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('posts').insert([
        {user_id: '5', discussion_id: '1', body: 'Serverless Computing sounds like a dream of the future, I would love to see it in action', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '6', discussion_id: '1', body: 'If it is as they say, that we developers only need to create functions and everything else will work itself out, then i am all for it', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '10', discussion_id: '2', body: 'Blockchain tech is so heavily tied with cryptocurrency, I know that cryptocurrency has not been doing so well. But the idea behind Blockchain Tech is still an incredible idea', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '14', discussion_id: '2', body: 'Blockchain is an ingenious way for data to be kept and secured', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '25', discussion_id: '3', body: 'WHATTTT!!! That\'s insaneee!!! Take my money now!', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '1', discussion_id: '3', body: 'So if they can take this technology to the next level and implement it in computers... My god .... the next generation of games will be fricking insaneeeeeeee', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '38', discussion_id: '4', body: 'Whoa whoa whoa, that is not acceptable!! If I delete a DM its because I dont want that DM to exist', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '56', discussion_id: '4', body: 'Well, that could be a good thing, it warns people to be careful what they tweet, and I guess Trump will not be able to delete his way out of trouble.', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '67', discussion_id: '5', body: 'Incredible! Wifi enabled shirts! Hmm ... I\'m thinking .... animated shirts.. WHOA!', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '19', discussion_id: '5', body: 'I have another way to tell the current weather ... Go outside!', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '24', discussion_id: '6', body: 'Apple has gone down hill since Steve Jobs left and Tim Cook took over. He is all about the money and not for the customers. Sigh RIP Steve, sorry Tim had to take over.', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '42', discussion_id: '6', body: 'Is this news?? I feel they just replaced the original 4G with the names LTE and 5G. Remmeber when 4G was fast? Then they went slower and slower ... Name changing business is booming! HA', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '15', discussion_id: '7', body: 'I think Facebook is so ingrained in such a vast variety of security and applications, it is very hard to just boycott it. There has to be a huge coordinated boycott to thwart the Facebook regime.', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '46', discussion_id: '7', body: 'I love Facebook, It has granted access to my childhood friends. One of which I am now married to! I love you Facebook!', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '76', discussion_id: '8', body: 'The last I heard he won a grammy, released a book called the Mamba Mentality, and I think he is about to release another book. Dude is literally TeamNoSleep', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '68', discussion_id: '8', body: 'Who is Kobe Bryant? Lebron James is King, King Cobra trounces the Black Mamba!', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '91', discussion_id: '9', body: 'Who Created this Topic? So off on facts. Yes GSW will be in the finals, they\'re team is cheat codes put together, but in the east coast its celtics and heats all the way' , created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '38', discussion_id: '9', body: 'I got my money on GSW, they\'re going to be reigning for quite some time ... I mean they just filled in their weakness, the center', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '36', discussion_id: '10', body: 'Aye, LiverPOO might be on top now but the real allstars are my Manchester mates, Kick some arse boys!', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '68', discussion_id: '10', body: 'I\'m in the US.. so I\'ll just leave it at that', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '12', discussion_id: '11', body: 'Lets Go GO1 I believe in you, Kasunoko gonna go downn!!', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '18', discussion_id: '11', body: 'This game is incredible! The movement and rhythm is just phenomenal.', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '28', discussion_id: '12', body: 'Righttt!!!! And with more advancements in gaming technology, itll only get bigger. Did you know that Colleges are beginning to build colliseums for E-gamers ...', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '79', discussion_id: '12', body: 'I have been actively avoiding playing Fortnight for 2 weeks .. haha you get that one? ', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '82', discussion_id: '13', body: 'Lambo going hybrid makes sense. I guess they\'re investing in less fuel reliant vehicles incase fossil fuels get too expensive', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '28', discussion_id: '13', body: 'Yes! Lamborghini goes hybrid, Trump is president, babies should start carrying guns, everything makes so much sense!', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '5', discussion_id: '14', body: 'Yes Price Drop will happen. In fact, when a Car Make announces a release of a newer model of a vehicle, statistics show that the older models do suffer a stall in sales. It happened with Honda Civic, and Toyota Camry every few years. ', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '76', discussion_id: '14', body: 'You can expect a lot of middle aged men lining up for the older corvettes to satisfy their bucket list.', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '79', discussion_id: '15', body: 'Elon Musk is a saint. He is a very strong proponent for green energy, which Tesla is a leading pioneer for. I dont know how he got his shareholders to agree but props to Tesla! I love them!', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '97', discussion_id: '15', body: 'That man is crazy, environementally its a strong choice, but business-wise, his company will likely tank! Smart men make dumb moves sometimes.', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '18', discussion_id: '16', body: 'Oda does not do anything on a whim, this must be a major plot point for Big Mom to suffer Amnesia now. I am predicting that Big mom will play a big role in helping Luffy defeat Kaido.', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '8', discussion_id: '16', body: 'Zoro discovers his roots as Wano royalty, Big Mom befriends Luffy and friends in an amneiasic state and plays a role in defeating Kaido. I love this discussion board!', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '25', discussion_id: '17', body: 'Jump Force looks like the only good thing about it is that it brings different characters together in a fighting game. The game play I wouldve liked to have been more like Dragonball Z Fighter. Im looking forward to One Piece World Seeker coming out.', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '24', discussion_id: '17', body: 'Sad Sad Sad! I had such high hopes for this game, but the graphics look like crap. You brought all my favorite anime characters together to put them to shame. ', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '26', discussion_id: '18',body: 'I love how every climax is like "This is the strongest ever", and then in the next issue "wait but this is stronger", and its just like that for every battle', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '27', discussion_id: '18', body: 'To be honest, just because Ban went to Purgatory and trained for 60 years, it cant mean that hes become Demon King comparable, He is human after all, whose lost his immortality to boot ', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '18', discussion_id: '19', body: 'This is handsdown the best SAO Ive seen so far, and Ive seen all 3. Highly Recommended', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '16', discussion_id: '19', body: 'Are you kidding me? This 3rd installment is such a sad attempt to draw out the story. I loved it ending it at the 2nd one, but this one just killed it for me.', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '38', discussion_id: '20', body: 'WINTER IS ALMOST HERE!!! Bran is the Night King, Jamie kills Cersei, Arya kills the Red Woman, Jon Dies to protect Dany, the ending will leave fans in a confusion of happiness/sadness.', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '79', discussion_id: '20', body: 'Jon Snow and Dany will have incest babies and live confusingly ever after!', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '92', discussion_id: '21', body: 'I personally like to listen to the history and lore of game of thrones on Youtube. They provide a rich backstory of Westeros, Essos, ancient Valyria, the first men, the children of the forest, etc...', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '86', discussion_id: '21', body: 'I think if they did any type of spinoff it will ruin the show, I believe George RR Martin to be much smarter than that. It is not about pleasing the fans, it is about honoring the story and the characters.', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '81', discussion_id: '22', body: 'DO NOT WATCH, WARNING: IT IS STUPID!', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '83', discussion_id: '22', body: 'Umbrella Academy is a great story, much better watched than read. Highly Recommended', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '48', discussion_id: '23', body: 'Jordan Peele is a genius. The way he tells a story about real issues through a comedic/serious/weird lens is just amazing.', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '78', discussion_id: '23', body: 'Im an old man that used to love the twilight zone, I think a modern revamp is necessary to incorporate modern problems.', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '43', discussion_id: '24', body: 'I agree. The ending wrapped up very nicely. Tears! If they make a spinoff it will definitely ruin the effects of this movie.', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '38', discussion_id: '24', body: 'Spoiler: Toothless babies become Rhagal, Drogon, Vyserion', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '32', discussion_id: '25', body: 'Does anyone remember Dragonball Z, the one with the white dude? Its like that! Dont watch it, its dumb!', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '31', discussion_id: '25', body: 'They did a great job bringing the manga to life! I highly recommend watching this!', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '48', discussion_id: '26', body: 'It is actually a very well thought out movie and it teaches people to live everyday like your last.', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '43', discussion_id: '26', body: 'I agree with you, this movie is like Twilight, a simple story with a linear story line.', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '49', discussion_id: '27', body: 'Well, its similar to when guys like to rap along with a song about getting girls and doing drugs. You\'re probably doing drugs, but you are not getting girls.', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '57', discussion_id: '27', body: 'Yes, my girlfriend always sings that song, and it just made me feel a certain way. So I started singing it and I think she understands now.', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '59', discussion_id: '28', body: 'This song is so beautiful, I tear up every time. And their chemistry is so strong. There was a fake story about them getting married and I totally believed it. ', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '52', discussion_id: '28', body: 'So well deserved! I love lady Gaga!', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '51', discussion_id: '29', body: 'That Oscars show might have been the best performace of all time! Including NHP\'s sorry buddy.' , created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '58', discussion_id: '29', body: 'His vocal range is so wide, I was excited to see his Queen come out. But he does lack the bass that Freddy Mercury had with his bigger mouth.', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
        {user_id: '1', discussion_id: '16', body: 'I think during her amnesia, Sanji is able to win her over to help their crew by making her another smaller wedding cake. This was foreshadowed when Zeus changed allegiances to Nami during the Big mom Arc.', created_at: Date.parse(
          faker.date.between(
            new Date(Date.now() - (1000 * 60 * 60 * 5)), // from 5 hours ago
            new Date(Date.now()) // to now
          )
        )},
      ]);
    });
};
