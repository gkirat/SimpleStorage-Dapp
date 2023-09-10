// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;



contract simpleStorage{
    uint  num ;

    function setter(uint x)public {
        num = x;
    }
    function getter()public view returns(uint){
        return num;
    }
}
