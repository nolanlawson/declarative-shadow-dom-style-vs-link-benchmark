# declarative-shadow-dom-style-vs-link-benchmark

This is a browser benchmark of loading 100 declarative shadow roots, each containing `<link rel=stylesheet>`s for
Bootstrap.css, plus some HTML markup, versus roughly the same thing using `<style>`s rather than `<link>`s.

There's also a few other flavors:

* light DOM that compares the same thing, but without any declarative shadow roots, and optionally hoisting duplicated
  `<style>`s into a single `<style>` or `<link>` in the `<head>`.
* The above, but using the strategy of inline JavaScript or inline web components to copy styles into
  `adoptedStyleSheets`.

## Usage

    npm i

    # start the server in a separate console
    npm start

    # now run:
    npm test
    npm run test:light # light dom tests

## Results

### Shadow DOM

Chrome:

```
┌─────────────┬─────────────────┐
│     Version │ <none>          │
├─────────────┼─────────────────┤
│     Browser │ chrome-headless │
├─────────────┼─────────────────┤
│ Sample size │ 25              │
├─────────────┼─────────────────┤
│       Bytes │ 0.00 KiB        │
└─────────────┴─────────────────┘

┌───────────┬───────────────────────┬───────────────────────┬───────────────────────┬───────────────────────┐
│ Benchmark │              Avg time │            vs <style> │             vs <link> │          vs component │
├───────────┼───────────────────────┼───────────────────────┼───────────────────────┼───────────────────────┤
│ <style>   │ 2195.79ms - 2223.17ms │                       │                slower │                slower │
│           │                       │              -        │           178% - 183% │         1278% - 1424% │
│           │                       │                       │ 1406.69ms - 1437.13ms │ 2041.54ms - 2072.84ms │
├───────────┼───────────────────────┼───────────────────────┼───────────────────────┼───────────────────────┤
│ <link>    │   780.91ms - 794.22ms │                faster │                       │                slower │
│           │                       │             64% - 65% │              -        │           391% - 443% │
│           │                       │ 1406.69ms - 1437.13ms │                       │   625.19ms - 645.36ms │
├───────────┼───────────────────────┼───────────────────────┼───────────────────────┼───────────────────────┤
│ component │   144.71ms - 159.87ms │                faster │                faster │                       │
│           │                       │             93% - 93% │             80% - 82% │              -        │
│           │                       │ 2041.54ms - 2072.84ms │   625.19ms - 645.36ms │                       │
└───────────┴───────────────────────┴───────────────────────┴───────────────────────┴───────────────────────┘
```

Firefox:

```
┌─────────────┬──────────────────┐
│     Version │ <none>           │
├─────────────┼──────────────────┤
│     Browser │ firefox-headless │
├─────────────┼──────────────────┤
│ Sample size │ 25               │
├─────────────┼──────────────────┤
│       Bytes │ 0.00 KiB         │
└─────────────┴──────────────────┘

┌───────────┬─────────────────────┬─────────────────────┬─────────────────────┬─────────────────────┐
│ Benchmark │            Avg time │          vs <style> │           vs <link> │        vs component │
├───────────┼─────────────────────┼─────────────────────┼─────────────────────┼─────────────────────┤
│ <style>   │ 827.48ms - 912.84ms │                     │              slower │              slower │
│           │                     │            -        │         227% - 342% │         417% - 484% │
│           │                     │                     │ 590.42ms - 697.18ms │ 669.10ms - 755.22ms │
├───────────┼─────────────────────┼─────────────────────┼─────────────────────┼─────────────────────┤
│ <link>    │ 194.30ms - 258.42ms │              faster │                     │              slower │
│           │                     │           70% - 78% │            -        │           22% - 64% │
│           │                     │ 590.42ms - 697.18ms │                     │  35.80ms - 100.92ms │
├───────────┼─────────────────────┼─────────────────────┼─────────────────────┼─────────────────────┤
│ component │ 152.29ms - 163.71ms │              faster │              faster │                     │
│           │                     │           81% - 83% │           20% - 40% │            -        │
│           │                     │ 669.10ms - 755.22ms │  35.80ms - 100.92ms │                     │
└───────────┴─────────────────────┴─────────────────────┴─────────────────────┴─────────────────────┘
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

### Light DOM

Chrome:

```
┌─────────────┬─────────────────┐
│     Version │ <none>          │
├─────────────┼─────────────────┤
│     Browser │ chrome-headless │
│             │ 131.0.0.0       │
├─────────────┼─────────────────┤
│ Sample size │ 10              │
└─────────────┴─────────────────┘

┌─────────────────┬──────────────┬─────────────────────────┬─────────────────────────┬─────────────────────────┬─────────────────────────┬─────────────────────────┐
│ Benchmark       │ Bytes        │                Avg time │              vs <style> │               vs <link> │      vs hoisted <style> │       vs hoisted <link> │
├─────────────────┼──────────────┼─────────────────────────┼─────────────────────────┼─────────────────────────┼─────────────────────────┼─────────────────────────┤
│ <style>         │ 92230.65 KiB │ 47229.06ms - 58461.44ms │                         │                  slower │                  slower │                  slower │
│                 │              │                         │                -        │           1175% - 1995% │         37168% - 46801% │         41960% - 54670% │
│                 │              │                         │                         │ 44051.57ms - 55367.45ms │ 47103.48ms - 58335.88ms │ 47119.90ms - 58352.30ms │
├─────────────────┼──────────────┼─────────────────────────┼─────────────────────────┼─────────────────────────┼─────────────────────────┼─────────────────────────┤
│ <link>          │ 1244.88 KiB  │   2449.69ms - 3821.79ms │                  faster │                         │                  slower │                  slower │
│                 │              │                         │               93% - 96% │                -        │           1841% - 2954% │           2107% - 3439% │
│                 │              │                         │ 44051.57ms - 55367.45ms │                         │   2324.10ms - 3696.24ms │   2340.49ms - 3712.69ms │
├─────────────────┼──────────────┼─────────────────────────┼─────────────────────────┼─────────────────────────┼─────────────────────────┼─────────────────────────┤
│ hoisted <style> │ 1415.68 KiB  │     120.24ms - 130.90ms │                  faster │                  faster │                         │                  slower │
│                 │              │                         │             100% - 100% │               95% - 97% │                -        │                5% - 25% │
│                 │              │                         │ 47103.48ms - 58335.88ms │   2324.10ms - 3696.24ms │                         │        6.46ms - 26.38ms │
├─────────────────┼──────────────┼─────────────────────────┼─────────────────────────┼─────────────────────────┼─────────────────────────┼─────────────────────────┤
│ hoisted <link>  │ 1177.27 KiB  │     100.74ms - 117.56ms │                  faster │                  faster │                  faster │                         │
│                 │              │                         │             100% - 100% │               96% - 97% │                5% - 21% │                -        │
│                 │              │                         │ 47119.90ms - 58352.30ms │   2340.49ms - 3712.69ms │        6.46ms - 26.38ms │                         │
└─────────────────┴──────────────┴─────────────────────────┴─────────────────────────┴─────────────────────────┴─────────────────────────┴─────────────────────────┘
```

Firefox:

```
┌─────────────┬──────────────────┐
│     Version │ <none>           │
├─────────────┼──────────────────┤
│     Browser │ firefox-headless │
│             │ 132.0            │
├─────────────┼──────────────────┤
│ Sample size │ 10               │
└─────────────┴──────────────────┘

┌─────────────────┬──────────────┬───────────────────────┬───────────────────────┬──────────────────────┬───────────────────────┬───────────────────────┐
│ Benchmark       │ Bytes        │              Avg time │            vs <style> │            vs <link> │    vs hoisted <style> │     vs hoisted <link> │
├─────────────────┼──────────────┼───────────────────────┼───────────────────────┼──────────────────────┼───────────────────────┼───────────────────────┤
│ <style>         │ 92230.65 KiB │ 1424.58ms - 2347.22ms │                       │               slower │                slower │                slower │
│                 │              │                       │              -        │           25% - 112% │         1205% - 2130% │         1614% - 2775% │
│                 │              │                       │                       │ 298.66ms - 1236.54ms │ 1317.77ms - 2240.63ms │ 1342.35ms - 2265.05ms │
├─────────────────┼──────────────┼───────────────────────┼───────────────────────┼──────────────────────┼───────────────────────┼───────────────────────┤
│ <link>          │ 1244.88 KiB  │ 1034.08ms - 1202.52ms │                faster │                      │                slower │                slower │
│                 │              │                       │             26% - 56% │             -        │          822% - 1074% │         1125% - 1395% │
│                 │              │                       │  298.66ms - 1236.54ms │                      │  926.79ms - 1096.41ms │  951.71ms - 1120.49ms │
├─────────────────┼──────────────┼───────────────────────┼───────────────────────┼──────────────────────┼───────────────────────┼───────────────────────┤
│ hoisted <style> │ 1415.68 KiB  │    96.74ms - 116.66ms │                faster │               faster │                       │                slower │
│                 │              │                       │             93% - 96% │            89% - 92% │              -        │             15% - 45% │
│                 │              │                       │ 1317.77ms - 2240.63ms │ 926.79ms - 1096.41ms │                       │     13.21ms - 35.79ms │
├─────────────────┼──────────────┼───────────────────────┼───────────────────────┼──────────────────────┼───────────────────────┼───────────────────────┤
│ hoisted <link>  │ 1177.27 KiB  │     76.89ms - 87.51ms │                faster │               faster │                faster │                       │
│                 │              │                       │             95% - 97% │            92% - 93% │             14% - 32% │              -        │
│                 │              │                       │ 1342.35ms - 2265.05ms │ 951.71ms - 1120.49ms │     13.21ms - 35.79ms │                       │
└─────────────────┴──────────────┴───────────────────────┴───────────────────────┴──────────────────────┴───────────────────────┴───────────────────────┘
```

Safari:

```
┌─────────────┬────────┐
│     Version │ <none> │
├─────────────┼────────┤
│     Browser │ safari │
│             │ 18.1   │
├─────────────┼────────┤
│ Sample size │ 20     │
└─────────────┴────────┘

┌─────────────────┬──────────────┬───────────────────────┬───────────────────────┬───────────────────────┬───────────────────────┬───────────────────────┐
│ Benchmark       │ Bytes        │              Avg time │            vs <style> │             vs <link> │    vs hoisted <style> │     vs hoisted <link> │
├─────────────────┼──────────────┼───────────────────────┼───────────────────────┼───────────────────────┼───────────────────────┼───────────────────────┤
│ <style>         │ 92230.65 KiB │ 2595.41ms - 3027.79ms │                       │                slower │                slower │                slower │
│                 │              │                       │              -        │             62% - 90% │         3351% - 4084% │         2925% - 3468% │
│                 │              │                       │                       │  993.86ms - 1429.44ms │ 2521.72ms - 2954.18ms │ 2510.09ms - 2942.51ms │
├─────────────────┼──────────────┼───────────────────────┼───────────────────────┼───────────────────────┼───────────────────────┼───────────────────────┤
│ <link>          │ 1244.88 KiB  │ 1573.60ms - 1626.30ms │                faster │                       │                slower │                slower │
│                 │              │                       │             39% - 48% │              -        │         1942% - 2202% │         1712% - 1839% │
│                 │              │                       │  993.86ms - 1429.44ms │                       │ 1499.61ms - 1552.99ms │ 1488.18ms - 1541.12ms │
├─────────────────┼──────────────┼───────────────────────┼───────────────────────┼───────────────────────┼───────────────────────┼───────────────────────┤
│ hoisted <style> │ 1415.68 KiB  │     69.41ms - 77.89ms │                faster │                faster │                       │                faster │
│                 │              │                       │             97% - 98% │             95% - 96% │              -        │              8% - 19% │
│                 │              │                       │ 2521.72ms - 2954.18ms │ 1499.61ms - 1552.99ms │                       │      6.72ms - 16.58ms │
├─────────────────┼──────────────┼───────────────────────┼───────────────────────┼───────────────────────┼───────────────────────┼───────────────────────┤
│ hoisted <link>  │ 1177.27 KiB  │     82.79ms - 87.81ms │                faster │                faster │                slower │                       │
│                 │              │                       │             97% - 97% │             94% - 95% │              8% - 23% │              -        │
│                 │              │                       │ 2510.09ms - 2942.51ms │ 1488.18ms - 1541.12ms │      6.72ms - 16.58ms │                       │
└─────────────────┴──────────────┴───────────────────────┴───────────────────────┴───────────────────────┴───────────────────────┴───────────────────────┘
```
