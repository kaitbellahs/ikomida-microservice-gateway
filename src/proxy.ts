import httpProxy from 'http-proxy'
import { IncomingMessage, ServerResponse } from 'http'
import { Socket } from 'net'
import { Url } from 'url'
import { Express, NextFunction, Request, Response } from 'express'
import { importSPKI, compactVerify } from 'jose'
import { Utils } from '@ikomida/shared-backend'
import { IRoute } from './routes.js'
import { Classes, Types } from '@ikomida/shared-types'

type ProxyTargetUrl = string | Partial<Url>

const logger = Utils.Logger.getInstance('gateway-microservice')

function logError(err: Error, req: any, res: any) {
  logger.error('Utils.iKomidaError: ', err)
  // logger.error(`Utils.iKomidaError:  ${JSON.stringify(err)}`);
  res.type('json')
  res.writeHead(500, {
    'Content-Type': 'application/json; charset=utf-8'
  })
  res.end(
    JSON.stringify(
      new Classes.Return(
        false,
        'Ocorreu um erro interno nos serviços, tente de novo mais tarde, e se o erro persiste entre em contato com nosso suporte'
      )
    )
  )
}

const proxy = httpProxy.createProxyServer()
proxy.on('error', logError)

export const setupProxies = async (app: Express, routes: IRoute[]) => {
  try {
    for (const route of routes) {
      const apiProxy = (req: Request, res: Response) => {
        req.headers.Xip = req?.ip
        proxy.web(
          req,
          res,
          route.proxy,
          (err: Error, req: IncomingMessage, res: ServerResponse | Socket, target?: ProxyTargetUrl) => {
            try {
              logger.error(
                `Proxy request: ${target?.toString()}, request: ${JSON.stringify(req.method)}: ${JSON.stringify(
                  req.url
                )}, error:`,
                err,
                res
              )
            } catch (exception) {
              logger.error(`Proxy request exception:`, exception)
            }
          }
        )
      }
      const middleware = [
        authenticateToken(route, logger),
        apiProxy,
        (req: Request, res: Response, next: NextFunction) => {
          logger.log('final step')
          return next()
        }
      ]
      if (route?.recaptcha) {
        middleware.unshift(async (req, res, next) => {
          let recaptcha
          const agent = req.headers?.['x-ikomida-agent']
          try {
            const challenge = req?.headers?.challenge as string
            if (challenge) {
              recaptcha = await new Utils.reCaptchaV3(logger)?.validate(challenge, req?.ip)
              req.headers.challenge = JSON.stringify({ score: recaptcha?.score, action: recaptcha?.action })
              if (recaptcha?.success && recaptcha?.score > 0.5 && recaptcha?.action === route?.recaptcha) {
                return next()
              }
            }
          } catch (error: any) {
            recaptcha = error.message
          }
          const logInfo = `App iKomidaId: ${req.headers?.['x-ikomida-id']}, Required-roles ${route?.roles
            }, Agent: ${agent}, IP: ${req?.ip}, method: ${req.method.toUpperCase()}, url: ${req?.url
            }, recaptcha-error: ${JSON.stringify(recaptcha)}`
          logger.error(logInfo)

          //TODO: disable next line after training recaptcha v3
          return next()
          return res.sendStatus(423)
        })
      }
      ; (app as any)?.[route.method.toLowerCase()]?.(route.url, middleware)
    }
  } catch (exception: any) {
    logger.error('setupProxies exception:', exception)
  }
}

function authenticateToken(route: IRoute, logger: Utils.Logger) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const agent = req.headers?.['x-ikomida-agent']
    const iKomidaID = req.headers?.['x-ikomida-id']
    let logInfo = `App iKomidaId: ${iKomidaID}, Platform: ${req.headers?.['x-ikomida-plateform']}, DeviceId: ${req.headers?.['x-ikomida-did']
      }, Required-auth ${route?.auth}, Required-roles ${route?.roles}, Agent: ${agent}, IP: ${req?.ip
      }, method: ${req.method.toUpperCase()}, url: ${req?.url}`
    try {
      const algorithm = 'PS256'
      const authHeader = req?.headers?.authorization
      const token = authHeader?.indexOf('Bearer ') === 0 && authHeader?.split(' ')?.[1]
      if (token) {
        const spki = Buffer.from(process.env.IKOMIDA_PUBLICKEY as string, 'base64').toString()
        const ecPublicKey = await importSPKI(spki, algorithm)
        const { payload } = await compactVerify(token, ecPublicKey)
        const identityString = new TextDecoder().decode(payload)
        const identity: Classes.CUser = Classes.CUser.fromObject(JSON.parse(identityString))
        const role = identity?.role
        logInfo += `, Login: ${identity !== null}, User: ${identity.name} ${identity.lastName}, Phone: ${identity.areaCode
          } ${identity.phone}, Role: ${role?.id ?? 'Unkown'}, User iKomidaId: ${identity.ikomidaID}, User Platform: ${identity?.platform
          }, User DeviceId: ${identity?.deviceId}`
        if (
          !route.auth ||
          (iKomidaID === identity.ikomidaID &&
            (route?.roles === Types.TRoles.ALL ||
              (Array.isArray(route?.roles) && role && route?.roles?.includes(role)) ||
              (!Array.isArray(route?.roles) && route?.roles === role)) &&
            ((role && Types.TRoles.isInternal(role)) || role == Types.TRoles.CLIENT
              ? true
              : req.headers?.['x-ikomida-did'] === identity.deviceId &&
              req.headers?.['x-ikomida-plateform'] === identity.platform))
        ) {
          req.headers.identity = JSON.stringify(identity.toJSON())
          logger.log(logInfo)
          return next()
        }
        logInfo += `, Auth failed`
      } else if (!route.auth) {
        return next()
      }
    } catch (error: any) {
      logInfo += `, Auth-Exception: ${error.message}`
    }
    logger.error(logInfo)
    return res.sendStatus(401)
  }
}
