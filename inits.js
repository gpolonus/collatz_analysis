
const pf = require('prime-factors');
module.exports = {
    pf: n => pf(n),

    f: (n = 1, a = []) => n !== 1 ? (n % 2 ? (a.push(n), f(3*n + 1, a)) : f(n/2, a)) : a,

    fd: (n = 1, a = []) => n !== 1 ? (a.push(n) && n % 2 ? f(3*n + 1, a) : f(n/2, a)) : a,

    // given an ending number and a power of 2, return the second ending number
    d: (e, n) => (e * Math.pow(2,n) - 1) / 3,

    s: n => n % 2 ? 3 * n + 1 : n / 2,

    gs: (l, g) => n => n % l ? Math.ceil(g * n / l) : n / l,

    gf: (lesser, greater) => function inner(n = 1, a = []) {
        if (n !== 1) {
            if (n % lesser) {
                if (a.includes(n)) {
                    a.push(n)
                    a.push(Infinity)
                    return a;
                }
                a.push(n)
                return inner(Math.ceil(greater * n / lesser), a)
            } else {
                return inner(n / lesser, a)
            }
        } else {
            return a;
        }
    },

    gfl: (n, l, g) => {
        const func = gf(l, g)
        return Array(n).fill().map((_,i) => [ i + 3, func(i+3) ])
    },

    gflf: (...args) => this.gfl(...args).filter(([i, ar]) => ar[ar.length - 1] === Infinity ? false : i),

    


};

/**

Finding 'ending numbers'
a = [5]
f(a[0]*4 + 1).length === 1
a = f(a[0]*4 + 1)

because 4^n = 1 (mod 3)


Odd starting numbers are second ending numbers for 341 when they fit the form
```
(341 * Math.pow(2, 2n + 1) - 1) / 3
```
for all `n`. 
Because 341 = 2 (mod 3)


Odd starting numbers are second ending numbers for 85 when they fit the form
```
(85 * Math.pow(2, 2n) - 1) / 3
```
for all `n`. 
Because 85 = 1 (mod 3)


There are no second ending numbers for 21 because 21 and 3 are not coprime.

Therefore, ending numbers one more than a 3 multiple have second ending
numbers at even powers of two, and ending numbers two more have second
ending numbers at odd powers of two.

So the question becomes, is it possible to use this knowledge to determine that
every single odd number is reachable via this tree structure? 

*/