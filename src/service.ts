import express from 'express'
import cors from 'cors'
import compression from 'compression'

import { Utils } from '@ikomida/shared-backend'
import morgan from 'morgan'
import Routes from './routes.js'
import { setupProxies } from './proxy.js'

import { createRequire } from 'module'

const require = createRequire(import.meta.url)
let { name } = require('../package.json')
name = name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
  .replace(/^\w/, (m: string) => m.toUpperCase())
  .replace(/-\w/g, (m: string) => m[1].toUpperCase())
const logger = Utils.Logger.getInstance(name)
try {
  const app = express()

  app.set('trust proxy', true)
  app.use(compression())
  app.use(morgan('combined'))
  app.disable('x-powered-by')
  app.use(cors())
  setupProxies(app, Routes)
  Utils.System.setExpressResponse(app)
  const port = process?.env?.PORT ?? 80

  app.get('/ping', async (_, res) => {
    res.sendResponse('PONG')
  })

  app.get('/', async (req, res) => {
    res.status(200).send()
  })

  app.all('*', async (req, res) => {
    logger.error(`Endpoint: "${req?.url}" not found:`)
    res.status(404).sendResponse({ error: 'NOT FOUND' })
  })
  app.listen(port, () => {
    logger.info(`${name} listening at http://localhost:${port}`)
  })
} catch (exception: any) {
  const error = new Utils.iKomidaError(Utils.iKomidaError.IKOMIDA_GATEWAY_SERVICE_CREATE_LISTNING_EXCEPTION, exception)
  error.log(logger)
}
