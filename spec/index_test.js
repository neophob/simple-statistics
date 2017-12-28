'use strict';

const expect = require('chai').expect;

const Statistics = require('../index');

describe('./statistics.js', function() {
  let statistics;

  beforeEach(function() {
    statistics = new Statistics({ flushIntervalSeconds: 3600 });
  });

  it('get default statistics', function() {
    //GIVEN
    //WHEN
    const result = statistics.getStatistic();

    //THEN
    expect(result).to.deep.equal({});
  });

  it('should add initial counter, no defined size', function() {
    //GIVEN
    const key = 'mykey';
    statistics.increaseCounter(key);
    statistics.increaseCounter(key);

    //WHEN
    const result = statistics.getStatistic();

    //THEN
    expect(result[key]).to.equal(2);
  });

  it('should add initial counter, defined size', function() {
    //GIVEN
    const key = 'amount';
    statistics.increaseCounter(key, 55);
    statistics.increaseCounter(key, 11);

    //WHEN
    const result = statistics.getStatistic();

    //THEN
    expect(result[key]).to.equal(66);
  });

  it('should work with multiple counters, no defined size', function() {
    //GIVEN
    const key1 = 'mykey1';
    const key2 = 'mykey2';
    statistics.increaseCounter(key1);
    statistics.increaseCounter(key2);

    //WHEN
    const result = statistics.getStatistic();

    //THEN
    expect(result[key1]).to.equal(1);
    expect(result[key2]).to.equal(1);
  });

  it('should work with multiple counters, defined size', function() {
    //GIVEN
    const key1 = 'mykey1';
    const key2 = 'mykey2';
    statistics.increaseCounter(key1, 22);
    statistics.increaseCounter(key2);

    //WHEN
    const result = statistics.getStatistic();

    //THEN
    expect(result[key1]).to.equal(22);
    expect(result[key2]).to.equal(1);
  });

  it('should set value', function() {
    //GIVEN
    const key1 = 'mykey1';
    statistics.setValue(key1, '-22');

    //WHEN
    const result = statistics.getStatistic();

    //THEN
    expect(result[key1]).to.equal('-22');
  });

  it('should flush cache', function() {
    //GIVEN
    const key = 'mykey';
    statistics.increaseCounter(key);

    //WHEN
    statistics.clearStatistics();
    const result = statistics.getStatistic();

    //THEN
    expect(result).to.deep.equal({});
  });

});
