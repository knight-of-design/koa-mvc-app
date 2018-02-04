# Middleware

Middleware are functions that run on each request. They have access to the request context, request and response objects.
Middleware functions are composed and executed in a stack-like manner for each request.

## Conventions

When creating middleware it's useful to conform to the convention of wrapping the middleware in a function that accepts options,
allowing users to extend functionality. Even if your middleware accepts no options, this is still a good idea to keep things uniform.

## Resources

* [Koa Guide](https://github.com/koajs/koa/blob/master/docs/guide.md)
