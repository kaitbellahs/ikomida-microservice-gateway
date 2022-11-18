import { BackendTypes, Domain, Types } from '@ikomida/shared-backend'

export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}
export class IProxy {
  target: string
  changeOrigin: boolean

  constructor(target: string, changeOrigin: boolean) {
    this.target = target
    this.changeOrigin = changeOrigin
  }
}
export class IRoute {
  url: string
  method: Methods
  roles: Types.Types.TRoles[] | Types.Types.TRoles | null
  auth: boolean
  proxy: IProxy
  recaptcha?: string

  constructor(
    url: string,
    method: Methods,
    roles: Types.Types.TRoles[] | Types.Types.TRoles | null,
    auth: boolean,
    proxy: IProxy,
    recaptcha?: string
  ) {
    this.url = url
    this.method = method
    this.roles = roles
    this.auth = auth
    this.proxy = proxy
    this.recaptcha = recaptcha
  }
}

export default [
  new IRoute('/pubKey', Methods.GET, Types.Types.TRoles.CLIENT, true, new IProxy(Domain.MicroService.payments, true)),
  new IRoute('/products', Methods.GET, Types.Types.TRoles.ALL, false, new IProxy(Domain.MicroService.products, true)),
  new IRoute(
    '/product/:id',
    Methods.GET,
    Types.Types.TRoles.ALL,
    false,
    new IProxy(Domain.MicroService.products, true)
  ),
  new IRoute(
    '/lowQuantityProducts',
    Methods.GET,
    [Types.Types.TRoles.VENDOR, Types.Types.TRoles.STAFF, Types.Types.TRoles.ADMIN],
    true,
    new IProxy(Domain.MicroService.products, true)
  ),
  new IRoute(
    '/product/:id',
    Methods.PATCH,
    [Types.Types.TRoles.VENDOR, Types.Types.TRoles.STAFF, Types.Types.TRoles.ADMIN],
    true,
    new IProxy(Domain.MicroService.products, true)
  ),
  new IRoute(
    '/productsCount',
    Methods.GET,
    [Types.Types.TRoles.VENDOR, Types.Types.TRoles.STAFF],
    true,
    new IProxy(Domain.MicroService.products, true)
  ),
  new IRoute(
    '/categories',
    Methods.GET,
    [Types.Types.TRoles.CLIENT, Types.Types.TRoles.VENDOR, Types.Types.TRoles.STAFF],
    true,
    new IProxy(Domain.MicroService.products, true)
  ),
  new IRoute(
    '/image/:imageUri',
    Methods.GET,
    [Types.Types.TRoles.CLIENT, Types.Types.TRoles.VENDOR, Types.Types.TRoles.STAFF],
    false,
    new IProxy(Domain.MicroService.products, true)
  ),
  new IRoute(
    '/product/:id',
    Methods.DELETE,
    Types.Types.TRoles.VENDOR,
    true,
    new IProxy(Domain.MicroService.products, true)
  ),
  new IRoute(
    '/category/:id',
    Methods.DELETE,
    Types.Types.TRoles.VENDOR,
    true,
    new IProxy(Domain.MicroService.products, true)
  ),
  new IRoute(
    '/productoption/:id',
    Methods.DELETE,
    [Types.Types.TRoles.VENDOR, Types.Types.TRoles.STAFF],
    true,
    new IProxy(Domain.MicroService.products, true)
  ),
  new IRoute(
    '/productoptionscategory/:id',
    Methods.DELETE,
    [Types.Types.TRoles.VENDOR, Types.Types.TRoles.STAFF],
    true,
    new IProxy(Domain.MicroService.products, true)
  ),
  new IRoute('/product', Methods.PUT, Types.Types.TRoles.VENDOR, true, new IProxy(Domain.MicroService.products, true)),
  new IRoute('/category', Methods.PUT, Types.Types.TRoles.VENDOR, true, new IProxy(Domain.MicroService.products, true)),
  new IRoute(
    '/product',
    Methods.POST,
    [Types.Types.TRoles.VENDOR, Types.Types.TRoles.STAFF],
    true,
    new IProxy(Domain.MicroService.products, true)
  ),
  new IRoute('/category', Methods.PUT, Types.Types.TRoles.VENDOR, true, new IProxy(Domain.MicroService.products, true)),
  new IRoute(
    '/category',
    Methods.POST,
    [Types.Types.TRoles.VENDOR, Types.Types.TRoles.STAFF],
    true,
    new IProxy(Domain.MicroService.products, true)
  ),
  new IRoute(
    '/order',
    Methods.PUT,
    [Types.Types.TRoles.VENDOR, Types.Types.TRoles.STAFF, Types.Types.TRoles.CLIENT],
    true,
    new IProxy(Domain.MicroService.orders, true),
    'editOrder'
  ),
  new IRoute(
    '/order',
    Methods.POST,
    Types.Types.TRoles.CLIENT,
    true,
    new IProxy(Domain.MicroService.orders, true),
    'newOrder'
  ),
  new IRoute(
    '/ordersCount',
    Methods.GET,
    [Types.Types.TRoles.VENDOR, Types.Types.TRoles.STAFF],
    true,
    new IProxy(Domain.MicroService.orders, true)
  ),
  new IRoute(
    '/usersCount',
    Methods.GET,
    [Types.Types.TRoles.VENDOR, Types.Types.TRoles.STAFF],
    true,
    new IProxy(Domain.MicroService.users, true)
  ),
  new IRoute('/settings', Methods.GET, Types.Types.TRoles.CLIENT, false, new IProxy(Domain.MicroService.users, true)),
  new IRoute(
    '/password',
    Methods.POST,
    [
      Types.Types.TRoles.VENDOR,
      Types.Types.TRoles.STAFF,
      Types.Types.TRoles.CLIENT,
      Types.Types.TRoles.ADMIN,
      Types.Types.TRoles.MANAGER,
      Types.Types.TRoles.MARKETING,
      Types.Types.TRoles.RESELLER
    ],
    true,
    new IProxy(Domain.MicroService.users, true),
    'updatePassword'
  ),
  new IRoute('/auth', Methods.POST, null, false, new IProxy(Domain.MicroService.users, true), 'login'),
  new IRoute(
    '/logout',
    Methods.DELETE,
    Types.Types.TRoles.ALL,
    true,
    new IProxy(Domain.MicroService.users, true),
    'logout'
  ),
  new IRoute(
    '/requestPhoneValidation',
    Methods.POST,
    null,
    false,
    new IProxy(Domain.MicroService.users, true),
    'requestPhoneValidation'
  ),
  new IRoute(
    '/requestPasswordPhoneValidation',
    Methods.POST,
    null,
    false,
    new IProxy(Domain.MicroService.users, true),
    'requestPasswordPhoneValidation'
  ),
  new IRoute(
    '/validatePhoneValidationCode',
    Methods.POST,
    null,
    false,
    new IProxy(Domain.MicroService.users, true),
    'validatePhoneValidationCode'
  ),
  new IRoute(
    '/validatePasswordPhoneValidationCode',
    Methods.POST,
    null,
    false,
    new IProxy(Domain.MicroService.users, true),
    'validatePasswordPhoneValidationCode'
  ),
  new IRoute('/subscribe', Methods.POST, null, false, new IProxy(Domain.MicroService.users, true), 'subscribe'),
  new IRoute(
    '/requestPassword',
    Methods.POST,
    null,
    false,
    new IProxy(Domain.MicroService.users, true),
    'requestPassword'
  ),
  new IRoute(
    '/profile/avatar',
    Methods.PATCH,
    Types.Types.TRoles.ALL,
    true,
    new IProxy(Domain.MicroService.users, true)
  ),
  new IRoute('/profile', Methods.GET, Types.Types.TRoles.ALL, true, new IProxy(Domain.MicroService.users, true)),
  new IRoute(
    '/orders/:timestamp',
    Methods.GET,
    [Types.Types.TRoles.CLIENT, Types.Types.TRoles.VENDOR, Types.Types.TRoles.STAFF],
    true,
    new IProxy(Domain.MicroService.orders, true)
  ),
  new IRoute(
    '/order/:id',
    Methods.GET,
    [Types.Types.TRoles.CLIENT, Types.Types.TRoles.VENDOR, Types.Types.TRoles.STAFF],
    true,
    new IProxy(Domain.MicroService.orders, true)
  ),
  new IRoute(
    '/orders/:timestamp/history',
    Methods.GET,
    [Types.Types.TRoles.CLIENT, Types.Types.TRoles.VENDOR, Types.Types.TRoles.STAFF],
    true,
    new IProxy(Domain.MicroService.orders, true)
  ),
  new IRoute('/payments', Methods.GET, Types.Types.TRoles.CLIENT, true, new IProxy(Domain.MicroService.payments, true)),
  new IRoute(
    '/payeridtypes',
    Methods.GET,
    [Types.Types.TRoles.VENDOR, Types.Types.TRoles.CLIENT],
    false,
    new IProxy(Domain.MicroService.payments, true)
  ),
  new IRoute(
    '/cardinfo/:cardNumber',
    Methods.GET,
    [Types.Types.TRoles.VENDOR, Types.Types.TRoles.CLIENT],
    false,
    new IProxy(Domain.MicroService.payments, true)
  ),
  new IRoute(
    '/payment',
    Methods.POST,
    Types.Types.TRoles.CLIENT,
    true,
    new IProxy(Domain.MicroService.payments, true),
    'newCreditCard'
  ),
  new IRoute(
    '/webhooks/pagseguro/:contractID',
    Methods.POST,
    [],
    false,
    new IProxy(Domain.MicroService.payments, true)
  ),
  new IRoute('/webhooks/asaas', Methods.POST, [], false, new IProxy(Domain.MicroService.payments, true)),
  new IRoute(
    '/payment/:id',
    Methods.PUT,
    Types.Types.TRoles.CLIENT,
    true,
    new IProxy(Domain.MicroService.payments, true)
  ),
  new IRoute(
    '/payment/:id',
    Methods.DELETE,
    Types.Types.TRoles.CLIENT,
    true,
    new IProxy(Domain.MicroService.payments, true)
  ),
  new IRoute(
    '/processPayment',
    Methods.POST,
    Types.Types.TRoles.CLIENT,
    true,
    new IProxy(Domain.MicroService.payments, true)
  ),
  new IRoute(
    '/coupon',
    Methods.POST,
    [Types.Types.TRoles.CLIENT, Types.Types.TRoles.VENDOR, Types.Types.TRoles.STAFF],
    true,
    new IProxy(Domain.MicroService.payments, true)
  ),
  new IRoute(
    '/coupons/:timestamp',
    Methods.GET,
    [Types.Types.TRoles.VENDOR, Types.Types.TRoles.STAFF, Types.Types.TRoles.STAFF],
    true,
    new IProxy(Domain.MicroService.payments, true)
  ),
  new IRoute(
    '/couponsCount',
    Methods.GET,
    [Types.Types.TRoles.VENDOR, Types.Types.TRoles.STAFF],
    true,
    new IProxy(Domain.MicroService.payments, true)
  ),
  new IRoute(
    '/coupon/:id',
    Methods.DELETE,
    Types.Types.TRoles.VENDOR,
    true,
    new IProxy(Domain.MicroService.payments, true)
  ),
  new IRoute('/addresses', Methods.GET, Types.Types.TRoles.CLIENT, true, new IProxy(Domain.MicroService.users, true)),
  new IRoute('/address', Methods.POST, Types.Types.TRoles.CLIENT, true, new IProxy(Domain.MicroService.users, true)),
  new IRoute('/address/:id', Methods.PUT, Types.Types.TRoles.CLIENT, true, new IProxy(Domain.MicroService.users, true)),
  new IRoute(
    '/address/:id',
    Methods.DELETE,
    Types.Types.TRoles.CLIENT,
    true,
    new IProxy(Domain.MicroService.users, true)
  ),
  new IRoute(
    '/cep/:cep',
    Methods.GET,
    [
      Types.Types.TRoles.CLIENT,
      Types.Types.TRoles.VENDOR,
      Types.Types.TRoles.RESELLER,
      Types.Types.TRoles.ADMIN,
      Types.Types.TRoles.STAFF
    ],
    false,
    new IProxy(Domain.MicroService.generics, true)
  ),
  new IRoute(
    '/requestContact',
    Methods.POST,
    Types.Types.TRoles.ALL,
    false,
    new IProxy(Domain.MicroService.generics, true),
    'requestContact'
  ),
  new IRoute(
    '/term/:type',
    Methods.GET,
    [Types.Types.TRoles.CLIENT, Types.Types.TRoles.VENDOR, Types.Types.TRoles.RESELLER, Types.Types.TRoles.ADMIN],
    false,
    new IProxy(Domain.MicroService.generics, true)
  ),
  new IRoute(
    '/termID/:type',
    Methods.GET,
    [Types.Types.TRoles.CLIENT, Types.Types.TRoles.VENDOR, Types.Types.TRoles.RESELLER, Types.Types.TRoles.ADMIN],
    false,
    new IProxy(Domain.MicroService.generics, true)
  ),
  new IRoute(
    '/contract/requestPhoneValidation',
    Methods.POST,
    null,
    false,
    new IProxy(Domain.MicroService.contracts, true),
    'requestContractPhoneValidation'
  ),
  new IRoute(
    '/contract/validatePhoneValidationCode',
    Methods.POST,
    null,
    false,
    new IProxy(Domain.MicroService.contracts, true),
    'validateContractPhoneValidationCode'
  ),
  new IRoute('/contract', Methods.POST, null, false, new IProxy(Domain.MicroService.contracts, true), 'newContract'),
  new IRoute('/plans', Methods.GET, null, false, new IProxy(Domain.MicroService.contracts, true)),
  new IRoute(
    '/reseller',
    Methods.POST,
    [Types.Types.TRoles.RESELLER, Types.Types.TRoles.VENDOR, Types.Types.TRoles.ADMIN],
    true,
    new IProxy(Domain.MicroService.resellers, true),
    'newReseller'
  ),
  new IRoute(
    '/resellers/:timestamp',
    Methods.GET,
    [Types.Types.TRoles.RESELLER, Types.Types.TRoles.VENDOR, Types.Types.TRoles.ADMIN],
    true,
    new IProxy(Domain.MicroService.resellers, true)
  ),
  new IRoute(
    '/restaurants/:timestamp',
    Methods.GET,
    [Types.Types.TRoles.RESELLER, Types.Types.TRoles.VENDOR, Types.Types.TRoles.ADMIN],
    true,
    new IProxy(Domain.MicroService.resellers, true)
  ),
  new IRoute(
    '/vendor/subscription',
    Methods.GET,
    Types.Types.TRoles.VENDOR,
    true,
    new IProxy(Domain.MicroService.payments, true)
  ),
  new IRoute(
    '/vendor/businessHours',
    Methods.PUT,
    [Types.Types.TRoles.VENDOR, Types.Types.TRoles.STAFF],
    true,
    new IProxy(Domain.MicroService.vendorSettings, true)
  ),
  new IRoute(
    '/vendor/pagSeguroUrl',
    Methods.GET,
    Types.Types.TRoles.VENDOR,
    true,
    new IProxy(Domain.MicroService.vendorSettings, true),
    'pagSeguroUrl'
  ),
  new IRoute(
    '/vendor/delivery',
    Methods.PUT,
    [Types.Types.TRoles.VENDOR, Types.Types.TRoles.STAFF],
    true,
    new IProxy(Domain.MicroService.vendorSettings, true)
  ),
  new IRoute(
    '/vendor/updatePaymentGateway',
    Methods.PUT,
    Types.Types.TRoles.VENDOR,
    true,
    new IProxy(Domain.MicroService.vendorSettings, true),
    'updatePaymentGateway'
  ),
  new IRoute(
    '/vendor/revokePaymentGateway',
    Methods.DELETE,
    Types.Types.TRoles.VENDOR,
    true,
    new IProxy(Domain.MicroService.vendorSettings, true),
    'revokePaymentGateway'
  ),
  new IRoute(
    '/vendor/settings',
    Methods.GET,
    [Types.Types.TRoles.VENDOR, Types.Types.TRoles.STAFF],
    true,
    new IProxy(Domain.MicroService.vendorSettings, true)
  ),
  new IRoute(
    '/vendor/limits',
    Methods.GET,
    [Types.Types.TRoles.VENDOR, Types.Types.TRoles.STAFF],
    true,
    new IProxy(Domain.MicroService.vendorSettings, true)
  ),
  new IRoute(
    '/vendor/staff/:timestamp',
    Methods.GET,
    Types.Types.TRoles.VENDOR,
    true,
    new IProxy(Domain.MicroService.vendorSettings, true)
  ),
  new IRoute(
    '/vendor/staff',
    Methods.POST,
    Types.Types.TRoles.VENDOR,
    true,
    new IProxy(Domain.MicroService.vendorSettings, true)
  ),
  new IRoute(
    '/vendor/staff/:id',
    Methods.DELETE,
    Types.Types.TRoles.VENDOR,
    true,
    new IProxy(Domain.MicroService.vendorSettings, true)
  ),
  new IRoute('/layout', Methods.GET, [], false, new IProxy(Domain.MicroService.vendorSettings, true)),
  new IRoute(
    '/layout',
    Methods.PUT,
    [Types.Types.TRoles.VENDOR, Types.Types.TRoles.STAFF],
    true,
    new IProxy(Domain.MicroService.vendorSettings, true)
  ),
  new IRoute(
    '/vendor/settings',
    Methods.PUT,
    [Types.Types.TRoles.VENDOR, Types.Types.TRoles.STAFF],
    true,
    new IProxy(Domain.MicroService.vendorSettings, true)
  ),
  new IRoute(
    '/notification/register',
    Methods.POST,
    Types.Types.TRoles.ALL,
    true,
    new IProxy(Domain.MicroService.pushNotification, true)
  ),
  new IRoute(
    '/vendor/pushNotifications/:timestamp',
    Methods.GET,
    [Types.Types.TRoles.VENDOR, Types.Types.TRoles.STAFF, Types.Types.TRoles.ADMIN],
    true,
    new IProxy(Domain.MicroService.pushNotification, true)
  ),
  new IRoute(
    '/pushNotifications/:timestamp',
    Methods.GET,
    Types.Types.TRoles.ALL,
    true,
    new IProxy(Domain.MicroService.pushNotification, true)
  ),
  new IRoute(
    '/vendor/pushNotification',
    Methods.POST,
    [Types.Types.TRoles.VENDOR, Types.Types.TRoles.STAFF, Types.Types.TRoles.ADMIN],
    true,
    new IProxy(Domain.MicroService.pushNotification, true)
  ),
  new IRoute(
    '/admin/*',
    Methods.POST,
    [
      Types.Types.TRoles.MARKETING,
      Types.Types.TRoles.MANAGER,
      Types.Types.TRoles.ADMIN,
      Types.Types.TRoles.ANALYTICAL,
      Types.Types.TRoles.APP,
      Types.Types.TRoles.FINANCE
    ],
    true,
    new IProxy(Domain.MicroService.admin, true)
  ),
  new IRoute(
    '/admin/*',
    Methods.PATCH,
    [
      Types.Types.TRoles.MARKETING,
      Types.Types.TRoles.MANAGER,
      Types.Types.TRoles.ADMIN,
      Types.Types.TRoles.ANALYTICAL,
      Types.Types.TRoles.APP,
      Types.Types.TRoles.FINANCE
    ],
    true,
    new IProxy(Domain.MicroService.admin, true)
  ),
  new IRoute(
    '/admin/*',
    Methods.GET,
    [
      Types.Types.TRoles.MARKETING,
      Types.Types.TRoles.MANAGER,
      Types.Types.TRoles.ADMIN,
      Types.Types.TRoles.ANALYTICAL,
      Types.Types.TRoles.APP,
      Types.Types.TRoles.FINANCE
    ],
    true,
    new IProxy(Domain.MicroService.admin, true)
  ),
  new IRoute(
    '/admin/*',
    Methods.PUT,
    [
      Types.Types.TRoles.MARKETING,
      Types.Types.TRoles.MANAGER,
      Types.Types.TRoles.ADMIN,
      Types.Types.TRoles.ANALYTICAL,
      Types.Types.TRoles.APP,
      Types.Types.TRoles.FINANCE
    ],
    true,
    new IProxy(Domain.MicroService.admin, true)
  ),
  new IRoute(
    '/admin/*',
    Methods.DELETE,
    [
      Types.Types.TRoles.MARKETING,
      Types.Types.TRoles.MANAGER,
      Types.Types.TRoles.ADMIN,
      Types.Types.TRoles.ANALYTICAL,
      Types.Types.TRoles.APP,
      Types.Types.TRoles.FINANCE
    ],
    true,
    new IProxy(Domain.MicroService.admin, true)
  ),
  new IRoute(
    '/reseller/*',
    Methods.POST,
    [Types.Types.TRoles.RESELLER, Types.Types.TRoles.VENDOR, Types.Types.TRoles.ADMIN],
    true,
    new IProxy(Domain.MicroService.resellers, true)
  ),
  new IRoute(
    '/reseller/*',
    Methods.PATCH,
    [Types.Types.TRoles.RESELLER, Types.Types.TRoles.VENDOR, Types.Types.TRoles.ADMIN],
    true,
    new IProxy(Domain.MicroService.resellers, true)
  ),
  new IRoute(
    '/reseller/*',
    Methods.GET,
    [Types.Types.TRoles.RESELLER, Types.Types.TRoles.VENDOR, Types.Types.TRoles.ADMIN],
    true,
    new IProxy(Domain.MicroService.resellers, true)
  ),
  new IRoute(
    '/reseller/*',
    Methods.PUT,
    [Types.Types.TRoles.RESELLER, Types.Types.TRoles.VENDOR, Types.Types.TRoles.ADMIN],
    true,
    new IProxy(Domain.MicroService.resellers, true)
  ),
  new IRoute(
    '/reseller/*',
    Methods.DELETE,
    [Types.Types.TRoles.RESELLER, Types.Types.TRoles.VENDOR, Types.Types.TRoles.ADMIN],
    true,
    new IProxy(Domain.MicroService.resellers, true)
  )
]
