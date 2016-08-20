let express = require('express')
let router = express.Router()
let credly = require('../lib/credly')

router.get('/:id', function(req, res, next) {

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
  //   console.log(user);
  //   res.render('badges',{user: user})
  // })

  // credly.request(`/members/${req.params.id}`)
  //   .then(data => {
  //     user.name = data.data.display_name
  //     return credly.request(`/members/${data.data.id}/badges`)
  //   })
  //   .then(data => {
  //     console.timeEnd('credly api request')
  //
  //     user.badges = data.data.map(badge => {
  //       return {
  //         title: badge.title,
  //         description: badge.description,
  //         image: badge.image
  //       }
  //     })
  //
  //     res.render('index',{user: user})
  //   })

  res.render('badges',{user:
  { name: 'Noah Loomans',
    badges:
     [ { title: 'SQL-0',
         description: 'De inhoud van de badge vind je onder\r\n\r\nhttp://infvo.com/ictindewolken/index.php?title=Badges/SQL-0\r\n\r\nAls bewijs lever je de link in naar je wikipagina waar je de uitwerkingen neergezet hebt.\r\n\r\n&nbsp;\r\n\r\n&nbsp;',
         image: 'https://credlyapp.s3.amazonaws.com/badges/8ad76304ff4d51edb2c6a380c3175f94.png' },
       { title: 'HTML-0',
         description: 'De inhoud van de badge en de ondersteunende module kan je vinden in de wiki.\r\n\r\nhttp://infvo.com/ictindewolken/index.php?title=Badges/HTML-0\r\n\r\nAls bewijs lever je de link naar je gemaakte website in.',
         image: '/offline_dev/fef4b7203b1b5e5f05e192ced26118c9.png' },
       { title: 'Linux-0',
         description: 'Deze badge geeft aan dat je een aantal basisprincipes van Linux beheerst, zoals je deze als gebruiker tegenkomt.\r\n\r\nVoor de opdrachten, zie: http://infvo.com/basis/index.php?title=Modules/Linux-0',
         image: 'https://credlyapp.s3.amazonaws.com/badges/979a57791a2e2827983f80aebfd24041.png' },
       { title: 'Credly Member',
         description: 'Credly is the universal way to recognize, store, and share evidence of lifelong achievement in any setting. This credit recognizes those who have joined and are now active members of the growing Credly community.',
         image: '/offline_dev/0c883ab7a89327d278050bb90a1daf5a.png' } ] }
  })

})

module.exports = router
