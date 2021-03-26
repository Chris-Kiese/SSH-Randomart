/**
 * To test the module a test rsa key was created. 
 * The randomarts are directly copied after they were created with ssh-keygen
 */
import {strict as assert} from "assert"
import { randomArt } from "../src/index.js"

//Test SHA256
const sha256 = 'wjqs7Nq/4Yg/OVm0bZgera0u40GHzj3IargfNJOiOvA'
const shaRandomart = `
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
`

assert(randomArt(sha256), shaRandomart, "Randomart from SHA256 fingerprint are not the same!");

//Test MD5
const md5 = '42:6d:f8:5b:18:bf:f6:fd:4c:9f:6c:05:5f:de:44:2c'
const md5Randomart = `
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
`

assert(randomArt(md5, true), md5Randomart, "Randomart from MD5 fingerprint are not the same!");

console.log('Tests passed successfully.')