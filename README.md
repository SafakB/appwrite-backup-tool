# appwrite-backup-tool

> This project forked https://github.com/react-declarative/appwrite-backup-tool

> Minimalistic Appwrite schema dumper with data backup, restore features

This backup tool will generate query for each document in AppWrite database and save them as a json files on a hard drive. That means It can handle as much documents as you need. Also there is a script to run AppWrite in Docker on localhost so you can test your backup. Build on top of [AsyncGenerator API](https://javascript.info/async-iterators-generators)

<a href="https://cloud.appwrite.io/card/64b53d046c81edba0b1a">
	<img width="350" src="https://cloud.appwrite.io/v1/cards/cloud?userId=64b53d046c81edba0b1a" alt="Appwrite Cloud Card" />
</a>

Got a question? Feel free to [ask It in issues](https://github.com/react-declarative/appwrite-backup-tool/issues), I need traffic

## Setup

1. Install [Appwrite CLI](https://appwrite.io/docs/command-line) and login

> Windows

```powershell
npm install -g appwrite-cli
Set-ExecutionPolicy RemoteSigned # In PowerShell as Administrator
appwrite client --endpoint https://cloud.appwrite.io/v1
appwrite login
```

> Linux

```bash
sudo npm config set unsafe-perm true
sudo npm install -g appwrite-cli
appwrite client --endpoint https://cloud.appwrite.io/v1
appwrite login
```

2. [BACKUP, RESTORE] Write `.env` config in the root (`/appwrite-backup-tool-main/.env`) by using [.env.example](./.env.example)

```env
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=64b53d0c41fcf5093b12
APPWRITE_API_KEY=****
APPWRITE_SELF_SIGNED=1
```

3. [RESTORE] Copy `appwrite.json` to the root (collections schema). See [https://appwrite.io/docs/tooling/command-line/deployment](https://appwrite.io/docs/tooling/command-line/deployment)

## Usage

### Data backup and restore

- Backup all [Databases](https://appwrite.io/docs/databases) and [Buckets](https://appwrite.io/docs/storage)

> Crossplatform

```bash
npx -y rimraf backup
npm run appwrite:backup
```

- Deploy all local data to AppWrite server (clear installation is optional but recommended)

> Crossplatform

```bash
npm run appwrite:restore
```

### Schema backup and restore

 - Dump currend DB schema

> Windows

```cmd
npm run appwrite:fetch:windows
```

> Linux

```bash
npm run appwrite:fetch
```

 - Push new DB schema to AppWrite instance

> Windows

```cmd
npm run appwrite:push:windows
```

> Linux

```bash
npm run appwrite:push
```

### Schema DIFF

 - Show changed collection attributes by comparing `appwrite.json` and `appwrite.prev.json`

> Crossplatform

```bash
npm run appwrite:diff
```

 - Output

```text

...

COLLECTION APARTMENT
ADD rent_kom_menedzher_unit
ADD rent_kom_agency_unit
ADD rent_kom_kommisiya_agenstva
CHANGED rent_kom_czena_sobstvennika_valyuta (array true -> false)
CHANGED rent_kom_komissiya_agenstva_unit (array true -> false)

...

```

### Other

 - Run AppWrite with [Docker Compose](https://docs.docker.com/compose/)

> Windows

```cmd
npx -y open-cli http://localhost:8080/
npm run appwrite:start:windows
```

> Linux

```bash
npx -y open-cli http://localhost:8080/
npm run appwrite:start
```

 - Authorize CLI in Docker AppWrite instance

> Crossplatform

```bash
appwrite client --selfSigned true --endpoint http://localhost:8080/v1
appwrite login
```

 - Start AppWrite self-hosted instance (after `.env` changed)

```bash
docker-compose up -d --remove-orphans --renew-anon-volumes
```

 - Stop AppWrite self-hosted instance

```bash
docker-compose down
```

 - Uninstall AppWrite by removing all volumes and containers (clean install). Also remove networks to avoid mariadb DNS lookup error when downgrade from higher version of AppWrite to lower

```bash
docker stop $(docker ps --filter status=running -q)
docker rm $(docker ps -aq)
docker volume rm $(docker volume ls -q --filter dangling=true)
docker rmi $(docker images -a -q)
docker network prune --force --filter until=1s
```

## See also

Looks like AppWrite file endpoint is limited `to 60 requests in every 1 minutes per IP address`. So [I added a delay](./scripts/restore.mjs), you can change it If you need to

> Quite usefull when `AppwriteException [Error]: The document data is missing. Try again with document data populated`...

```javascript
const DOCUMENT_WRITE_DELAY = 1500;
const FILE_UPLOAD_DELAY = 2_000;
```
