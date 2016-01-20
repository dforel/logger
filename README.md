# logger
Log lib.

### Install
```js
npm i tvrcgo/logger
```

### Content
- `log()` Log something.
- `bind()` Bind one type of log.

### Usage
```js
var Logger = require('logger');
var logger = Logger({
    dir: __dirname,
    name: 'testapp'
});

logger.log('hello guys !');
// output: testapp_log_20160118hh.log

logger.bind('publish');
logger.publish('new version published.', 'v2.0');
// output: testapp_publish_20160118hh.log

var errlog = logger.bind('error');
errlog('some error', err);
// output: testapp_error_20160120hh.log
```

### License
MIT
