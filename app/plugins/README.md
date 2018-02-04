# Plugins

Plugins are middleware that has code that should execute at startup and shutdown of the application, rather than for each request.

## Conventions

Plugins are expected to return an object with two properties (startup and shutdown). The startup and shutdown properties should
return async functions.
