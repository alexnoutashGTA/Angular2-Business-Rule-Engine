import {_Score} from "../_Score";

export var TYPE_KEY = "type";
export var PROPERTIES_KEY = "properties";
export var DEFAULT_KEY = "default";
export var ARRAY_KEY = "items";


export class SchemaUtil {

    /**
     * Returns the initial JSON data structured according to JSON schema.
     * The data are initilizied with default values.
     */
    static InitValues(formSchema:any, data?:any) {
        var data = data || {};

        for (var key in formSchema) {
            var item = formSchema[key];
            var type = item[TYPE_KEY];
            if (type === "object") {
                data[key] = {};
                SchemaUtil.InitValues(item[PROPERTIES_KEY], data[key]);
            }
            else if (type === "array") {
                data[key] = [];
            }
            else {
                var defaultValue = item[DEFAULT_KEY];
                if (defaultValue === undefined) continue;

                // Type casting
                if (type === 'boolean') {
                    if (defaultValue === '0') {
                        defaultValue = false;
                    } else {
                        defaultValue = !!defaultValue;
                    }
                }
                if ((type === 'number') ||
                    (type === 'integer')) {
                    if (_Score.isString(defaultValue)) {
                        if (!defaultValue.length) {
                            defaultValue = null;
                        } else if (!isNaN(Number(defaultValue))) {
                            defaultValue = Number(defaultValue);
                        }
                    }
                }
                if ((type === 'string') &&
                    (defaultValue === '')) {
                    defaultValue = null;
                }

                //TODO: default value
                data[key] = defaultValue;

            }
        }
        return data;
    }
}