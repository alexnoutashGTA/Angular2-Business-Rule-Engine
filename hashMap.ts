import construct = Reflect.construct;
/**
 * HashMap - HashMap Class for JavaScript
 * @author Ariel Flesler <aflesler@gmail.com>
 * @version 1.2.0
 * Homepage: https://github.com/flesler/hashmap
 */

export class HashMap{

    _data:Array<any>;
    uid :number;

    constructor(){
        this.clear();
        this._data=new Array<any>()
        this.uid = 0;
    }

        get(key:any):any {
            var data = this._data[this.hash(key)];
            return data && data[1];
        }

        set(key:any, value:any) {
            // Store original key as well (for iteration)
            this._data[this.hash(key)] = [key, value];
        }

        has(key:any):any {
            return this.hash(key) in this._data;
        }

        search(value:any) {
            for (var key in this._data) {
                if (this._data[key][1] === value) {
                    return this._data[key][0];
                }
            }
            return null;
        }

        remove(key:any) {
            delete this._data[this.hash(key)];
        }

        type(key:any):any {
            var str = Object.prototype.toString.call(key);
            var type = str.slice(8, -1).toLowerCase();
            // Some browsers yield DOMWindow for null and undefined, works fine on Node
            if (type === 'domwindow' && !key) {
                return key + '';
            }
            return type;
        }

        keys():Array<any> {
            var keys = new Array<any>();
            this.forEach(function (value, key) {
                keys.push(key);
            });
            return keys;
        }

        values():any {
            var values = [];
            this.forEach(function (value) {
                values.push(value);
            });
            return values;
        }

        count():any {
            return this.keys().length;
        }

        clear() {
            // TODO: Would Object.create(null) make any difference
            this._data = new Array<any>();
        }

        hash(key:any):any {
            switch (this.type(key)) {
                case 'undefined':
                case 'null':
                case 'boolean':
                case 'number':
                case 'regexp':
                    return key + '';

                case 'date':
                    return ':' + key.getTime();

                case 'string':
                    return '"' + key;

                case 'array':
                    var hashes = [];
                    for (var i = 0; i < key.length; i++)
                        hashes[i] = this.hash(key[i]);
                    return '[' + hashes.join('|');

                case 'object':
                default:
                    // TODO: Don't use expandos when Object.defineProperty is not available?
                    if (!key._hmuid_) {
                        key._hmuid_ = ++this.uid;
                        this.hide(key, '_hmuid_');
                    }
                    return '{' + key._hmuid_;
            }
        }

        forEach(func:any) {
            for (var key in this._data) {
                var data = this._data[key];
                func.call(this, data[1], data[0]);
            }
        }


    hide(obj:any, prop:any) {
        // Make non iterable if supported
        if (Object.defineProperty) {
            Object.defineProperty(obj, prop, {enumerable: false});
        }
    };
}
