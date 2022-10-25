import { BackendTypes, Domain } from '@ikomida/shared-backend'

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
  roles: BackendTypes.Roles[] | BackendTypes.Roles | null
  auth: boolean
  proxy: IProxy
  recaptcha?: string

  constructor(
    url: string,
    method: Methods,
    roles: BackendTypes.Roles[] | BackendTypes.Roles | null,
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
  new IRoute('/pubKey', Methods.GET, BackendTypes.Roles.CLIENT, true, new IProxy(Domain.MicroService.payments, true)),
  new IRoute(
    '/products',
    Methods.GET,
    [BackendTypes.Roles.CLIENT, BackendTypes.Roles.VENDOR, BackendTypes.Roles.STAFF, BackendTypes.Roles.ADMIN],
    true,
    new IProxy(Domain.MicroService.products, true)
  ),
  new IRoute(
    '/product/:id',
    Methods.GET,
    [BackendTypes.Roles.CLIENT, BackendTypes.Roles.VENDOR, BackendTypes.Roles.STAFF, BackendTypes.Roles.ADMIN],
    true,
    new IProxy(Domain.MicroService.products, true)
  ),
  new IRoute(
    '/productsCount',
    Methods.GET,
    [BackendTypes.Roles.VENDOR, BackendTypes.Roles.STAFF],
    true,
    new IProxy(Domain.MicroService.products, true)
  ),
  new IRoute(
    '/categories',
    Methods.GET,
    [BackendTypes.Roles.CLIENT, BackendTypes.Roles.VENDOR, BackendTypes.Roles.STAFF],
    true,
    new IProxy(Domain.MicroService.products, true)
  ),
  new IRoute(
    '/image/:imageUri',
    Methods.GET,
    [BackendTypes.Roles.CLIENT, BackendTypes.Roles.VENDOR, BackendTypes.Roles.STAFF],
    false,
    new IProxy(Domain.MicroService.products, true)
  ),
  new IRoute(
    '/product/:id',
    Methods.DELETE,
    BackendTypes.Roles.VENDOR,
    true,
    new IProxy(Domain.MicroService.products, true)
  ),
  new IRoute(
    '/category/:id',
    Methods.DELETE,
    BackendTypes.Roles.VENDOR,
    true,
    new IProxy(Domain.MicroService.products, true)
  ),
  new IRoute(
    '/productoption/:id',
    Methods.DELETE,
    [BackendTypes.Roles.VENDOR, BackendTypes.Roles.STAFF],
    true,
    new IProxy(Domain.MicroService.products, true)
  ),
  new IRoute(
    '/productoptionscategory/:id',
    Methods.DELETE,
    [BackendTypes.Roles.VENDOR, BackendTypes.Roles.STAFF],
    true,
    new IProxy(Domain.MicroService.products, true)
  ),
  new IRoute('/product', Methods.PUT, BackendTypes.Roles.VENDOR, true, new IProxy(Domain.MicroService.products, true)),
  new IRoute('/category', Methods.PUT, BackendTypes.Roles.VENDOR, true, new IProxy(Domain.MicroService.products, true)),
  new IRoute(
    '/product',
    Methods.POST,
    [BackendTypes.Roles.VENDOR, BackendTypes.Roles.STAFF],
    true,
    new IProxy(Domain.MicroService.products, true)
  ),
  new IRoute('/category', Methods.PUT, BackendTypes.Roles.VENDOR, true, new IProxy(Domain.MicroService.products, true)),
  new IRoute(
    '/category',
    Methods.POST,
    [BackendTypes.Roles.VENDOR, BackendTypes.Roles.STAFF],
    true,
    new IProxy(Domain.MicroService.products, true)
  ),
  new IRoute(
    '/order',
    Methods.PUT,
    [BackendTypes.Roles.VENDOR, BackendTypes.Roles.STAFF, BackendTypes.Roles.CLIENT],
    true,
    new IProxy(Domain.MicroService.orders, true),
    'editOrder'
  ),
  new IRoute(
    '/order',
    Methods.POST,
    BackendTypes.Roles.CLIENT,
    true,
    new IProxy(Domain.MicroService.orders, true),
    'newOrder'
  ),
  new IRoute(
    '/ordersCount',
    Methods.GET,
    [BackendTypes.Roles.VENDOR, BackendTypes.Roles.STAFF],
    true,
    new IProxy(Domain.MicroService.orders, true)
  ),
  new IRoute(
    '/usersCount',
    Methods.GET,
    [BackendTypes.Roles.VENDOR, BackendTypes.Roles.STAFF],
    true,
    new IProxy(Domain.MicroService.users, true)
  ),
  new IRoute('/settings', Methods.GET, BackendTypes.Roles.CLIENT, false, new IProxy(Domain.MicroService.users, true)),
  new IRoute(
    '/password',
    Methods.POST,
    [
      BackendTypes.Roles.VENDOR,
      BackendTypes.Roles.STAFF,
      BackendTypes.Roles.CLIENT,
      BackendTypes.Roles.ADMIN,
      BackendTypes.Roles.MANAGER,
      BackendTypes.Roles.MARKETING,
      BackendTypes.Roles.RESELLER
    ],
    true,
    new IProxy(Domain.MicroService.users, true),
    'updatePassword'
  ),
  new IRoute('/auth', Methods.POST, null, false, new IProxy(Domain.MicroService.users, true), 'login'),
  new IRoute(
    '/logout',
    Methods.DELETE,
    BackendTypes.Roles.ALL,
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
    BackendTypes.Roles.ALL,
    true,
    new IProxy(Domain.MicroService.users, true)
  ),
  new IRoute('/profile', Methods.GET, BackendTypes.Roles.ALL, true, new IProxy(Domain.MicroService.users, true)),
  new IRoute(
    '/orders/:timestamp',
    Methods.GET,
    [BackendTypes.Roles.CLIENT, BackendTypes.Roles.VENDOR, BackendTypes.Roles.STAFF],
    true,
    new IProxy(Domain.MicroService.orders, true)
  ),
  new IRoute(
    '/order/:id',
    Methods.GET,
    [BackendTypes.Roles.CLIENT, BackendTypes.Roles.VENDOR, BackendTypes.Roles.STAFF],
    true,
    new IProxy(Domain.MicroService.orders, true)
  ),
  new IRoute(
    '/orders/:timestamp/history',
    Methods.GET,
    [BackendTypes.Roles.CLIENT, BackendTypes.Roles.VENDOR, BackendTypes.Roles.STAFF],
    true,
    new IProxy(Domain.MicroService.orders, true)
  ),
  new IRoute('/payments', Methods.GET, BackendTypes.Roles.CLIENT, true, new IProxy(Domain.MicroService.payments, true)),
  new IRoute(
    '/payeridtypes',
    Methods.GET,
    [BackendTypes.Roles.VENDOR, BackendTypes.Roles.CLIENT],
    false,
    new IProxy(Domain.MicroService.payments, true)
  ),
  new IRoute(
    '/cardinfo/:cardNumber',
    Methods.GET,
    [BackendTypes.Roles.VENDOR, BackendTypes.Roles.CLIENT],
    false,
    new IProxy(Domain.MicroService.payments, true)
  ),
  new IRoute(
    '/payment',
    Methods.POST,
    BackendTypes.Roles.CLIENT,
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
    BackendTypes.Roles.CLIENT,
    true,
    new IProxy(Domain.MicroService.payments, true)
  ),
  new IRoute(
    '/payment/:id',
    Methods.DELETE,
    BackendTypes.Roles.CLIENT,
    true,
    new IProxy(Domain.MicroService.payments, true)
  ),
  new IRoute(
    '/processPayment',
    Methods.POST,
    BackendTypes.Roles.CLIENT,
    true,
    new IProxy(Domain.MicroService.payments, true)
  ),
  new IRoute(
    '/coupon',
    Methods.POST,
    [BackendTypes.Roles.CLIENT, BackendTypes.Roles.VENDOR, BackendTypes.Roles.STAFF],
    true,
    new IProxy(Domain.MicroService.payments, true)
  ),
  new IRoute(
    '/coupons/:timestamp',
    Methods.GET,
    [BackendTypes.Roles.VENDOR, BackendTypes.Roles.STAFF, BackendTypes.Roles.STAFF],
    true,
    new IProxy(Domain.MicroService.payments, true)
  ),
  new IRoute(
    '/couponsCount',
    Methods.GET,
    [BackendTypes.Roles.VENDOR, BackendTypes.Roles.STAFF],
    true,
    new IProxy(Domain.MicroService.payments, true)
  ),
  new IRoute(
    '/coupon/:id',
    Methods.DELETE,
    BackendTypes.Roles.VENDOR,
    true,
    new IProxy(Domain.MicroService.payments, true)
  ),
  new IRoute('/addresses', Methods.GET, BackendTypes.Roles.CLIENT, true, new IProxy(Domain.MicroService.users, true)),
  new IRoute('/address', Methods.POST, BackendTypes.Roles.CLIENT, true, new IProxy(Domain.MicroService.users, true)),
  new IRoute('/address/:id', Methods.PUT, BackendTypes.Roles.CLIENT, true, new IProxy(Domain.MicroService.users, true)),
  new IRoute(
    '/address/:id',
    Methods.DELETE,
    BackendTypes.Roles.CLIENT,
    true,
    new IProxy(Domain.MicroService.users, true)
  ),
  new IRoute(
    '/cep/:cep',
    Methods.GET,
    [
      BackendTypes.Roles.CLIENT,
      BackendTypes.Roles.VENDOR,
      BackendTypes.Roles.RESELLER,
      BackendTypes.Roles.ADMIN,
      BackendTypes.Roles.STAFF
    ],
    false,
    new IProxy(Domain.MicroService.generics, true)
  ),
  new IRoute(
    '/term/:type',
    Methods.GET,
    [BackendTypes.Roles.CLIENT, BackendTypes.Roles.VENDOR, BackendTypes.Roles.RESELLER, BackendTypes.Roles.ADMIN],
    false,
    new IProxy(Domain.MicroService.generics, true)
  ),
  new IRoute(
    '/termID/:type',
    Methods.GET,
    [BackendTypes.Roles.CLIENT, BackendTypes.Roles.VENDOR, BackendTypes.Roles.RESELLER, BackendTypes.Roles.ADMIN],
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
    [BackendTypes.Roles.RESELLER, BackendTypes.Roles.VENDOR, BackendTypes.Roles.ADMIN],
    true,
    new IProxy(Domain.MicroService.resellers, true),
    'newReseller'
  ),
  new IRoute(
    '/resellers/:timestamp',
    Methods.GET,
    [BackendTypes.Roles.RESELLER, BackendTypes.Roles.VENDOR, BackendTypes.Roles.ADMIN],
    true,
    new IProxy(Domain.MicroService.resellers, true)
  ),
  new IRoute(
    '/restaurants/:timestamp',
    Methods.GET,
    [BackendTypes.Roles.RESELLER, BackendTypes.Roles.VENDOR, BackendTypes.Roles.ADMIN],
    true,
    new IProxy(Domain.MicroService.resellers, true)
  ),
  new IRoute(
    '/vendor/subscription',
    Methods.GET,
    BackendTypes.Roles.VENDOR,
    true,
    new IProxy(Domain.MicroService.payments, true)
  ),
  new IRoute(
    '/vendor/businessHours',
    Methods.PUT,
    [BackendTypes.Roles.VENDOR, BackendTypes.Roles.STAFF],
    true,
    new IProxy(Domain.MicroService.vendorSettings, true)
  ),
  new IRoute(
    '/vendor/pagSeguroUrl',
    Methods.GET,
    BackendTypes.Roles.VENDOR,
    true,
    new IProxy(Domain.MicroService.vendorSettings, true),
    'pagSeguroUrl'
  ),
  new IRoute(
    '/vendor/delivery',
    Methods.PUT,
    [BackendTypes.Roles.VENDOR, BackendTypes.Roles.STAFF],
    true,
    new IProxy(Domain.MicroService.vendorSettings, true)
  ),
  new IRoute(
    '/vendor/updatePaymentGateway',
    Methods.PUT,
    BackendTypes.Roles.VENDOR,
    true,
    new IProxy(Domain.MicroService.vendorSettings, true),
    'updatePaymentGateway'
  ),
  new IRoute(
    '/vendor/revokePaymentGateway',
    Methods.DELETE,
    BackendTypes.Roles.VENDOR,
    true,
    new IProxy(Domain.MicroService.vendorSettings, true),
    'revokePaymentGateway'
  ),
  new IRoute(
    '/vendor/settings',
    Methods.GET,
    [BackendTypes.Roles.VENDOR, BackendTypes.Roles.STAFF],
    true,
    new IProxy(Domain.MicroService.vendorSettings, true)
  ),
  new IRoute(
    '/vendor/limits',
    Methods.GET,
    [BackendTypes.Roles.VENDOR, BackendTypes.Roles.STAFF],
    true,
    new IProxy(Domain.MicroService.vendorSettings, true)
  ),
  new IRoute(
    '/vendor/staff/:timestamp',
    Methods.GET,
    BackendTypes.Roles.VENDOR,
    true,
    new IProxy(Domain.MicroService.vendorSettings, true)
  ),
  new IRoute(
    '/vendor/staff',
    Methods.POST,
    BackendTypes.Roles.VENDOR,
    true,
    new IProxy(Domain.MicroService.vendorSettings, true)
  ),
  new IRoute(
    '/vendor/staff/:id',
    Methods.DELETE,
    BackendTypes.Roles.VENDOR,
    true,
    new IProxy(Domain.MicroService.vendorSettings, true)
  ),
  new IRoute('/layout', Methods.GET, [], false, new IProxy(Domain.MicroService.vendorSettings, true)),
  new IRoute(
    '/layout',
    Methods.PUT,
    [BackendTypes.Roles.VENDOR, BackendTypes.Roles.STAFF],
    true,
    new IProxy(Domain.MicroService.vendorSettings, true)
  ),
  new IRoute(
    '/vendor/settings',
    Methods.PUT,
    [BackendTypes.Roles.VENDOR, BackendTypes.Roles.STAFF],
    true,
    new IProxy(Domain.MicroService.vendorSettings, true)
  ),
  new IRoute(
    '/notification/register',
    Methods.POST,
    BackendTypes.Roles.ALL,
    true,
    new IProxy(Domain.MicroService.pushNotification, true)
  ),
  new IRoute(
    '/vendor/pushNotifications/:timestamp',
    Methods.GET,
    [BackendTypes.Roles.VENDOR, BackendTypes.Roles.STAFF, BackendTypes.Roles.ADMIN],
    true,
    new IProxy(Domain.MicroService.pushNotification, true)
  ),
  new IRoute(
    '/pushNotifications/:timestamp',
    Methods.GET,
    BackendTypes.Roles.ALL,
    true,
    new IProxy(Domain.MicroService.pushNotification, true)
  ),
  new IRoute(
    '/vendor/pushNotification',
    Methods.POST,
    [BackendTypes.Roles.VENDOR, BackendTypes.Roles.STAFF, BackendTypes.Roles.ADMIN],
    true,
    new IProxy(Domain.MicroService.pushNotification, true)
  ),
  new IRoute(
    '/admin/*',
    Methods.POST,
    [BackendTypes.Roles.MARKETING, BackendTypes.Roles.MANAGER, BackendTypes.Roles.ADMIN, BackendTypes.Roles.ANALYTICAL, BackendTypes.Roles.APP, BackendTypes.Roles.FINANCE],
    true,
    new IProxy(Domain.MicroService.admin, true)
  ),
  new IRoute(
    '/admin/*',
    Methods.PATCH,
    [BackendTypes.Roles.MARKETING, BackendTypes.Roles.MANAGER, BackendTypes.Roles.ADMIN, BackendTypes.Roles.ANALYTICAL, BackendTypes.Roles.APP, BackendTypes.Roles.FINANCE],
    true,
    new IProxy(Domain.MicroService.admin, true)
  ),
  new IRoute(
    '/admin/*',
    Methods.GET,
    [BackendTypes.Roles.MARKETING, BackendTypes.Roles.MANAGER, BackendTypes.Roles.ADMIN, BackendTypes.Roles.ANALYTICAL, BackendTypes.Roles.APP, BackendTypes.Roles.FINANCE],
    true,
    new IProxy(Domain.MicroService.admin, true)
  ),
  new IRoute(
    '/admin/*',
    Methods.PUT,
    [BackendTypes.Roles.MARKETING, BackendTypes.Roles.MANAGER, BackendTypes.Roles.ADMIN, BackendTypes.Roles.ANALYTICAL, BackendTypes.Roles.APP, BackendTypes.Roles.FINANCE],
    true,
    new IProxy(Domain.MicroService.admin, true)
  ),
  new IRoute(
    '/admin/*',
    Methods.DELETE,
    [BackendTypes.Roles.MARKETING, BackendTypes.Roles.MANAGER, BackendTypes.Roles.ADMIN, BackendTypes.Roles.ANALYTICAL, BackendTypes.Roles.APP, BackendTypes.Roles.FINANCE],
    true,
    new IProxy(Domain.MicroService.admin, true)
  ),
  new IRoute(
    '/reseller/*',
    Methods.POST,
    [BackendTypes.Roles.RESELLER, BackendTypes.Roles.VENDOR, BackendTypes.Roles.ADMIN],
    true,
    new IProxy(Domain.MicroService.resellers, true)
  ),
  new IRoute(
    '/reseller/*',
    Methods.PATCH,
    [BackendTypes.Roles.RESELLER, BackendTypes.Roles.VENDOR, BackendTypes.Roles.ADMIN],
    true,
    new IProxy(Domain.MicroService.resellers, true)
  ),
  new IRoute(
    '/reseller/*',
    Methods.GET,
    [BackendTypes.Roles.RESELLER, BackendTypes.Roles.VENDOR, BackendTypes.Roles.ADMIN],
    true,
    new IProxy(Domain.MicroService.resellers, true)
  ),
  new IRoute(
    '/reseller/*',
    Methods.PUT,
    [BackendTypes.Roles.RESELLER, BackendTypes.Roles.VENDOR, BackendTypes.Roles.ADMIN],
    true,
    new IProxy(Domain.MicroService.resellers, true)
  ),
  new IRoute(
    '/reseller/*',
    Methods.DELETE,
    [BackendTypes.Roles.RESELLER, BackendTypes.Roles.VENDOR, BackendTypes.Roles.ADMIN],
    true,
    new IProxy(Domain.MicroService.resellers, true)
  )
]
