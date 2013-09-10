heroku-env
===============

Stop wasting time running `heroku config` and hand-parsing the database url to pass to `pg_dump` or `psql` or `node .`

`heroku-env` will parse the `DATABASE_URL` from your heroku config and split it out into the `PG*` environment variables used by `psql` `pg_dump` `pg_restore` and `node_postgres`


## install

`npm install --global heroku-env`

### requirements

1. You must have [the heroku toolbelt](https://toolbelt.heroku.com/) installed
2. You must be logged in to the heroku toolbelt
3. The heroku toolbelt must be in your `$PATH`
 


## use

_assume my normal workflow is `heroku -app brianc-node-postgres <some heroku-toolbelt command>`_

1. Easily create a project `.env` file to use with `foreman` based on your heroku app settings

```bash
$: heroku-env brianc-node-postgres > .env
$: foreman start
```

2. Bring in your entire heroku configuration for an app into your local environment.

```bash
$: export `heroku-env brianc-node-postgres`
$: psql #automatically connects to heroku
$: pg_dump #automatically connects to heroku
$: pg_restore #....I think you get the picture
$: node my-awesome-website.js #if you're using node-postgres you're good to go
```

### usage

invoke with `heroku-env [app-name]`.  The `app-name` is the same thing you would pass to heroku via `heroku config:get --app my-favorite-heroku-app` as the `--app` flag.

```bash
$: heroku-env brianc-node-postgres
HEROKU_POSTGRESQL_GOLD_URL=postgres://kwdzdnqpdiilfs:uaZoSSHgi7mVM7kYaROtusClKu@ec2-107-20-224-218.compute-1.amazonaws.com:5432/db6kfntl5qhp2
PGDATABASE=db6kfntl5qhp2
PGPASSWORD=uaZoSSHgi7mVM7kYaROtusClKu
PGHOST=ec2-107-20-224-218.compute-1.amazonaws.com
PGPORT=5432
PGUSER=kwdzdnqpdiilfs
PGSSLMODE=require
```

heroku-env will parse the first database url it finds and create standard [postgres environment variables](http://www.postgresql.org/docs/9.2/static/libpq-envars.html) out of them.  This might seem lame, but check out the use cases.



### api

You can also access `heroku-env` programmatically.  The requirements still apply.

```js
var herokuEnv = require('heroku-env');
herokuEnv('my-heroku-app-name', function(err, env) {
  //env is an object in the format: 
  /*
  {
    HEROKU_POSTGRESQL_COPPER_URL: "<huge url here>,
    PGDATABASE: 'bla bla blah',
    ....
  }

  */
});

```

## License 

The MIT License (MIT)

Copyright (c) 2013 Brian M. Carlson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
