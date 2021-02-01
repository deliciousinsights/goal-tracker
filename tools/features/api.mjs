import express from 'express'

const router = new express.Router()
let fail = false

router.post('/sessions', async (req, res) => {
  await delay(500)

  if (fail) {
    return res.status(503).json({ status: 'simulated bad gateway failure' })
  }

  const { email = '', password = '' } = req.body
  const [prefix] = email.split('@')
  if (prefix.toLowerCase() === String(password).toLowerCase()) {
    res.status(201).json({ status: 'authenticated', email })
  } else {
    res.status(401).json({ status: 'authentication failed' })
  }
})

router.put('/failmode/:fail', (req, res) => {
  fail = req.params.fail === 'on'
  res.status(200).json({ failureMode: fail ? 'on' : 'off' })
})

export default router

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
