import { Parser } from 'expr-eval';
import Clean from './Cleaner';

const useInput = (input) => {
    const cleanedInput = Clean(input);
    const expr = Parser.parse(cleanedInput);
    return expr.evaluate();
};

export default useInput;