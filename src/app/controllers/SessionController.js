const { User } = require('../models')

class SessionController {
  async create(req, res) {
    return res.render('auth/signin')
  }

  async store(req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      console.log('Usuário ou senha incorreto')
      return res.redirect('/')
    }

    if (!(await user.checkPassword(password))) {
      console.log('Usuário ou senha incorreto')
      return res.redirect('/')
    }

    return res.redirect('/dashboars')
  }
}

module.exports = new SessionController()