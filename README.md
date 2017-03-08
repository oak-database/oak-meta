# `oak-meta`

[![Build Status](https://travis-ci.org/oak-database/oak-meta.svg)](https://travis-ci.org/oak-database/oak-meta)
[![codecov](https://codecov.io/gh/oak-database/oak-meta/branch/master/graph/badge.svg)](https://codecov.io/gh/oak-database/oak-meta)
[![npm](https://img.shields.io/npm/v/oak-meta.svg)](https://www.npmjs.com/package/oak-meta)
[![Dependency Status](https://david-dm.org/oak-database/oak-meta/status.svg)](https://david-dm.org/oak-database/oak-meta)
[![devDependency Status](https://david-dm.org/oak-database/oak-meta/dev-status.svg)](https://david-dm.org/oak-database/oak-meta?type=dev)

The Meta module consumes barrels from the `__OAK_META__` rack to determine the state of an Oak server.

## Getting Started

Install the `oak-meta` package into your project with [npm](https://www.npmjs.com/).

```bash
npm install oak-meta --save
```

Use the `oak-meta` module in your project.

```javascript
import Meta from 'oak-meta';

// Create an instance of Meta
let meta = new Meta();

// Create a rack
meta.processAction({
    type: 'create rack',
    payload: {
        rackName: '__OAK_META__'
    }
});
```

## API

The public interface for `oak-meta` is defined in the [API Guide](https://github.com/oak-database/oak-meta/blob/master/docs/api.md).

## Contributing

Pull requests are welcome! To get started, see the [Contributing Guide](https://github.com/oak-database/oak-meta/blob/master/CONTRIBUTING.md).
