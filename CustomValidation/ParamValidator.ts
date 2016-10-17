import {IAsyncPropertyValidator} from "../StandardValidation/Validation";
import {_Score} from "../_Score";


class ParamValidator implements IAsyncPropertyValidator{

    isAcceptable(s:string):Promise<boolean> {
        var deferred = new Promise<boolean>(x=>{x(result)});
        var result:boolean;

        this.Options(this.ParamId).then(function (result) {
            var hasSome = _Score.some(result, function (item) {
                return item.text === s;
            });
            if (hasSome){
                this.result=true;
            }
            else {
                this.result = false;
            }
            Promise.resolve(deferred);
        });

        return deferred;
    }

    public ParamId:string;
    public Options:{(string): Promise<Array<any>>};

    isAsync = true;
    tagName = "param";
}
