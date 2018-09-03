import React, { Component } from 'react';
import isEqual from 'lodash.isequal';
import { typeOf } from './util';

const watch = (propFns) => {
    const type = typeOf(propFns);
    if (type !== 'function') {
        throw new TypeError(`bmx watch expected an array argument, not ${typeOf(propFns)}`);
    }
    return (Wrapped) => {
        //  watch只允许传入Componnet组件
        if (!(Wrapped.prototype instanceof Component)) {
            throw new TypeError(`bmx must watch React.Component, not ${Wrapped.prototype.__proto__.constructor.name}`);
        }

        return class Watch extends Component {
            constructor(props) {
                super(props);
                this.cached = propFns();
            }

            shouldComponentUpdate() {
                const data = propFns();
                for (let i = 0, { length } = data; i < length; i ++) {
                    if (!isEqual(data[i], this.cached[i])) {
                        this.cached = data;
                        return true;
                    }
                }
                return false;
            }

            render() {
                return (
                    <Wrapped {...this.props} />
                );
            }
        }
    };
};

export default watch;
