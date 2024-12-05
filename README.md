# declarative-shadow-dom-style-vs-link-benchmark

This is a browser benchmark of loading 100 declarative shadow roots, each containing `<link rel=stylesheet>`s for Bootstrap.css, plus some HTML markup, versus roughly the same thing using `<style>`s rather than `<link>`s.

## Usage

    npm i
    npm test

## Results

Chrome:

```
┌─────────────┬─────────────────┐
│     Version │ <none>          │
├─────────────┼─────────────────┤
│     Browser │ chrome-headless │
│             │ 131.0.0.0       │
├─────────────┼─────────────────┤
│ Sample size │ 25              │
└─────────────┴─────────────────┘

┌───────────────────────────────────┬──────────────┬───────────────────────┬──────────────────────────────────────┬─────────────────────────────────────┐
│ Benchmark                         │ Bytes        │              Avg time │ vs Shadow DOM styles with style tags │ vs Shadow DOM styles with link tags │
├───────────────────────────────────┼──────────────┼───────────────────────┼──────────────────────────────────────┼─────────────────────────────────────┤
│ Shadow DOM styles with style tags │ 92234.85 KiB │ 3136.38ms - 3502.15ms │                                      │                              slower │
│                                   │              │                       │                             -        │                         188% - 227% │
│                                   │              │                       │                                      │               2054.17ms - 2426.71ms │
├───────────────────────────────────┼──────────────┼───────────────────────┼──────────────────────────────────────┼─────────────────────────────────────┤
│ Shadow DOM styles with link tags  │ 1249.08 KiB  │ 1043.48ms - 1114.17ms │                               faster │                                     │
│                                   │              │                       │                            65% - 70% │                            -        │
│                                   │              │                       │                2054.17ms - 2426.71ms │                                     │
└───────────────────────────────────┴──────────────┴───────────────────────┴──────────────────────────────────────┴─────────────────────────────────────┘
```

Firefox: 

```
┌─────────────┬──────────────────┐
│     Version │ <none>           │
├─────────────┼──────────────────┤
│     Browser │ firefox-headless │
│             │ 132.0            │
├─────────────┼──────────────────┤
│ Sample size │ 25               │
└─────────────┴──────────────────┘

┌───────────────────────────────────┬──────────────┬───────────────────────┬──────────────────────────────────────┬─────────────────────────────────────┐
│ Benchmark                         │ Bytes        │              Avg time │ vs Shadow DOM styles with style tags │ vs Shadow DOM styles with link tags │
├───────────────────────────────────┼──────────────┼───────────────────────┼──────────────────────────────────────┼─────────────────────────────────────┤
│ Shadow DOM styles with style tags │ 92234.85 KiB │ 1293.05ms - 1393.19ms │                                      │                              slower │
│                                   │              │                       │                             -        │                         331% - 427% │
│                                   │              │                       │                                      │               1006.16ms - 1119.20ms │
├───────────────────────────────────┼──────────────┼───────────────────────┼──────────────────────────────────────┼─────────────────────────────────────┤
│ Shadow DOM styles with link tags  │ 1249.08 KiB  │   254.22ms - 306.66ms │                               faster │                                     │
│                                   │              │                       │                            77% - 81% │                            -        │
│                                   │              │                       │                1006.16ms - 1119.20ms │                                     │
└───────────────────────────────────┴──────────────┴───────────────────────┴──────────────────────────────────────┴─────────────────────────────────────┘
```

Safari:

```
┌─────────────┬────────┐
│     Version │ <none> │
├─────────────┼────────┤
│     Browser │ safari │
│             │ 18.1   │
├─────────────┼────────┤
│ Sample size │ 25     │
└─────────────┴────────┘

┌───────────────────────────────────┬──────────────┬───────────────────────┬──────────────────────────────────────┬─────────────────────────────────────┐
│ Benchmark                         │ Bytes        │              Avg time │ vs Shadow DOM styles with style tags │ vs Shadow DOM styles with link tags │
├───────────────────────────────────┼──────────────┼───────────────────────┼──────────────────────────────────────┼─────────────────────────────────────┤
│ Shadow DOM styles with style tags │ 92234.85 KiB │ 1308.36ms - 1369.00ms │                                      │                              slower │
│                                   │              │                       │                             -        │                         272% - 342% │
│                                   │              │                       │                                      │                969.11ms - 1050.81ms │
├───────────────────────────────────┼──────────────┼───────────────────────┼──────────────────────────────────────┼─────────────────────────────────────┤
│ Shadow DOM styles with link tags  │ 1249.08 KiB  │   301.34ms - 356.10ms │                               faster │                                     │
│                                   │              │                       │                            73% - 78% │                            -        │
│                                   │              │                       │                 969.11ms - 1050.81ms │                                     │
└───────────────────────────────────┴──────────────┴───────────────────────┴──────────────────────────────────────┴─────────────────────────────────────┘
```
