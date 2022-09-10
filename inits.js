
// utility for finding the prime factorization of a number
const pf = require('prime-factors');

// collatz function
const f = (n = 1, a = []) => n !== 1 ? (n % 2 ? (a.push(n), f(3*n + 1, a)) : f(n/2, a)) : a

// debugged collatz function
const fd = (n = 1, a = []) => n !== 1 ? (a.push(n) && n % 2 ? f(3*n + 1, a) : f(n/2, a)) : a

// given an ending number and a power of 2, return the second ending number
const d = (e, n) => (e * Math.pow(2,n) - 1) / 3

// collatz step
const s = n => n % 2 ? 3 * n + 1 : n / 2

// generate collatz step
const gs = (l, g) => n => n % l ? Math.ceil(g * n / l) : n / l

// recursive collatz function generator
const rgf = (lesser, greater) => function inner(n = 1, a = []) {
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
}

// generate collatz function
const gf = (lesser, greater) => n => {
    const a = [];
    while (n !== 1) {
        if (n % lesser) {
            if (a.includes(n)) {
                a.push(n)
                a.push(Infinity)
                return a;
            }
            a.push(n)
            n = Math.ceil(greater * n / lesser)
        } else {
            n = n / lesser
        }
    }
    return a;
}

// run collatz function over a series of numbers
const gfl = (n, l, g) => {
    const func = gf(l, g)
    return Array(n).fill().map((_,i) => [ i + 3, func(i+3) ])
}

// filter out loops from a series of collatz results
const gflni = (...args) => gfl(...args).filter(([i, ar]) => ar[ar.length - 1] !== Infinity)

// filter out convergences from a series of collatz results
const gflii = (...args) => gfl(...args).filter(([i, ar]) => ar[ar.length - 1] === Infinity)

// util function for reducing tuples
const tupleReduce = (tuples) =>
    tuples.reduce((ac, [i, last]) => ({...ac, [last]: [...(ac[last] || []), i]}),{})

// see all looping numbers for series of collatz results
const gfliiEnds = (...args) => tupleReduce(gflii(...args).map(([i, ar]) => [i, ar[ar.length - 2]]))

// generator for incrementing the initial argument and returning the result
const inc = (func, n = 2) => () => [n, func(n++)]

// generator for step by step recursion
const rec = (func, n) => () => n = func(n)

// count query
const instances = ar => ar.reduce((ac, n) => ({ ...ac, [n]: (ac[n] || 0) + 1 }), {})

const ff = rec(gs(2,7), 11)
const a = []
let stop = false
const fff = () => {a.push(ff());if(a[a.length-1] !== 1 && !stop){setTimeout(fff)} else console.log('stopped')}
/**
Find dups:
a.sort((a,b) => a - b)
a.forEach((n, i) => n === a[i-1] && console.log('found:', n))
 */

