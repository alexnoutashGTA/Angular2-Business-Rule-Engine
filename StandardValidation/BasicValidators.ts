
    import {IStringValidator, IPropertyValidator, IAsyncPropertyValidator} from "./Validation";
    import {_Score} from "../_Score";
    class NumberFce {
        static GetNegDigits(value:string):number {
            if (value === undefined) return 0;
            var digits = value.toString().split('.');
            if (digits.length > 1) {
                return digits[1].length;
            }
            return 0;
        }
    }


    /**
     * Return true if it is a valid string letter representation, otherwise false.
     */
    export class LettersOnlyValidator implements IStringValidator {
        private lettersRegexp = /^[A-Za-z]+$/;
        isAcceptable(s:string) {
            if(s) {
                return this.lettersRegexp.test(s);
            }
            else {
                return true;
            }
        }

        tagName = "lettersonly";
    }

    export class AlphaNumericValidator implements IStringValidator {
        private alphanumericRegexp = /^[a-z0-9]+$/i;
        isAcceptable(s:string) {
            if(s) {
                return this.alphanumericRegexp.test(s);
            }
            else {
                return true;
            }
        }

        tagName = "alphanumeric";
    }

    export class PhoneOnlyValidator implements IStringValidator{
        private phoneRegexp= /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

        isAcceptable(s:string) {
            return this.phoneRegexp.test(s);
        }

        tagName = "phonevalidator";
    }

    /**
     * Return true if it is a valid zip code, otherwise false.
     */
    export class ZipCodeValidator implements IStringValidator {
        private numberRegexp = /[a-zA-Z][0-9][a-zA-Z](-| |)[0-9][a-zA-Z][0-9]/;
     /*/^[0-9]+$/;*/
        isAcceptable(s:string) {
            if(s) {
                return this.numberRegexp.test(s);//s.length === 5 &&
            }
            else {
                return true;
            }
        }

        tagName = "zipcode";
    }

    /**
     * Return true if it is a valid Internet email address as defined by RFC 5322, section 3.4.1, otherwise false
     */
    export class EmailValidator implements IStringValidator {

        // contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
        private emailRegexp = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
        isAcceptable(s:string) {
            if(s) {
                return this.emailRegexp.test(s);
            }
            else{
                return true;
            }
        }

        tagName = "email";
    }
    /**
     * Return true if it is a valid URI, according to [RFC3986], otherwise false.
     */
    export class UrlValidator implements IStringValidator {
        // contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
        private urlRegexp = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;

        isAcceptable(s:string) {
            return this.urlRegexp.test(s);
        }

        tagName = "url";
    }

    /**
     * Return true if it is a valid Luhn card number based on http://en.wikipedia.org/wiki/Luhn/, otherwise false;
     */
    export class CreditCardValidator implements IStringValidator {
        //taken from http://jqueryvalidation.org/creditcard-method/
        isAcceptable(value:string) {


            // accept only spaces, digits and dashes
            if (/[^0-9 \-]+/.test(value)) {
                return false;
            }
            var nCheck = 0,
                nDigit = 0,
                bEven = false,
                n, cDigit;

            value = value.replace(/\D/g, "");

            // Basing min and max length on
            // http://developer.ean.com/general_info/Valid_Credit_Card_Types
            if (value.length < 13 || value.length > 19) {
                return false;
            }

            for (n = value.length - 1; n >= 0; n--) {
                cDigit = value.charAt(n);
                nDigit = parseInt(cDigit, 10);
                if (bEven) {
                    if (( nDigit *= 2 ) > 9) {
                        nDigit -= 9;
                    }
                }
                nCheck += nDigit;
                bEven = !bEven;
            }

            return ( nCheck % 10 ) === 0;
        }

        tagName = "creditcard";
    }

    /**
     * Return true if it is not empty value, otherwise false.
     */
    export class RequiredValidator implements IStringValidator {
        isAcceptable(s:string) {
            return s !== undefined && s !== "";
        }

        tagName = "required";
    }
    /**
     * Return true if a value is equal (using strict equal) to passed value, otherwise false.
     */
    export class EqualToValidator implements IPropertyValidator {

        /**
         *
         * @param Value
         */
        constructor(public Value?:any) {

        }
        isAcceptable(s:any) {
            return s === this.Value;
        }

        tagName = "equalTo";
    }

    /**
     * Return true if it is a valid string date representation (can be parsed as date), otherwise false.
     */
    export class DateValidator implements IStringValidator {
        isAcceptable(s:string) {
            return !/Invalid|NaN/.test(new Date(s).toString());
        }

        tagName = "date";
    }

    /**
     * Return true if it is a valid string ISO date representation (can be parsed as ISO date), otherwise false.
     */
    export class DateISOValidator implements IStringValidator {
        isAcceptable(s:string) {
            return  /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(s);
        }

        tagName = "dateISO";
    }

    /**
     * Return true if it is a valid number representation, otherwise false.
     */
    export class NumberValidator implements IStringValidator {
        isAcceptable(s:string) {
            return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(s);
            //Old Value - /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(s);
            //New value - /^-?(\d+\.?\d*)$|(\d*\.?\d+)$/
        }

        tagName = "number";
    }
    /**
     * Return true if it is a valid digit representation, otherwise false.
     */
    export class DigitValidator implements IStringValidator {
        isAcceptable(s:string) {
            return /^\d+$/.test(s);
        }

        tagName = "digit";
    }
    /**
     * Return true if it is a valid positive or negative digit representation, otherwise false.
     */
    export class SignedDigitValidator implements IStringValidator {
        isAcceptable(s:string) {
            return /^-?\d+$/.test(s);
        }

        tagName = "signedDigit";
    }
    var MinimalDefaultValue = 0;
    /**
     * Return true if string length is greater or equal to MinLength property.
     */
    export class MinLengthValidator implements IStringValidator {
        /**
         * Default constructor
         * @param MinLength - minimal number of characters.
         */
        constructor(public MinLength?:number) {
            if (MinLength === undefined) this.MinLength = MinimalDefaultValue;
        }

        isAcceptable(s:string) {
            if (!s) return false;
            return s.length >= this.MinLength;
        }

        tagName = "minlength";
    }
    var MaximalDefaultValue = 0;
    /**
     * Return true if string length is less or equal to MaxLength property.
     */
    export class MaxLengthValidator implements IStringValidator {

        /**
         * Default constructor.
         * @param MaxLength - maximal number of characters.
         */
        constructor(public MaxLength?:number) {
            if (MaxLength === undefined) this.MaxLength = MaximalDefaultValue;
        }

        isAcceptable(s:string) {
            if (!s) return false;
            return s.length <= this.MaxLength;
        }

        tagName = "maxlength";
    }

    /**
     * Return true if string length is between MinLength and MaxLength property.
     */
    export class RangeLengthValidator implements IStringValidator {
        /**
         * Default constructor.
         * @param RangeLength - array [minimal number of characters, maximal number of characters]
         */
        constructor(public RangeLength?:Array<number>) {
            if (RangeLength === undefined) this.RangeLength = [MinimalDefaultValue, MaximalDefaultValue];
        }

        isAcceptable(s:string) {
            if (!s) return false;
            return s.length >= this.MinLength && s.length <= this.MaxLength;
        }

        public get MinLength():number {
            return this.RangeLength[0];
        }

        public get MaxLength():number {
            return this.RangeLength[1];
        }

        tagName = "rangelength";
    }

    /**
     * Return true only for these conditions
     * if "Exclusive" is false, then the instance is valid if it is greater than, or equal to, the value of "minimum";
     * if "Exclusive" is true, the instance is valid if it is strictly greater than the value of "minimum".
     *
     *  @require underscore
     */
    export class MinValidator implements IPropertyValidator {

        /**
         * Default constructor.
         * @param Min - the value of "minimum"
         * @param Exclusive - true = strictly greater, otherwise greater or equal to the value of "minimum";
         */
        constructor(public Min?:number,public Exclusive?:boolean) {
            if (Min === undefined) this.Min = MinimalDefaultValue;
        }

        isAcceptable(s:any) {
            //if (!_.isNumber(s)) s = parseFloat(s);
            //TODO:underscore
            if (!_Score.isNumber(s)) s = parseFloat(s);
            return this.Exclusive?( s> this.Min):( s >= this.Min);
        }

        tagName = "min";
    }

    /**
     * Return true if the number of items in array is lower or equal to the value of "minimum".
     *
     *  @require underscore
     */
    export class MinItemsValidator implements IPropertyValidator {
        /**
         * Default constructor.
         * @param Max - the value of "minimum"
         */
        constructor(public Min?:number) {
            if (Min === undefined) this.Min = MinimalDefaultValue;
        }

        isAcceptable(s:any) {
            //if (_.isArray(s)) return s.length >=this.Min;
            //underscore
            if (_Score.isArray(s)) return s.length >=this.Min;
            return false;
        }

        tagName = "minItems";
    }
    /**
     * Return true only for these conditions
     * if "Exclusive" is false, then the instance is valid if it is lower than, or equal to, the value of "maximum";
     * if "Exclusive" is true, the instance is valid if it is strictly lower than the value of "maximum".
     *
     *  @require underscore
     */
    export class MaxValidator implements IPropertyValidator {

        /**
         * Default constructor
         * @param Max - the value of "maximum"
         * @param Exclusive - true = strictly lower, otherwise lower or equal to the value of "maximum";
         */
        constructor(public Max?:number, public Exclusive?:boolean) {
            if (Max === undefined) this.Max = MaximalDefaultValue;
        }

        isAcceptable(s:any) {
            if (!_Score.isNumber(s)) s = parseFloat(s);

            return this.Exclusive? (s<this.Max): (s<=this.Max);
        }

        tagName = "max";
    }
    /**
     * Return true if an number of items in array is greater or equal to the value of "maximum".
     *
     *  @require underscore
     */
    export class MaxItemsValidator implements IPropertyValidator {
        /**
         * Default constructor.
         * @param Max - the value of "maximum"
         */
        constructor(public Max?:number) {
            if (Max === undefined) this.Max = MaximalDefaultValue;
        }

        isAcceptable(s:any) {
            if (_Score.isArray(s)) return s.length <=this.Max;
            return false;
        }

        tagName = "maxItems";
    }

    /**
     * Return true if the array contains unique items (using strict equality), otherwise false.
     *
     *  @require underscore
     */
    export class UniqItemsValidator implements IPropertyValidator {

        isAcceptable(s:any) {
            if (_Score.isArray(s)) return _Score.uniq(s).length === s.length;
            return false;
        }

        tagName = "uniqItems";
    }

    /**
     * Return true if value is between Min and Max property.
     *
     *  @require underscore
     */
    export class RangeValidator implements IPropertyValidator {

        /**
         * Default constructor.
         * @param Range - array [the value of "minimum", the value of "maximum"]
         */
        constructor(public Range?:Array<number>) {
            if (Range === undefined) this.Range = [MinimalDefaultValue, MaximalDefaultValue];
        }

        isAcceptable(s:any) {
            if (!_Score.isNumber(s)) s = parseFloat(s);
            return s >= this.Min && s <= this.Max;
        }

        /**
         * Return the value of "minimum"
         * @returns {number}
         */
        public get Min():number {
            return this.Range[0];
        }

        /**
         * Return the value of "maximum"
         * @returns {number}
         */
        public get Max():number {
            return this.Range[1];
        }

        tagName = "range";
    }

    /**
     * Return true if an value is any of predefined values (using strict equality), otherwise false.
     *
     *  @require underscore
     */
    export class EnumValidator implements IPropertyValidator {

        /**
         * Default constructor.
         * @param Enum - array of values
         */
        constructor(public Enum?:Array<number>) {
            if (Enum === undefined) this.Enum = [];
        }

        isAcceptable(s:any) {
            return _Score.contains(this.Enum,s);
        }
        tagName = "enum";
    }

    /**
     * Return true if an value is a specified type, otherwise false.
     *
     *  @require underscore
     */
    export class TypeValidator implements IPropertyValidator {

        /**
         * Default constructor.
         * @param Type - keywords that defines an concrete type
         */
        constructor(public Type:string) {
            if (this.Type === undefined) this.Type = "string";
        }

        isAcceptable(s:any) {
            if (this.Type === "string") return _Score.isString(s);
            if (this.Type === "boolean") return _Score.isBoolean(s);
            if (this.Type === "number") return _Score.isNumber(s);
            if (this.Type === "integer") return /^\d+$/.test(s);
            if (this.Type === "object") return _Score.isObject(s);
            if (this.Type === "array") return _Score.isArray(s);
            return false;
        }
        tagName = "type";
    }

    /**
     * Return true if an value is multiplier of passed number step, otherwise false.
     */
    export class StepValidator implements IPropertyValidator {
        private StepDefaultValue = "1";

        /**
         * Default constructor.
         * @param Step - step multiplier
         */
        constructor(public Step?:string) {
            if (Step === undefined) this.Step = this.StepDefaultValue;
        }

        isAcceptable(s:any) {

            var maxNegDigits = Math.max(NumberFce.GetNegDigits(s), NumberFce.GetNegDigits(this.Step));
            var multiplier = Math.pow(10, maxNegDigits);
            return (parseInt(s,10) * multiplier) % (parseInt(this.Step,10) * multiplier) === 0;
        }

        tagName = "step";
    }

    /**
     * Return true if a numeric instance is valid against "multipleOf" if the result of the division of the instance by this keyword's value is an integer, otherwise false.
     *
     *  @require underscore
     */
    export class MultipleOfValidator implements IPropertyValidator {
        private MultipleOfDefaultValue = 1;

        /**
         * Default constructor
         * @param Divider
         */
        constructor(public Divider?:number) {
            if (Divider === undefined) this.Divider = this.MultipleOfDefaultValue;
        }

        isAcceptable(s:any) {
            if (!_Score.isNumber(s)) return false;
            return (s % this.Divider) % 1 === 0;
        }

        tagName = "multipleOf";
    }
    /**
     * Return true if an value is valid against specified pattern, otherwise false.
     */
    export class PatternValidator implements IStringValidator {

        /**
         * Default constructor.
         * @param Pattern - pattern
         */
        constructor(public Pattern?:string) {
        }

        isAcceptable(s:string) {
            return new RegExp(this.Pattern).test(s);
        }

        tagName = "pattern";
    }

    /**
     * Return true if an value is any of predefined values (using strict equality), otherwise false.
     * Predefined values are fetched async with options service.
     *
     * @require underscore
     * @require Q
     */
    export class ContainsValidator implements IAsyncPropertyValidator {

        /**
         * Default constructor.
         * @param Options - async service that returns array of values.
         *
         *
         */
        constructor(public Options:Promise<Array<any>>) {
            if (Options === undefined) this.Options = Promise.resolve(new Array<any>());
        }

        isAcceptable(s:string):Promise<boolean> {
            var subResult;
            //var deferred:Q.Deferred<boolean> = Q.defer<boolean>();
            var deferred:Promise<boolean> = new Promise<boolean>(x=>x(subResult));

            this.Options.then(function (result) {
                var hasSome = _Score.some(result, function (item) {
                    return item === s;
                });
                if (hasSome){
                    subResult=true;
                    Promise.resolve(deferred);
                }
                subResult=false;
                Promise.resolve(deferred)
            });
            return deferred;
        }

        isAsync = true;
        tagName = "contains";
    }

    export interface IRemoteOptions{
        url:any;
        type?:string;
        data?:any;
    }
    /**
     * Return true if remote service returns true, otherwise false.
     *
     * @require underscore
     * @require Q
     * @require axios
     *
     * @example
     * ```typescript
     *  url: 'http://test/validateEmail',
     *  ```
     */
    export class RemoteValidator implements IAsyncPropertyValidator {
        private axios:any;
        /**
         * Default constructor
         * @param Options - remote service url + options
         */
        constructor(public Options?:IRemoteOptions) {

            //TODO:axios
            //this.axios = require('axios');
        }

        isAcceptable(s:any):Promise<boolean> {
            var subResult;
            //var deferred:Q.Deferred<boolean> = Q.defer<boolean>();
            var deferred:Promise<boolean> = new Promise<boolean>(x=>x(subResult));

            this.axios.post(this.Options.url,
                {
                    method: this.Options.type || "get",
                    data: _Score.extend({} || this.Options.data, {
                        "value": s
                    })
                }
            ).then(function (response) {
                var isAcceptable = response === true || response === "true";
                subResult=isAcceptable
                Promise.resolve(deferred);
            })
                .catch(function (response) {
                    subResult=false;
                    Promise.resolve(subResult);
                    console.log(response);
                });

            return deferred;
        }
        isAsync = true;
        tagName = "remote";
    }

