'use strict';

const Statistics = module.exports = function(options) {
  this.cache = new Map();
  this.nrErrorsToTrack = options && options.errorEntriesToTrack ? options.errorEntriesToTrack : 10;
  this.lasterrors = {};
  this.errorSlot = 0;
};

Statistics.prototype.setValue = function(key, value) {
  this.cache.set(key, value);
};

Statistics.prototype.increaseCounter = function(key, amount) {
  const _amount = amount || 1;
  let value = this.cache.get(key);
  if (!value) {
    value = _amount;
  } else {
    value += _amount;
  }
  this.cache.set(key, value);
};

Statistics.prototype.getStatistic = function() {
  const result = {};
  const allKeys = Array.from(this.cache.keys());
  allKeys.sort().forEach(key => {
    result[key] = this.cache.get(key);
  });
  return result;
};

Statistics.prototype.getLastErrors = function() {
  return this.lasterrors;
};

Statistics.prototype.addErrorMessage = function(msg) {
  this.lasterrors[this.errorSlot] = msg;
  this.errorSlot = (this.errorSlot + 1) % this.nrErrorsToTrack;
};

Statistics.prototype.clearStatistics = function() {
  this.cache.clear();
  this.lasterrors = {};
};
