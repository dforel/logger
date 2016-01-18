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

var publog = logger.bind('publish');
publog('new version published.', 'v2.0');
// output: testapp_publish_20160118hh.log
```

### License
MIT
