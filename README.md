# Generate SSH randomart
Module to create randomart from SHA256 or MD5 fingerprints.\
The randomart is the same as randomart from OpenSSH. \
This module is builds the randomart with the drunken bishop algorithm. a detailed exoplanation can be found here: http://dirk-loss.de/sshvis/drunken_bishop.pdf

# Example
## SHA256
SHA256 fingerprints are expected by default:
```javascript
const sha256 = 'wjqs7Nq/4Yg/OVm0bZgera0u40GHzj3IargfNJOiOvA'

const ra = randomArt(sha256)

console.log(ra)
```
Output:
```
+---[RSA 2048]----+
|                 |
|                 |
|                 |
|   o..           |
|. B..*o S        |
|oB B*.+.         |
|+.B=B=           |
|+*E*o+.          |
|B0XB*o           |
+----[SHA256]-----+
```

## MD5
To use MD5 fingerprints it must be specified:
```javascript
const md5 = '42:6d:f8:5b:18:bf:f6:fd:4c:9f:6c:05:5f:de:44:2c'

const ra = randomArt(md5, true)

console.log(ra)
```
Output:
```
+---[RSA 2048]----+
|               . |
|       o      E o|
|      o +      o |
|     . o +    . o|
|      . S o    =o|
|       . o .    =|
|        . o     +|
|         . . . o+|
|o           . .o+|
+------[MD5]------+

```