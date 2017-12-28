'use strict';

const expect = require('chai').expect;

const Statistics = require('../index');

describe('./statistics.js', function() {
  let statistics;

  beforeEach(function() {
    statistics = new Statistics();
  });

  it('get default statistics', function() {
    const result = statistics.getStatistic();
    expect(result).to.deep.equal({});
  });

  it('should set errorEntriesToTrack to default value', function() {
    expect(statistics.nrErrorsToTrack).to.equal(10);
  });

  it('should add initial counter, no defined size', function() {
    const key = 'mykey';
    statistics.increaseCounter(key);
    statistics.increaseCounter(key);

    const result = statistics.getStatistic();

    expect(result[key]).to.equal(2);
  });

  it('should add initial counter, defined size', function() {
    const key = 'amount';
    statistics.increaseCounter(key, 55);
    statistics.increaseCounter(key, 11);

    const result = statistics.getStatistic();

    expect(result[key]).to.equal(66);
  });

  it('should work with multiple counters, no defined size', function() {
    const key1 = 'mykey1';
    const key2 = 'mykey2';
    statistics.increaseCounter(key1);
    statistics.increaseCounter(key2);

    const result = statistics.getStatistic();

    expect(result[key1]).to.equal(1);
    expect(result[key2]).to.equal(1);
  });

  it('should work with multiple counters, defined size', function() {
    const key1 = 'mykey1';
    const key2 = 'mykey2';
    statistics.increaseCounter(key1, 22);
    statistics.increaseCounter(key2);

    const result = statistics.getStatistic();

    expect(result[key1]).to.equal(22);
    expect(result[key2]).to.equal(1);
  });

  it('should set value', function() {
    const key1 = 'mykey1';
    statistics.setValue(key1, '-22');

    const result = statistics.getStatistic();

    expect(result[key1]).to.equal('-22');
  });

  it('should overwrite invalid value', function() {
    const key1 = 'mykey1';
    statistics.setValue(key1, 'foo');
    statistics.increaseCounter(key1);

    const result = statistics.getStatistic();

    expect(result[key1]).to.equal(1);
  });

  it('should flush cache', function() {
    const key = 'mykey';
    statistics.increaseCounter(key);
    statistics.addErrorMessage('message');

    statistics.clearStatistics();
    const resultStatistics = statistics.getStatistic();
    expect(resultStatistics).to.deep.equal({});
    const resultError = statistics.getLastErrors();
    expect(resultError).to.deep.equal({});
  });

  it('should wrap around last error messages', function() {
    for (let i=0; i<20; i++) {
      statistics.addErrorMessage('message' + i);
    }

    const result = statistics.getLastErrors();
    expect(Object.keys(result).length).to.equal(10);
    expect(result['0']).to.equal('message10');
  });

});
