'use strict';

var fs = require('fs'),
    crypto = require('crypto'),
    path = require('path');

var slice = Array.prototype.slice;

/**
 * Logger
 * @param {object} opt
 */
function Logger(opt) {
    if (!(this instanceof Logger)) {
        return new Logger(opt);
    }
    this._dir = opt.dir || '../private/logs';
    this._name = opt.name || 'logger';
    this._streams = {};
}

/**
 * Get log stream.
 * @param  {string} type
 * @return {stream}
 */
Logger.prototype.stream = function(type) {
    type = type || 'log';
    var tm = _time();
    var suffix = [tm[0], tm[1], tm[2], tm[3]].join('');
    var filename = [this._name, type, suffix].join('_') + '.log';
    var skey = _md5(filename);
    var tar = this._streams[type];

    if (!tar || skey !== tar.key ) {
        if (tar && tar.stream) {
            tar.stream.end();
        }
        this._streams[type] = {
            key: skey,
            stream: fs.createWriteStream(path.join(this._dir, filename), {
                flags: 'a', encoding: 'utf-8'
            })
        };
    }
    return this._streams[type].stream;
}

/**
 * Write log.
 * @param  {string} type
 * @param  *
 */
Logger.prototype.write = function(type){
    var tm = _time(true);
    var args = slice.call(arguments, 1);
    var content = args.map(function(arg){
        if (arg && typeof arg === 'object' ) {
            return JSON.stringify(arg);
        }
        return arg || '';
    }).join(' ');
    var line = '★['+tm+']: ' + content + '\n';
    var stream = this.stream(type);
    stream.write(line);
}

/**
 * Log sth.
 */
Logger.prototype.log = function(){
    this.write.apply(this, ['log'].concat(slice.call(arguments)));
}

/**
 * Bind one type of log.
 * @param  {string} type
 * @return {function}
 */
Logger.prototype.bind = function(type){
    return function(){
        var args = slice.call(arguments);
        this.write.apply(this, [type].concat(args));
    }.bind(this);
}

/**
 * time
 * @param  {bool} format
 * @return {array}
 */
function _time(format) {
    var dt = new Date;

    var y = dt.getFullYear();
	var m = dt.getMonth() + 1;
	var d = dt.getDate();

    var H = dt.getHours();
	var M = dt.getMinutes();
	var S = dt.getSeconds();
	var MM = dt.getMilliseconds();

    if (m <= 9) m = '0' + m;
	if (d <= 9) d = '0' + d;
	if (H <= 9) H = '0' + H;
	if (M <= 9) M = '0' + M;
	if (S <= 9) S = '0' + S;

    if (format) {
        return [y,m,d].join('-') + ' ' + [H,M,S].join(':') + '.' + MM;
    }

    return [y, m, d, H, M, S, MM];
}

/**
 * md5
 * @param  {string} str
 * @return {string} md5(str)
 */
function _md5(str) {
    var hash = crypto.createHash('md5');
    return hash.update(str).digest('hex');
}

module.exports = Logger;
