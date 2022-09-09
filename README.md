# COLLATZ FUNCTIONS

Functions to help me solve the [Collatz conjecture](https://en.wikipedia.org/wiki/Collatz_conjecture).

## Usage

These functions are intended to be used on the node repl. The best way to have them automatically required upon repl startup is to use this bash alias:
```
alias node_inits='node -i -e "$(< ./inits.js)"'
```

Then running `node_inits` will start the node repl with all the functions declared in `./inits.js`.

## Findings Notes

_(What follows is a stream of consciousness of what I've found)_

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

