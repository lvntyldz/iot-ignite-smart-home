import React, {Component } from 'react';
const {Provider, Consumer} = React.createContext();

const CtxProvider = Provider;
const CtxConsumer = Consumer;

export { CtxProvider, CtxConsumer }
