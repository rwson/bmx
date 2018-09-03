# bmx

---

### 基础使用:

- 状态定义

```javascript
//  some-state.js
import { State } from 'path/to/bmx';
class SomeState extends State {
  state = {
    time: (new Date()).getTime()
  }

  update() {
    this.setState({
      time: (new Date()).getTime()
    });
  }
}
const someState = new SomeState;
export default someState;
```

- 使用该状态

```javascript
//  app.jsx
import React, { Component } from 'react';
import { connect } from 'path/to/bmx';
import someState from 'path/to/some-state';

@connect(someState)
export default class App extends Component {
  clicked() {
    someState.update();
  }

  render() {
    return (
      <div className='app-container'>
        <p>{someState.state.time}</p>
        <button onClick={this.clicked.bind(this)}>更新时间</button>
      </div>
    );
  }
}
```
