const maxFollowers = 3; 


const getRandomFollowerCount = () => {
  return Math.floor(Math.random() * maxFollowers  ) + 1;
}

const createUsersToFollow = (currentUserId) => {
  const followThese = [];
  const amountToFollow = getRandomFollowerCount();
  while(followThese.length <= amountToFollow){
    const randomId1 = Math.floor(Math.random() * 500) + 1; 
    const randomId2 = Math.floor(Math.random() * 500) + 1;
    const randomId3 = Math.floor(Math.random() * 500) + 1;
    const randomId4 = Math.floor(Math.random() * 500) + 1;
    if (followThese.includes(randomId1) === false && randomId1 !== currentUserId ){
      followThese.push(randomId1); 
    }
    if (followThese.includes(randomId2) === false && randomId2 !== currentUserId ){
      followThese.push(randomId2); 
    }
    if (followThese.includes(randomId3) === false && randomId3 !== currentUserId){
      followThese.push(randomId3); 
    }
    if (followThese.includes(randomId4) === false && randomId4 !== currentUserId){
      followThese.push(randomId4); 
    }
  }
  return followThese;
}



const createFollowList = () => {
  const completeFollowList = [];
  let currentUserId = 1; 
  let followId = 1; 
  while(currentUserId !== 500){
    const grabFollowers = createUsersToFollow(currentUserId);
    for(let followId of grabFollowers){
      completeFollowList.push({id: followId, user_id: currentUserId, following_id: followId});
      followId += 1;
    }
    //Now increase the currentUserID 
    currentUserId += 1;
  }
  return completeFollowList; 
}




exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_followers').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_followers').insert(createFollowList());
    });
};