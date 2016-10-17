import {IAbstractValidator, IAbstractValidationRule, AbstractValidator} from "./Validation";
import {
    MaxLengthValidator, RemoteValidator, RequiredValidator, TypeValidator, EmailValidator,
    UrlValidator, MinLengthValidator, RangeLengthValidator, MaxValidator, MinValidator, RangeValidator, DateValidator,
    DateISOValidator, NumberValidator, DigitValidator, CreditCardValidator, EqualToValidator, MinItemsValidator,
    MaxItemsValidator, UniqItemsValidator, EnumValidator, MultipleOfValidator, PatternValidator
} from "./BasicValidators";

import {TYPE_KEY, PROPERTIES_KEY, ARRAY_KEY} from "./SchemaUtil";
import {_Score} from "../_Score";


    export interface IValidationRuleFactory{
        /**
         * Create an validation rule
         * @param name - the name of rule
         */
        CreateRule(name:string):IAbstractValidationRule<any>;

        /**
         * Create an abstract validator.
         */
        CreateAbstractValidator():IAbstractValidator<any>;
    }

    /**
     * It represents the JSON schema factory for creating validation rules based on JSON form schema.
     * It uses constraints keywords from JSON Schema Validation specification.
     */
    export class JsonSchemaRuleFactory implements IValidationRuleFactory{

        /**
         * Default constructor
         * @param jsonSchema JSON schema for business rules.
         */
        constructor(private jsonSchema:any){
        }

        /**
         * Return abstract validation rule by traversing  JSON schema.
         * @returns {IAbstractValidator<any>} return validation rule
         */
        public CreateAbstractValidator():IAbstractValidator<any>{
            return this.ParseAbstractRule(this.jsonSchema);
        }

        /**
         * Return concrete validation rule structured according to JSON schema.
         * @param name validation rule name
         * @returns {IAbstractValidationRule<any>} return validation rule
         */
        public CreateRule(name:string):IAbstractValidationRule<any>{
            return this.ParseAbstractRule(this.jsonSchema).CreateRule(name);
        }


        /**
         * Returns an concrete validation rules structured according to JSON schema.
         */
        private ParseAbstractRule(formSchema:any):IAbstractValidator<any> {

            //TODO:RF
            var rule = new AbstractValidator<any>();

            for (var key in formSchema) {
                var item = formSchema[key];
                var type = item[TYPE_KEY];
                if (type === "object") {
                    rule.ValidatorFor(key, this.ParseAbstractRule(item[PROPERTIES_KEY]));
                }
                else if (type === "array") {
                   /!* _.each(this.ParseValidationAttribute(item),function(validator){ rule.RuleFor(key,validator)});*!/
                   var validators=this.ParseValidationAttribute(item);
                    validators.forEach(validator=>{rule.RuleFor(key,validator)});
                    rule.ValidatorFor(key, this.ParseAbstractRule(item[ARRAY_KEY][PROPERTIES_KEY]), true);
                }
                else {
                    /!*_.each(this.ParseValidationAttribute(item),function(validator){ rule.RuleFor(key,validator)});*!/
                    var validators = this.ParseValidationAttribute(item);
                    validators.forEach(validator=>{rule.RuleFor(key,validator)});
                }
            }
            return rule;
           //return;
        }
        /**
         * Return list of property validators that corresponds json items for JSON form validation tags.
         * See keywords specifications -> http://json-schema.org/latest/json-schema-validation.html
         */
        private ParseValidationAttribute(item:any):Array<any> {

            var validators = new Array<any>();
            if (item === undefined) return validators;

            //5.  Validation keywords sorted by instance types
            //http://json-schema.org/latest/json-schema-validation.html

            //5.1. - Validation keywords for numeric instances (number and integer)
            // multipleOf validation
            validation = item["multipleOf"];
            if (validation !== undefined) {
                validators.push(new MultipleOfValidator(validation));
            }

            // maximum validation
            validation = item["maximum"];
            if (validation !== undefined) {
                validators.push(new MaxValidator(validation,item["exclusiveMaximum"]));
            }

            // minimum validation
            validation = item["minimum"];
            if (validation !== undefined) {
                validators.push(new MinValidator(validation,item["exclusiveMinimum"]));
            }

            //5.2. - Validation keywords for strings

            // maxLength validation
            validation = item["maxLength"];
            if (validation !== undefined) {
                validators.push(new MaxLengthValidator(validation));
            }

            // minLength validation
            validation = item["minLength"];
            if (validation !== undefined) {
                validators.push(new MinLengthValidator(validation));
            }
            // pattern validation
            validation = item["pattern"];
            if (validation !== undefined) {
                validators.push(new PatternValidator(validation));
            }


            //5.3.  Validation keywords for arrays
            //TODO: additionalItems and items

            // min items validation
            validation= item["minItems"];
            if (validation !== undefined) {
                validators.push( new MinItemsValidator(validation))
            }

            // max items validation
            validation = item["maxItems"];
            if (validation !== undefined) {
                validators.push( new MaxItemsValidator(validation))
            }

            // uniqueItems validation
            validation = item["uniqueItems"];
            if (validation !== undefined) {
                validators.push( new UniqItemsValidator())
            }

            //5.4.  Validation keywords for objects
            //TODO: maxProperties, minProperties, additionalProperties, properties and patternProperties, dependencies

            // required validation
            var validation = item["required"];
            if (validation !== undefined && validation) {
                validators.push(new RequiredValidator());
            }

            //5.5.  Validation keywords for any instance type
            // enum validation
            validation = item["enum"];
            if (validation !== undefined) {
                validators.push(new EnumValidator(validation))
            }

            // type validation
            var validation = item["type"];
            if (validation !== undefined) {
                validators.push(new TypeValidator(validation));
            }
            //7.3.2 email
            validation = item["email"];
            if (validation !== undefined) {
                validators.push(new EmailValidator())
            }

            //7.3.6 url
            validation = item["uri"];
            if (validation !== undefined) {
                validators.push(new UrlValidator())
            }

            //TODO: allOf,anyOf,oneOf,not,definitions

            return validators;
        }
    }

    /**
     * It represents the JSON schema factory for creating validation rules based on raw JSON data annotated by validation rules.
     * It uses constraints keywords from JQuery validation plugin.
     */
    export class JQueryValidationRuleFactory implements IValidationRuleFactory  {

        static RULES_KEY = "rules";
        static DEFAULT_KEY = "default";

        /**
         * Default constructor
         * @param metaData -  raw JSON data annotated by validation rules
         */
        constructor(private metaData:any){
        }

        /**
         * Return abstract validation rule by traversing raw JSON data annotated by validation rules.
         * @returns {IAbstractValidator<any>} return validation rule
         */
        public CreateAbstractValidator():IAbstractValidator<any>{
            return this.ParseAbstractRule(this.metaData);
        }

        /**
         * Return an concrete validation rule by traversing raw JSON data annotated by validation rules.
         * @param name validation rule name
         * @returns {IValidationRule<any>} return validation rule
         */
        public CreateRule(name:string):IAbstractValidationRule<any>{
            return this.ParseAbstractRule(this.metaData).CreateRule(name);
        }

        /**
         * Returns an concrete validation rule structured according to JSON schema.
         */
        private ParseAbstractRule(metaData:any):IAbstractValidator<any> {

            //TODO:any

            /*var rule = new AbstractValidator<any>();

            for (var key in metaData) {
                var item = metaData[key];
                var rules = item[JQueryValidationRuleFactory.RULES_KEY];

                if ( _Score.isArray(item)) {
                    if (item[1] !== undefined) {
                        /!* _.each(this.ParseValidationAttribute(item[1]), function (validator) {
                         rule.RuleFor(key, validator)
                         });*!/
                        var validators = this.ParseValidationAttribute(item[1]);
                        validators.forEach(validator=>{
                            rule.RuleFor(key, validator)
                        })
                    }
                    rule.ValidatorFor(key, this.ParseAbstractRule(item[0]), true);
                }
                else if (rules !== undefined) {
                    /!*_.each(this.ParseValidationAttribute(rules),function(validator){ rule.RuleFor(key,validator)})*!/
                    var validators=this.ParseValidationAttribute(rules);
                    validators.forEach(validator=>{rule.RuleFor(key,validator)});
                }
                else if (_Score.isObject(item)) {
                    rule.ValidatorFor(key, this.ParseAbstractRule(item));
                }
                else {
                    //ignore
                    continue;
                }
            }
            return rule;*/
            return;
        }

        /**
         * Return list of property validators that corresponds json items for JQuery validation pluging tags.
         * See specification - http://jqueryvalidation.org/documentation/
         */
        private ParseValidationAttribute(item:any):Array<any> {

            var validators = new Array<any>();
            if (item === undefined) return validators;

            var validation = item["required"];
            if (validation !== undefined && validation) {
                validators.push(new RequiredValidator());
            }

            var validation = item["remote"];
            if (validation !== undefined && validation) {
                validators.push(new RemoteValidator(validation));
            }

            // maxLength validation
            validation = item["maxlength"];
            if (validation !== undefined) {
                validators.push(new MaxLengthValidator(validation))
            }

            // minLength validation
            validation = item["minlength"];
            if (validation !== undefined) {
                validators.push(new MinLengthValidator(validation))
            }

            // rangelength validation
            validation = item["rangelength"];
            if (validation !== undefined) {
                validators.push(new RangeLengthValidator(validation))
            }

            // maximum validation
            validation = item["max"];
            if (validation !== undefined) {
                validators.push(new MaxValidator(validation));
            }

            // minimum validation
            validation = item["min"];
            if (validation !== undefined) {
                validators.push(new MinValidator(validation));
            }

            // range validation
            validation = item["range"];
            if (validation !== undefined) {
                validators.push(new RangeValidator(validation));
            }

            validation = item["email"];
            if (validation !== undefined) {
                validators.push(new EmailValidator())
            }

            validation = item["url"];
            if (validation !== undefined) {
                validators.push(new UrlValidator())
            }

            validation = item["date"];
            if (validation !== undefined) {
                validators.push(new DateValidator())
            }

            validation = item["dateISO"];
            if (validation !== undefined) {
                validators.push(new DateISOValidator())
            }

            validation = item["number"];
            if (validation !== undefined) {
                validators.push(new NumberValidator())
            }


            validation = item["digits"];
            if (validation !== undefined) {
                validators.push(new DigitValidator())
            }

            validation = item["creditcard"];
            if (validation !== undefined) {
                validators.push(new CreditCardValidator())
            }

            validation = item["equalTo"];
            if (validation !== undefined) {
                validators.push(new EqualToValidator(validation))
            }


            // min items validation
            validation= item["minItems"];
            if (validation !== undefined) {
                validators.push( new MinItemsValidator(validation))
            }

            // max items validation
            validation = item["maxItems"];
            if (validation !== undefined) {
                validators.push( new MaxItemsValidator(validation))
            }

            // uniqueItems validation
            validation = item["uniqueItems"];
            if (validation !== undefined) {
                validators.push( new UniqItemsValidator())
            }

            // enum validation
            validation = item["enum"];
            if (validation !== undefined) {
                validators.push(new EnumValidator(validation))
            }

//           // pattern validation
//           validation = item["pattern"];
//           if (validation !== undefined) {
//               validators.push(new Validators.PatternValidator(validation))
//           }

            return validators;
        }
    }