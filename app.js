'use strict';

import ReactDom from 'react/lib/ReactDom';
import React from 'react';

import Hello from './components/astronaut-data-app.js!jsx';

ReactDom.render(
  React.createElement(Hello, {name: 'hello'}),
  document.getElementById('app')
);