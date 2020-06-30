import { Parser } from 'expr-eval';
import Clean from './Cleaner';

const useInput = (input) => {
    const cleanedInput = Clean(input);
    console.log(cleanedInput);
    if(cleanedInput===''){return ['',cleanedInput]}
    else{
        let flag = false;
        try{
            const expr = Parser.parse(cleanedInput);
            return [expr.evaluate(), cleanedInput, flag];
        }
        catch(e){
            flag = true;
            return ['', cleanedInput, flag]
        }
    }
};

export default useInput;