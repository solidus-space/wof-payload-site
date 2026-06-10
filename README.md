# wof-payload-site

A [Payload CMS](https://payloadcms.com) + Next.js app deployed to a [Dokku](https://dokku.com) host (e.g. a Hetzner VPS) via Docker.

- **Database:** Postgres (`@payloadcms/db-postgres`)
- **File storage:** S3-compatible (`@payloadcms/storage-s3`) — Minio locally, Backblaze B2 (or any S3 endpoint) in production
- **Deployment:** Dockerfile build via `git push dokku`

## Local development

1. Start Postgres and Minio:

   ```bash
   docker compose up -d
   ```

   This also creates the `wof-payload` bucket in Minio (console at http://localhost:9001, `minioadmin`/`minioadmin`).

2. Copy env vars and set a secret:

   ```bash
   cp .env.example .env
   # set PAYLOAD_SECRET, e.g. openssl rand -hex 32
   ```

3. Install and run:

   ```bash
   pnpm install
   pnpm dev
   ```

4. Open http://localhost:3000 and create your first admin user at `/admin`.

## Migrations

Migrations live in `src/migrations` and are run automatically on app startup in production (`prodMigrations`). After changing collections:

```bash
pnpm payload migrate:create
git add src/migrations && git commit -m "Add migration"
```

To run them manually in development:

```bash
pnpm migrate
```

## Deploying with Dokku

### One-time server scaffolding

Run these on the Dokku host (or via `ssh dokku@<host>` for the app/config commands):

```bash
# 1. Create the app
dokku apps:create wof-payload-site

# 2. Postgres (install plugin once per server)
sudo dokku plugin:install https://github.com/dokku/dokku-postgres.git postgres
dokku postgres:create wof-payload-db
dokku postgres:link wof-payload-db wof-payload-site   # sets DATABASE_URL

# 3. App config (runtime env vars)
dokku config:set wof-payload-site \
  PAYLOAD_SECRET="$(openssl rand -hex 32)" \
  NEXT_PUBLIC_SERVER_URL="https://cms.example.com" \
  S3_ENDPOINT="https://s3.eu-central-003.backblazeb2.com" \
  S3_BUCKET="<your-b2-bucket>" \
  S3_ACCESS_KEY_ID="<keyID>" \
  S3_SECRET_ACCESS_KEY="<applicationKey>" \
  S3_REGION="eu-central-003" \
  S3_FORCE_PATH_STYLE="false"

# 4. Domain + ports
dokku domains:set wof-payload-site cms.example.com
dokku ports:set wof-payload-site http:80:3000

# 5. HTTPS via Let's Encrypt (install plugin once per server)
sudo dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git
dokku letsencrypt:set wof-payload-site email you@example.com
dokku letsencrypt:enable wof-payload-site
dokku letsencrypt:cron-job --add
```

> Dokku detects the `Dockerfile` automatically and builds with it. The container listens on port 3000 (`EXPOSE 3000`).

### Deploy

From your machine:

```bash
git remote add dokku dokku@<your-hetzner-ip>:wof-payload-site
git push dokku main
```

Migrations run automatically when the new container boots. Zero-downtime checks are configured in `app.json`.

### Useful commands

```bash
dokku logs wof-payload-site -t          # tail logs
dokku ps:report wof-payload-site        # process status
dokku postgres:connect wof-payload-db   # psql shell
dokku postgres:backup-auth wof-payload-db <aws-key> <aws-secret>  # configure backups
dokku enter wof-payload-site web        # shell into the running container
```

## Environment variables

| Variable                 | Description                                          |
| ------------------------ | ---------------------------------------------------- |
| `PAYLOAD_SECRET`         | Secret for auth/JWT — keep stable across deploys     |
| `DATABASE_URL`           | Postgres connection string (set by `postgres:link`)  |
| `NEXT_PUBLIC_SERVER_URL` | Public URL, used for auth cookies & CORS             |
| `S3_ENDPOINT`            | S3 endpoint (Minio locally, Backblaze in production) |
| `S3_BUCKET`              | Bucket name                                          |
| `S3_ACCESS_KEY_ID`       | Access key                                           |
| `S3_SECRET_ACCESS_KEY`   | Secret key                                           |
| `S3_REGION`              | Region (e.g. `eu-central-003` for Backblaze)         |
| `S3_FORCE_PATH_STYLE`    | `true` for Minio, `false` for Backblaze              |

## Collections

- **Users** — auth-enabled collection with access to the admin panel.
- **Media** — upload-enabled collection; files are stored in the S3 bucket.

See the [Payload docs](https://payloadcms.com/docs) for how to extend these.

## Questions

If you have any issues or questions, reach out on [Discord](https://discord.com/invite/payload) or start a [GitHub discussion](https://github.com/payloadcms/payload/discussions).
