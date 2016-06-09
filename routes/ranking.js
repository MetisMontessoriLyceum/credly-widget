let express = require('express')
let router = express.Router()
let credly = require('../lib/credly')

function resolveUserId(userId) {
  return new Promise(function(resolve, reject) {
    if (parseInt(userId) === NaN) {
      resolve(parseInt(userId));
    }
    else {
      credly.request(`/members/${userId}`).then(data => {
        resolve(data.id);
      })
    }
  });
}

router.get('/:id/:badge', function(req, res, next) {

  resolveUserId(req.params.id).then(userId => {
    let badgeTitle = req.params.badge;
    credly.request(`/members/${userId}/badges/given`).then(badgesGiven => {
      let resJson = [];
      let users = [];
      badgesGiven
        .filter(badge => badge.title === badgeTitle)
        .forEach(badge => {
          resJson.push(badge.member.display_name);
          users.push(badge.member);
        });

      console.log(resJson);
      console.log(users);

      let apiPromises = [];

      for (let i=0; i<users.length; i++) {
        console.log(`pushing ${users[i].id}`);
        apiPromises.push(credly.request(`/members/${users[i].id}/badges`));
      }

      console.log(apiPromises);

      Promise.all(apiPromises).then(apiRes => {
        let data = {users: []};
        for (let userIndex=0; userIndex<apiRes.length; userIndex++) {
          let name = users[userIndex].display_name;
          let badges = apiRes[userIndex];
          let ICTInDeWolkenBadges = badges.filter(badge => {
            return badge.issuer.slug == 'ictindewolken';
          });
          data.users.push({name: name, numberOfCoderClassBadges: ICTInDeWolkenBadges.length});
          console.log(`${name} has ${badges.length} badges, from \
            with ${ICTInDeWolkenBadges.length} are ICT in de wolken badges`);
        }
        data.users.sort((a, b) => b.numberOfCoderClassBadges - a.numberOfCoderClassBadges);
        res.render('ranking', data);
      })
    })
  })


  // let userId = await resolveUserId(req.params.id)
  // let badgeTitle = req.params.badge;
  //
  // let badgesGiven = await credly.request(`/members/${userId}/badges/given`)
  // let resJson = []
  // badgesGiven
  //   .filter(badge => badge.title === badgeTitle)
  //   .forEach(badge => {
  //     resJson.push(badge.member.display_name);
  //   })
  // res.json(resJson);


//   let users = req.params.id.split('+')
//
//   let allApiPromises = []
//
//   for (let i=0; i<users.length; i++) {
//     let apiPromises = [
//       credly.request(`/members/${users[i]}`),
//       credly.request(`/members/${users[i]}/badges`)
//     ]
//
//     allApiPromises.push(Promise.all(apiPromises))
//   }
//
//   Promise.all(allApiPromises).then(apiRes => {
//     for (let userIndex=0; userIndex<apiRes.length; userIndex++) {
//       let name = apiRes[userIndex][0].display_name;
//       let badges = apiRes[userIndex][1];
//       let ICTInDeWolkenBadges = badges.filter(badge =>
//         badge.issuer.slug == 'ictindewolken')
//       console.log(`${name} has ${badges.length} badges, from \
// with ${ICTInDeWolkenBadges.length} are ICT in de wolken badges`);
//     }
//     res.json(apiRes)
//   })

  // let user = {}
  //
  // let apiPromises = [
  //   credly.request(`/members/${req.params.id}`),
  //   credly.request(`/members/${req.params.id}/badges`)
  // ]
  //
  // console.time('api requests')
  // Promise.all(apiPromises).then(apiRes => {
  //   console.timeEnd('api requests')
  //   user.name = apiRes[0].display_name
  //   user.badges = apiRes[1].map(badge => {
  //     return {
  //       title: badge.title,
  //       description: badge.description,
  //       image: badge.image
  //     }
  //   })
  //   res.render('index',{user: user})
  // })

})

module.exports = router
