# logger
日志库。

按小时切分日志文件，输出文件格式：loggerName_logType_yyyymmddhh.log

### Install
```
npm i tvrcgo/logger
```

### Content
- `log()` 写日志。其它默认日志类型: info, warn, debug, error。
- `bind()` 绑定一种非默认日志类型。
- `clean()` 清除日志，默认30天前，可指定。

### Usage
```js
var Logger = require('logger');
var logger = Logger({
    dir: __dirname,
    name: 'testapp'
});

logger.log('hello guys !');
// output: testapp_log_20160118hh.log

logger.error('error happened');
// output: testapp_error_20160120hh.log

logger.bind('publish');
logger.publish('new version published.', 'v2.0');
// output: testapp_publish_20160118hh.log

var beatlog = logger.bind('beat');
beatlog('heart beat now.');
// output: testapp_beat_20160120hh.log
```

### License
MIT
