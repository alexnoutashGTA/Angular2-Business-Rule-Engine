
import {IPropertyValidator, CompareOperator} from "../StandardValidation/Validation";
import {_Score} from "../_Score";
declare var moment ;


export class DateCompareValidator implements IPropertyValidator{

    public isAcceptable(s:any){
        var isValid = false;

        //if date to compare is not specified - defaults to compare against now
        if (!_Score.isDate(s)) return false;

        if (this.CompareTo === undefined) Date.now();

        var now = moment(this.CompareTo);
        var then =  moment(s);

        var diffs:number = then.diff(now);
        if (this.IgnoreTime) diffs = moment.duration(diffs).days();

        if (diffs < 0) {
            isValid = this.CompareOperator === CompareOperator.LessThan
                || this.CompareOperator === CompareOperator.LessThanEqual
                || this.CompareOperator === CompareOperator.NotEqual;
        }
        else if (diffs > 0) {
            isValid = this.CompareOperator === CompareOperator.GreaterThan
                || this.CompareOperator === CompareOperator.GreaterThanEqual
                || this.CompareOperator === CompareOperator.NotEqual;
        }
        else {
            isValid = this.CompareOperator === CompareOperator.LessThanEqual
                || this.CompareOperator === CompareOperator.Equal
                || this.CompareOperator === CompareOperator.GreaterThanEqual;
        }
        return isValid;
    }

    /**
     * Set the time of compare between passed date and CompareTo date.
     */
    public CompareOperator: CompareOperator;

    /**
     * The datetime against the compare is done.
     * If CompareTo is not set, then comparison is done against actual datetime.
     */
    public CompareTo:Date;

    /**
     * It forces to ignore time part of date by date compare.
     */
    public IgnoreTime:boolean = false;

    tagName = 'dateCompare';

}


