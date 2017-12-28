# Simple statistics

Simple statistics supports counting events, store events and fetch events. The Core idea is
that this module is cleared after a certain amount of time - and its content is logged.

## Example Code

```
const Statistics = require('./index.js');
const statistics = new Statistics();
statistics.setValue('hostname', 'foo');
statistics.increaseCounter('event 1');
statistics.increaseCounter('event 2', 50);
statistics.addErrorMessage('ERROR_EOF');
statistics.addErrorMessage('INVALID_PARAMETER');

const eventsLastHour = statistics.getStatistic();
const errorsLastHour = statistics.getLastErrors();
statistics.clearStatistics();

```

Result:

```
> eventsLastHour
{ 'event 1': 1, 'event 2': 50, hostname: 'foo' }
> errorsLastHour
{ '0': 'ERROR_EOF', '1': 'INVALID_PARAMETER' }
```

## API

### Constructor

- `new Statistics({ errorEntriesToTrack: 10 });`: The parameter is optional, default `errorEntriesToTrack` is set to 10.

### setValue

- `statistics.setValue(key, value);`: Sets key to value, existing keys will be overwritten.

### increaseCounter

- `statistics.increaseCounter(key);`: increase key number, if key was not defined before, it will be initialised to 1.
- `statistics.increaseCounter(key, increaseNumber);`: increase key number, if key was not defined before, it will be initialised to `increaseNumber`.

### addErrorMessage

- `statistics.addErrorMessage(error);`: adds an error message. If more than `errorEntriesToTrack` are added, the oldest entry gets overwritten.

### getStatistic

- `statistics.getStatistic()`: returns the collected events as JSON object.

### getLastErrors

- `statistics.getLastErrors()`: returns the collected errors as JSON object.

### clearStatistics

- `statistics.clearStatistics()`: Cleans error and event statistics.
