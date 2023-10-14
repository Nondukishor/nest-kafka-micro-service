# IF already you have a local postgres database in you os stop service

stop service:

systemctl stop postgresql

start service:

systemctl start postgresql

show status of service:

systemctl status postgresql

disable service(not auto-start any more)

systemctl disable postgresql

enable service postgresql(auto-start)

systemctl enable postgresql

## For access pgsql in terminal

```
psql -U postgres
```

## Docker build command

```
bash ./up.sh
```

## Docker down command

```
bash ./down.sh
```

## You can access user interface for kafka with kafkadrop

```
http://localhost:9000/
```

## you can access user interface for postgres

```
http://localhost:8080
```

# For local run

## STEP 1:

```
git clone https://github.com/SOFTIC-OPC/micro-service-boilarplate.git
```

## STEP 2:

```
cd ./micro-service-boilarplate
```

## STEP 3:

```
cd ./auth-service && npm install
```

## STEP 4:

```
npm run start:dev
```

## STEP 5:

```
cd ./api-gateway && npm install
```

## STEP 6:

```
npm run start:dev
```
