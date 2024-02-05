BACKUP
```docker-compose exec mariadb sh -c 'exec mysqldump --all-databases --add-drop-database -u"$MYSQL_USER" -p"$MYSQL_PASSWORD"' > ./dump.sql```

RESTORE
```docker-compose exec -T mariadb sh -c 'exec mysql -u"$MYSQL_USER" -p"$MYSQL_PASSWORD"' < dump.sql```

RESTORE(Powershell)
```Get-Content dump.sql | docker-compose exec -T mariadb sh -c 'exec mysql -u"$MYSQL_USER" -p"$MYSQL_PASSWORD"'```

Clone Container
```docker commit -p appwrite-mariadb mariadbackup```

Save Container Image
```docker save -o mariadbackup.tar mariadbackup```


Check Volume Destination
```docker inspect appwrite_appwrite-mariadb```

Backup Volume
```docker run --rm --volume appwrite_appwrite-mariadb:/var/lib/mysql --volume c:\Users\Safak\appwrite:/backup ubuntu tar -cvf /backup/appwrite_appwrite-mariadb.tar -C /var/lib/mysql .```
```docker run --rm --volume appwrite_appwrite-uploads:/var/lib/docker/volumes/appwrite_appwrite-uploads/_data --volume c:\Users\Safak\appwrite:/backup ubuntu tar -cvf /backup/appwrite_appwrite-uploads.tar -C /var/lib/docker/volumes/appwrite_appwrite-uploads/_data .```
```docker run --rm --volume appwrite_appwrite-config:/var/lib/docker/volumes/appwrite_appwrite-config/_data --volume c:\Users\Safak\appwrite:/backup ubuntu tar -cvf /backup/appwrite_appwrite-config.tar -C /var/lib/docker/volumes/appwrite_appwrite-config/_data .```
```docker run --rm --volume appwrite_appwrite-functions:/var/lib/docker/volumes/appwrite_appwrite-functions/_data --volume c:\Users\Safak\appwrite:/backup ubuntu tar -cvf /backup/appwrite_appwrite-functions.tar -C /var/lib/docker/volumes/appwrite_appwrite-functions/_data .```


Restore Volume
```docker run --rm --volume c:\Users\Safak\appwrite:/backup --volume appwrite_appwrite-mariadb:/restore ubuntu tar -xvf /backup/appwrite_appwrite-mariadb.tar -C /restore```
```docker run --rm --volume c:\Users\Safak\appwrite:/backup --volume appwrite_appwrite-uploads:/restore ubuntu tar -xvf /backup/appwrite_appwrite-uploads.tar -C /restore```
```docker run --rm --volume c:\Users\Safak\appwrite:/backup --volume appwrite_appwrite-config:/restore ubuntu tar -xvf /backup/appwrite_appwrite-config.tar -C /restore```
```docker run --rm --volume c:\Users\Safak\appwrite:/backup --volume appwrite_appwrite-functions:/restore ubuntu tar -xvf /backup/appwrite_appwrite-functions.tar -C /restore```
