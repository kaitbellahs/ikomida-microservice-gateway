# ikomida-microservice-gateway

The single public entry point of the iKomida platform.

> Part of the **iKomida** platform. See **[ikomida-k8s-config](https://github.com/kaitbellahs/ikomida-k8s-config)** for the architecture overview of all 31 repositories.

---

## Role

Every request from every client enters here. The gateway authenticates the caller, checks that their role is permitted for the requested route, optionally verifies a reCAPTCHA challenge, and proxies the request to the service that owns it.

The design choice worth pointing at is that **the route table is data**. Each endpoint is an `IRoute` object declaring its path, HTTP method, the roles allowed to call it, whether authentication is required, its target service, and an optional reCAPTCHA action. Authorization is therefore impossible to forget: there is no way to add an endpoint without stating who may reach it.

Tokens are verified with a **public** key (`jose`, `importSPKI` / `compactVerify`). The private half never leaves the service that issues tokens, so the gateway — and every service behind it — can validate a session without being able to forge one.

## Route table

96 routes are declared across 10 backing services:

| Service | Routes |
|---|---|
| `admin` | 5 |
| `contracts` | 5 |
| `generics` | 4 |
| `orders` | 6 |
| `payments` | 15 |
| `products` | 16 |
| `pushNotification` | 4 |
| `resellers` | 8 |
| `users` | 18 |
| `vendorSettings` | 15 |

## Stack

TypeScript (ESM) · Express · Sequelize · rollup · Docker · Kubernetes

Depends on [`@ikomida/shared-types`](https://github.com/kaitbellahs/ikomida-shared-types), [`@ikomida/shared-backend`](https://github.com/kaitbellahs/ikomida-shared-backend) and [`@ikomida/shared-logics`](https://github.com/kaitbellahs/ikomida-shared-logics).

## Build

```bash
yarn install
yarn build      # rollup bundle
yarn service    # run locally
```

## Status

Built in 2022. The platform is no longer deployed; this repository is published as a record of the work. **The commit history predates generative AI coding assistants.**

## License

Licensed under the [Apache License 2.0](LICENSE) — free for commercial use, provided the copyright notice and [NOTICE](NOTICE) are retained.

Copyright 2022 Khalid Ait Bellahs.
