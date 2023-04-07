import { Brick, registerBrick } from 'olympe';

export default class RepeatString extends Brick {

    /**
     * @override
     * @protected
     * @param {!BrickContext} $
     * @param {string} s
     * @param {number} n
     * @param {function(string)} setRepeatedS
     * @param {function(number)} setLength
     */
    update($, [s, n], [setRepeatedS, setLength]) {
        // Write your code here. You have to implement this method !
        // Executed every time an input gets updated., override `setupExecution()` to change the behavior.
        const repatedS = s.repeat(n);
        setRepeatedS(repatedS);
        setLength(repatedS.length) ;
    }
}

registerBrick('01870339a540fb8baf63', RepeatString);
