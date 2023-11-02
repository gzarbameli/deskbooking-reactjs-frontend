import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Resource } from '@opentelemetry/resources';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import {
  BatchSpanProcessor,
  WebTracerProvider,
} from '@opentelemetry/sdk-trace-web';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { HttpInstrumentation } from('@opentelemetry/instrumentation-http');

import {
  CompositePropagator,
  W3CBaggagePropagator,
  W3CTraceContextPropagator,
} from '@opentelemetry/core';

const collectorOptions = {
  url: 'http://otel-collector-http.example.com/v1/traces', // <-- nginx with reverse proxy to http://localhost:4318/
};

const resource = new Resource({ [SemanticResourceAttributes.SERVICE_NAME]: 'react-frontend' });
const provider = new WebTracerProvider({ resource });

provider.addSpanProcessor(
  new BatchSpanProcessor(new OTLPTraceExporter(collectorOptions)),
);

provider.register({
  contextManager: new ZoneContextManager(),
});

provider.register({
  propagator: new CompositePropagator({
    propagators: [
      new W3CBaggagePropagator(),
      new W3CTraceContextPropagator(),
    ],
  }),
});

registerInstrumentations({
  tracerProvider: provider,
  instrumentations: [
    getWebAutoInstrumentations({
      '@opentelemetry/instrumentation-fetch': {
        propagateTraceHeaderCorsUrls: /.*/,
        clearTimingResources: true,
        applyCustomAttributesOnSpan(span) {
          span.setAttribute('app.synthetic_request', 'false');
        },
      },
    }),
    ],
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();