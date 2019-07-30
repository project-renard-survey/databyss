const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const sgMail = require('@sendgrid/mail')

const { check, validationResult } = require('express-validator/check')

const router = express.Router()

const User = require('../../models/User')

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
      let user = await User.findOne({ email })

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] })
      }

      user = new User({
        name,
        email,
        password,
      })

      const salt = await bcrypt.genSalt(10)

      user.password = await bcrypt.hash(password, salt)

      await user.save()

      const payload = {
        user: {
          id: user.id,
        },
      }

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
      return res.status(200)
    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Server error')
    }
  }
)

// @route    POST api/users/google
// @desc     create or get profile info for google user
// @access   Public
router.post('/google', async (req, res) => {
  const { token } = req.body

  console.log(token)
  axios
    .get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`)
    .then(async response => {
      const id = response.data.sub
      try {
        let user = await User.findOne({ googleId: id })

        if (user) {
          const payload = {
            user: {
              id: user.id,
            },
          }
          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
              if (err) throw err
              res.json({ token })
            }
          )
        }

        const { name, email, sub } = response.data
        user = new User({
          name,
          email,
          googleId: sub,
        })

        await user.save()

        const payload = {
          user: {
            id: user.id,
          },
        }

        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: '1y' },
          (err, token) => {
            if (err) throw err
            res.json({ token })
          }
        )
        return res.status(200)
      } catch (err) {
        console.error(err.message)
        return res.status(500).send('Server Error')
      }
    })
    .catch(err => {
      console.error(err.message)
      return res.status(400).json({ msg: 'There is no profile for this user' })
    })
})

// @route    POST api/users/email
// @desc     creates new user and sends email
// @access   Public
router.post(
  '/email',
  [check('email', 'Please include a valid email').isEmail()],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const { email } = req.body

    try {
      let user = await User.findOne({ email })

      if (!user) {
        // Creates new user
        user = new User({
          email,
        })
        await user.save()
      }

      const payload = {
        user: {
          id: user.id,
        },
      }
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1y' },
        (err, token) => {
          if (err) throw err
          const msg = {
            to: email,
            from: 'test@email.com',
            subject: 'Log in to Databyss',
            text: 'Click here to log in to Databyss',
            html: `<p>Click <a href="${
              process.env.HOST
            }/login/${token}">here</a> to log in to Databyss</p>`,
          }
          sgMail.send(msg)
          res.status(200).send('check email')
        }
      )

      return res.status(200)
    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Server error')
    }
  }
)

module.exports = router
