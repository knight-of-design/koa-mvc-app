'use strict';

const _ = require('lodash');
const koaEjs = require('koa-ejs');
const path = require('path');
const { minify } = require('html-minifier');

module.exports = {
  startup: async function ejsPluginStartup(app) {
    const viewPath = path.join(KoaConfig.path, 'views');

    koaEjs(app, _.merge({}, KoaConfig.views, {
      root: viewPath,
      viewExt: 'ejs',
    }));

    // override the render function to auto-fill the view name based on controller and action
    const { render } = app.context;
    app.context.render = async function ejsRender(view, options) {
      const context = this;
      let viewName = view;
      let viewOptions = options;
      if (!view || _.isObject(view)) {
        viewOptions = view;

        const routeInfo = KoaConfig.routeDetails[context.path];
        if (routeInfo) {
          viewName = path.join(routeInfo.controller, routeInfo.action);
        }
      }

      // Note: Setting the layout on the state will allow 500, 404, etc responses to use the same layout
      const layoutOverride = (viewOptions || {}).layout;
      if (layoutOverride) {
        context.state.layout = layoutOverride;
      }

      await render.apply(context, [viewName, viewOptions]);
      context.body = minify(context.body, KoaConfig.ejsMinifyOptions);
    };
  },
};
