const faker = require('faker');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('discussions')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('discussions').insert([
        {user_id: '1', category_id: '1',
          body: 'RULES OF CONDUCT: Please refer to this channel for the proper code of conduct. Our HR will be ready to answer any questions posted.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '1', category_id: '1',
          body: 'All of our programming will now be done solely by Lambda School. They are the most incredible development program we\'ve ever experienced and they are incredibly generous.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '1', category_id: '1',
          body: 'We are currently looking to hire 10 new marketing interns. Applicant must currently be in college majoring in business finance, business management, graphic arts, psychology, or sociology. Please post your recommendations here with a copy of their Resume.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '1', category_id: '1',
          body: 'Office Game of Thrones Watch Party. Where: David Situ\'s House. Time: 5PM Pacific. There will be a raffle for best and funniest costumes. Valar morghulis.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '1', category_id: '1',
          body: 'We are going to begin implementing a yoga program in the morning before work at 7:00AM for those of you who would like to attend. Please post any concerns or questions here.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '2', category_id: '1',
          body: 'Starting April 1st, 2019, we will be implementing a 24/7 open bar in the marketing department to enhance creativity. April Fools! Please keep your pranks this year to a minimum. No repeat of what happened last year.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '2', category_id: '1',
          body: 'All Communication will now be held in Symposium. Urgent matters will be posted in Anouncements, please turn notifications on for this channel.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '2', category_id: '2',
          body: 'Dev Team RULES OF CONDUCT: Codes of Conduct, Rules of Effective Communication', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '2', category_id: '2',
          body: 'Dev Team News: This channel will be for any world news that you think will be affecting our company\'s Dev Team.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '2', category_id: '2',
          body: 'Dev Team Announcements: This channel will be used for major company announcements that will be affecting the Dev Team.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '2', category_id: '2',
          body: 'Dev Team Projects: Please locate your team\'s project and communicate within that channel with your team.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '2', category_id: '2',
        body: 'Dev Team General: This channel will be a general chat for anything within the scope of the rules of communication.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '3', category_id: '3',
          body: 'Design Team RULES OF CONDUCT: This channel contains the rules of communication and code of conduct. Questions will be answered by a Design Team Leader.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '3', category_id: '3',
          body: 'Design Team Announcements: This channel will be used for any company changes that affects the Design Team.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '3', category_id: '3',
          body: 'Design Team Projects: This channel will be used for communication between your team. Find your team\'s chat within in this channel', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '3', category_id: '4',
          body: 'Marketing Team RULES OF CONDUCT: This channel contains the rules of communication and code of conduct. Questions will be answered by a Marketing Team Leader.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '3', category_id: '4',
          body: 'Marketing Team Announcements: This channel will be used for any company changes that affects the Marketing Team.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '3', category_id: '4',
          body: 'Marketing Team Projects: This channel will be used for communication between your team. Find your team\'s chat within in this channel.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '3', category_id: '4',
          body: 'Marketing Team General: This channel will be a general chat for anything within the scope of the rules of communication.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '3', category_id: '5',
          body: 'HR Team RULES OF CONDUCT: This channel contains the rules of communication and code of conduct. Questions will be answered by a Senior HR team member.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '3', category_id: '5',
          body: 'HR Team Announcements: This channel will be used for any company changes that affects the HR Team.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '4', category_id: '5',
          body: 'HR Projects: This channel will be used to separate current projects, so relevant communication should be in the appropriate sub-channel.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '4', category_id: '5',
          body: 'HR Ideas Channel: This channel will be used to promote new ideas, or elaboration on current ones.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '3', category_id: '6',
          body: 'Product Managers Team RULES OF CONDUCT: This channel contains the rules of communication and code of conduct. Questions will be answered by a Senior Product Managers team member.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '5', category_id: '6',
          body: 'Product Managers Team Announcements: This channel will be used for any company changes that affects the Product Managers Team.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '6', category_id: '6',
          body: 'Product Managers Team Projects: This channel will be used for communicating in specific projects. Please locate the appropriate channel to post your comments in.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '5', category_id: '7',
          body: 'QA RULES OF CONDUCT: This channel contains the rules of communication and code of conduct for Questions and Answers.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '3', category_id: '7',
          body: 'Questions and Answers Topic: Company - Please ask questions that is related to the company. Questions will be answered by Senior team personnel. ', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
        {user_id: '4', category_id: '7',
          body: 'Questions and Answers Topic: General - This channel is for general questions. Questions can be answered by any employee.', created_at: Date.parse(
            faker.date.between(
              new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
              new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
            )
          )},
      ]);
    });
};
