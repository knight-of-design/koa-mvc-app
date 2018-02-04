# koa-mvc

MVC framework for Koa v2. Similar to sails.js, but this framework uses explicit configuration over dynamic configuration.

[![Known Vulnerabilities](https://snyk.io/test/github/koamvc/koa-mvc/badge.svg)](https://snyk.io/test/github/koamvc/koa-mvc)

## Getting started

* Initialize koa-mvc by running the following command
  ```bash
  npm install
  ```

## Run the site

* Run grunt to process assets (sass compilation, etc) and watch for asset changes
  ```bash
  npm run build
  ```
* Start the project
  ```bash
  npm start
  ```

## Middleware and plugins

* All middleware and plugins are located in `./app/middleware`
* Plugins represent middleware with an application level scope. Plugins can have `startup` and `shutdown` methods to be run when the site starts up and shuts down.
* Other middleware for the application has a request level scope. Request level middleware will be run for each request.

## Migrating from a sails.js app

* With koa-mvc, the server-side code is located in `./app`. With sails.js, server-side code is located in `./api`
* Configuration information is available by the global `KoaConfig` rather than `sails.config`
* The signature for controller actions has different parameters. With koa-mvc, `req` and `res` are properties on a `context` object.

  **sails.js**
  ```js
  module.exports = {
    index(req, res) {
      res.redirect('/another-url');
    },
  }
  ```

  **koa-mvc**
  ```js
  module.exports = {
    async index(context) {
      context.redirect('/another-url');
    },
  }
  ```

* Getting request parameters has changed from being able to use `req.param('myParam')` to having to be explicit for where the value comes from (routing param, query string, or body)

  **Route parameter**: e.g. a request to `/foo/4` that maps to route `/foo/:id`
  ```js
  module.exports = {
    async foo(context) {
      // Get :id parameter from route definition
      const id = context.params.id;
      ...
    },
  }
  ```

  **Query string**: e.g. a request to `/foo?id=4`
  ```js
  module.exports = {
    async foo(context) {
      // Get value from a query string property
      const id = context.query.id;
      ...
    },
  }
  ```

  **Body variable (form/json post)**
  ```js
  module.exports = {
    async fooPost(context) {
      // Get value from the body of a form post
      const id = context.request.body.id;
      ...
    },
  }
  ```

* ejs has been updated to the [latest version](http://ejs.co/). There are some syntax differences. Eg. `partial()` is now `include()`
* Rendering a view using ejs is done with a `render()` method on the `context` object:

  **sails.js**
  ```js
  module.exports = {
    index(req, res) {
      return res.view({
        users: [{ name: 'Karl' }, { name: 'Xavier' }],
      });
    },
  }
  ```

  **koa-mvc**
  ```js
  module.exports = {
    async index(context) {
      // Optionally set additional data to be available to the view
      context.state.foo = 'bar';

      await context.render({
        users: [{ name: 'Karl' }, { name: 'Xavier' }],
      };
    },
  }
  ```

* Sending a json response is done with `context.body`:

  **sails.js**
  ```js
  module.exports = {
    index(req, res) {
      return res.json(500, {
        ok: false,
        message: 'There was an error processing users.'
        users: [{ name: 'Karl' }, { name: 'Xavier' }],
      });
    },
  }
  ```

  **koa-mvc**
  ```js
  module.exports = {
    async index(context) {
      context.status = 500;
      context.body = {
        ok: false,
        message: 'There was an error processing users.'
        users: [{ name: 'Karl' }, { name: 'Xavier' }],
      };
    },
  }
  ```

* The `notFound`, `serverError`, `negotiate` and other response methods are part of the `context` object instead of `res`:

  **sails.js**
  ```js
  module.exports = {
    index(req, res) {
      try {
        if (!req.param('userId')) {
          return res.badRequest('User id is required');
        }

        const user = ...
        if (!user) {
          return res.notFound('User not found');
        }

        ...
      } catch (ex) {
        res.negotiate(ex);
      }
    },
  }
  ```

  **koa-mvc**
  ```js
  module.exports = {
    async index(context) {
      if (!req.param('userId')) {
        return context.badRequest('User id is required');
      }

      const user = ...
      if (!user) {
        return context.notFound('User not found');
      }

      ...
    },
  }
  ```
  \*\* Note: with koa-mvc, the try/catch in an action is not explicitly needed. The [response/500](app/middleware/response/500.js) middleware will catch an unhandled error in an action and will output a `serverError` response with the exception details.

* Flash messages are part of the `context` object instead of `res`:

  **sails.js**
  ```js
  module.exports = {
    index(req, res) {
      res.flash('info', 'OMG ponies!');
      return res.view();
    },
  }
  ```

  **koa-mvc**
  ```js
  module.exports = {
    async index(context) {
      context.flash('info', 'OMG ponies!');
      await context.view();
    },
  }
  ```


## License

koa-mvc is MIT-licensed. As Digital Underground would say, doowutchyalike!
