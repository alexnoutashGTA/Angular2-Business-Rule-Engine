export class _Score {
    constructor() {

    }

    static isNumber(s: any): boolean {
        return (typeof s === 'number');
    }

    static isBoolean(s: any): boolean {
        return (typeof s === 'boolean');
    }

    static isString(s: any): boolean {
        return (typeof s === 'string');
    }

    static isObject(s: any): boolean {
        return (typeof s === 'object');
    }

    static isFunction(s: any): boolean {
        return (Object.prototype.toString.call(s) === '[object Function]');
    }

    static isArray(s: any): boolean {
        return (Object.prototype.toString.call(s) === '[object Array]')
    }


    static uniq(array: any): any {
        var result = new Array<any>()
        for (var i = 0, length = array.length; i < length; i++) {
            var value = array[i];
            var ind = result.indexOf(result);
            if (ind < 0) {
                result.push(value);
            }
        }
        return result;
    }

    static contains(set: Array<any>, lookupObj: any): boolean {
        var result = set.indexOf(lookupObj);
        return (result >= 0)
    }

    static extend(obj1: any, obj2: any) {
        for (var ind in obj2) {
            obj1[ind] = obj2[ind];
        }
    }

    static some(obj, predicate) {
        for (var index in obj) {
            if (predicate(obj[index])) return true;
        }
        return false;
    };

    static isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    };

    static lpad(str, length, padStr) {
        return _Score.pad(str, length, padStr,'left');
    };

    static rpad(str, length, padStr) {
      return _Score.pad(str, length, padStr, 'right');
    };

    static lrpad(str, length, padStr) {
       return _Score.pad(str, length, padStr, 'both');
    }

    static pad(str, length, padStr, type) {
        str = str == null ? '' : String(str);
        length = ~~length;

        var padlen = 0;

        if (!padStr)
            padStr = ' ';
        else if (padStr.length > 1)
            padStr = padStr.charAt(0);

        switch (type) {
            case 'right':
                padlen = length - str.length;
                return str + _Score.strRepeat(padStr, padlen);
            case 'both':
                padlen = length - str.length;
                return _Score.strRepeat(padStr, Math.ceil(padlen / 2)) + str
                    + _Score.strRepeat(padStr, Math.floor(padlen / 2));
            default: // 'left'
                padlen = length - str.length;
                return _Score.strRepeat(padStr, padlen) + str;
        }
    }

    static strRepeat(str, qty) {
        if (qty < 1) return '';
        var result = '';
        while (qty > 0) {
            if (qty & 1) result += str;
            qty >>= 1, str += str;
        }
        return result;
    }
}